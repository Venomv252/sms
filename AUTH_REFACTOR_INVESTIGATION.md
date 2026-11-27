# Authentication & Authorization Refactor - Investigation Report

**Date:** November 27, 2026  
**Status:** Investigation Complete

---

## Stack Detection

### Frontend
- **Framework:** React 18+ with Vite
- **Router:** React Router DOM v7.18.4
- **State:** React Context (potential for Zustand/Context API)
- **Storage:** `sessionStorage` for tokens (not httpOnly cookies)
- **Code Splitting:** Lazy loading for role dashboards ✅

### Backend
- **Framework:** Express.js 5.1.0 (Node.js ESM)
- **Database:** PostgreSQL via Prisma 6.19.3
- **Auth Library:** `jsonwebtoken` 9.0.2
- **Password Hashing:** `bcrypt` 6.0.0
- **Rate Limiting:** `express-rate-limit` 8.1.0 ✅
- **Security:** `helmet` 8.1.0 ✅

### Current Auth Method
- **Access Token:** JWT stored in `sessionStorage` (key: `sms_access_token`)
- **Expiry:** 8 hours (configurable via `JWT_ACCESS_EXPIRY`)
- **No Refresh Token:** ❌ Users must re-login after 8 hours
- **No httpOnly Cookies:** ❌ Tokens exposed to XSS

---

## Current Authentication Flow

### Login Process
1. User submits credentials to `POST /api/auth/login`
2. Backend verifies with bcrypt, generates JWT access token
3. Frontend stores token in `sessionStorage` + user object
4. Frontend redirects to role-specific dashboard via `ROLE_ROUTES` map

### Per-Request Authentication
1. Every API request includes `Authorization: Bearer <token>` header
2. Backend middleware `auth()` performs:
   - JWT signature verification
   - **Database lookup** to fetch user data (`await prisma.user.findUnique()`)
   - For DIRECTORS: **Additional database query** for owned schools
3. User object attached to `req.user`

### Session Validation
- **On app load:** `useEffect` in `App.jsx` calls `GET /auth/me` → DB lookup
- **On every protected route:** Backend `auth` middleware → DB lookup
- **On token expiry:** Client-side timeout triggers logout

---

## Root Cause of Slowness: Database Lookups on Every Request

### Problem Identified

**Location:** `sms/backend/src/middleware/auth.js` (Lines 27-50)

```javascript
export async function auth(req, res, next) {
  // 1. JWT verification (fast - cryptographic operation) ✅
  payload = jwt.verify(header.slice(7), config.jwt.accessSecret, {...});
  
  // 2. DATABASE LOOKUP ON EVERY REQUEST ❌
  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: { id: true, email: true, username: true, role: true, schoolId: true },
  });
  
  // 3. FOR DIRECTORS: ADDITIONAL DATABASE LOOKUP ❌
  if (user.role === "DIRECTOR") {
    const ownedSchools = await prisma.directorSchool.findMany({
      where: { directorId: user.id },
      select: { schoolId: true },
    });
  }
}
```

### Impact Analysis

**Current Behavior:**
- ✅ JWT verification: ~0.1-1ms (cryptographic operation)
- ❌ Database lookup: ~10-100ms (network + query time)
- ❌ Director school lookup: +10-50ms additional
- ❌ **EVERY** dashboard tab navigation triggers API calls → new auth check → DB lookup

**Example User Journey (Principal navigating dashboard):**
```
Dashboard Load    → GET /api/principal/stats      → auth() → DB lookup (~50ms)
Navigate to Staff → GET /api/teachers            → auth() → DB lookup (~50ms)
Navigate to Fees  → GET /api/fees/summary        → auth() → DB lookup (~50ms)
Navigate to Admin → GET /api/principal/settings  → auth() → DB lookup (~50ms)
Navigate to Audit → GET /api/audit-logs          → auth() → DB lookup (~50ms)
```

**Total overhead:** 250ms+ in database lookups alone **per navigation sequence**

---

## Why Database Lookups Are Happening

### The Pattern
The JWT **does** contain user data:
```javascript
// From auth.service.js
function accessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      schoolId: user.schoolId ?? null,
    },
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessExpiry }
  );
}
```

BUT the middleware **ignores** this data and re-fetches from DB:
```javascript
// From auth.js - WHY?
const user = await prisma.user.findUnique({
  where: { id: payload.id },  // We already have payload.role and payload.schoolId!
  select: { id: true, email: true, username: true, role: true, schoolId: true },
});
```

### Likely Reasoning (and why it's wrong)
**Perceived need:** "What if user role changed after JWT was issued?"

**Reality:** 
- Role changes are **rare** administrative actions
- 8-hour token expiry already limits stale data window
- Verifying every request defeats the purpose of stateless JWTs
- **Solution:** Use token versioning or short expiry (15min) + refresh tokens

---

## Security Concerns in Current Implementation

### 1. ❌ Tokens in sessionStorage (XSS Vulnerable)
```javascript
// sms/frontend/src/api.js
sessionStorage.setItem(TOKEN_KEY, result.token);
```
**Risk:** Any XSS vulnerability can steal the token.  
**Fix:** Use httpOnly cookies.

### 2. ❌ No Refresh Token
- Users must re-login every 8 hours
- No way to revoke sessions without changing JWT secret
- Can't implement "remember me" safely

### 3. ❌ No Token Revocation
- Deleted/suspended users remain authenticated until token expires
- Logout is client-side only (backend doesn't track sessions)
- No way to force logout on password change

### 4. ✅ Good Parts (Keep These)
- Rate limiting on login ✅
- bcrypt for passwords ✅
- JWT signature verification ✅
- Role-based authorization ✅
- Helmet for security headers ✅

---

## Per-Tab/Page Verification Points

### Frontend (sms/frontend/src/App.jsx)
**Lines 70-114:**
```javascript
useEffect(() => {
  apiGet("/auth/me")  // ❌ DB lookup on every app load
    .then((currentUser) => {
      setUser(currentUser);
      setAuthState("authenticated");
    });
}, [navigate]);
```

**Frequency:** Once per app load (acceptable) ✅

### No Per-Tab Guards Found ✅
- Dashboard components do NOT call `/auth/me` on every tab change
- Authentication state is held in `App.jsx` and passed down
- Role checks happen client-side using `user.role`

### Where the Problem Actually Is

**The issue is NOT frontend verification calls.**

**The REAL problem:** Every API request (which tabs trigger) causes a backend DB lookup in the `auth` middleware.

---

## Network Call Analysis

### Current State (Before Refactor)

**Dashboard Load:**
```
1. GET /auth/me          → auth middleware → DB lookup
2. GET /api/[role]/stats → auth middleware → DB lookup
3. GET /api/schools      → auth middleware → DB lookup (if director)
```

**Per-Tab Navigation:**
```
Navigate to Teachers → GET /api/teachers    → auth middleware → DB lookup
Navigate to Students → GET /api/students    → auth middleware → DB lookup
Navigate to Fees     → GET /api/fees        → auth middleware → DB lookup
Navigate to Reports  → GET /api/reports     → auth middleware → DB lookup
```

**Database Queries Per Session:**
- Initial load: 1-3 queries (depending on role)
- Per tab navigation: 1-3 queries each
- **10 tab navigations = 10-30 database lookups for authentication alone**

### Expected State (After Refactor)

**Dashboard Load:**
```
1. GET /auth/me          → auth middleware → JWT verification only (no DB)
2. GET /api/[role]/stats → auth middleware → JWT verification only (no DB)
3. GET /api/schools      → auth middleware → JWT verification only (no DB)
```

**Per-Tab Navigation:**
```
Navigate to Teachers → GET /api/teachers    → JWT verification only (no DB)
Navigate to Students → GET /api/students    → JWT verification only (no DB)
Navigate to Fees     → GET /api/fees        → JWT verification only (no DB)
Navigate to Reports  → GET /api/reports     → JWT verification only (no DB)
```

**Database Queries Per Session:**
- Initial load: **1 query** (GET /auth/me only, to hydrate fresh user data)
- Per tab navigation: **0 database queries**
- Refresh token rotation: **1-2 queries** (every 15 minutes)

**Reduction:** ~95% fewer database queries for authentication ✅

---

## Proposed Architecture

### Token Strategy

**Access Token (15 minutes):**
```javascript
{
  sub: "user-uuid",
  role: "TEACHER",
  schoolId: "school-uuid",
  permissions: ["read:students", "write:homework"],
  tokenVersion: 1,  // For revocation
  iat: 1234567890,
  exp: 1234568790,
  iss: "school-management-system",
  aud: "sms-web"
}
```

**Refresh Token (7 days):**
- Stored hashed in `refresh_tokens` table
- Rotated on every use (one-time use)
- Linked to user + device fingerprint
- Revoked on logout/password change

### Authentication Flow

**Login:**
```
1. POST /auth/login (username, password)
2. Verify credentials (bcrypt)
3. Generate access + refresh tokens
4. Store refresh token hash in DB
5. Set httpOnly cookies:
   - accessToken (15min, Secure, SameSite=Lax)
   - refreshToken (7days, Secure, SameSite=Strict)
6. Return user object (no token in response body)
```

**API Request:**
```
1. Browser sends cookies automatically
2. Middleware reads accessToken from cookie
3. JWT verify (signature only, no DB lookup)
4. Extract user data from token payload
5. Attach to req.user
6. If 401 → frontend intercepts → calls /auth/refresh
```

**Token Refresh:**
```
1. POST /auth/refresh (refreshToken in cookie)
2. Verify refresh token hash in DB
3. Check tokenVersion on user record
4. Generate new access + refresh tokens
5. Revoke old refresh token
6. Set new cookies
7. Return success (cookies set automatically)
```

**Logout:**
```
1. POST /auth/logout
2. Revoke refresh token in DB
3. Clear cookies
4. Optionally: increment tokenVersion (invalidates all sessions)
```

---

## Database Schema Changes Required

### New Table: `refresh_tokens`

```prisma
model RefreshToken {
  id           String   @id @default(uuid())
  userId       String
  tokenHash    String   @unique  // bcrypt hash of the token
  expiresAt    DateTime
  createdAt    DateTime @default(now())
  deviceInfo   String?  // User agent + IP hash for tracking
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, expiresAt])
  @@index([expiresAt])  // For cleanup job
  @@map("refresh_tokens")
}
```

### Update User Model: `tokenVersion`

```prisma
model User {
  // ... existing fields
  tokenVersion Int @default(1)  // Increment to invalidate all sessions
  refreshTokens RefreshToken[]
}
```

**Migration:** Reversible, adds non-breaking fields

---

## Security Improvements

### 1. httpOnly Cookies
```javascript
res.cookie('accessToken', token, {
  httpOnly: true,    // Not accessible via JavaScript
  secure: true,      // HTTPS only
  sameSite: 'lax',   // CSRF protection
  maxAge: 15 * 60 * 1000  // 15 minutes
});
```

### 2. Token Revocation
```javascript
// On password change or force logout
await prisma.user.update({
  where: { id: userId },
  data: { tokenVersion: { increment: 1 } }
});
// All existing tokens now invalid on next refresh
```

### 3. Refresh Token Rotation
```javascript
// One-time use tokens
await prisma.refreshToken.delete({ where: { tokenHash } });
// Generate new refresh token
// If refresh fails (token reuse detected) → revoke all user tokens
```

### 4. Device Tracking
```javascript
deviceInfo: `${req.headers['user-agent']}_${hashIP(req.ip)}`
// Detect suspicious activity (location changes, etc.)
```

---

## Implementation Checklist

### Backend Changes

**Phase 1: Foundation**
- [ ] Add `refresh_tokens` table to Prisma schema
- [ ] Add `tokenVersion` to User model
- [ ] Create migration + seed data
- [ ] Add cookie utilities (parse, set, clear)

**Phase 2: Token Management**
- [ ] Implement refresh token generation
- [ ] Implement refresh token hashing/verification
- [ ] Add `POST /auth/refresh` endpoint
- [ ] Add `POST /auth/logout` endpoint (revoke refresh token)

**Phase 3: Middleware Refactor**
- [ ] Update `auth` middleware to use payload data (remove DB lookup)
- [ ] Add `checkTokenVersion` for refresh endpoint only
- [ ] Update login to set cookies instead of returning token
- [ ] Update `/auth/me` to verify cookie + return user

**Phase 4: Utilities**
- [ ] Add token cleanup job (remove expired refresh tokens)
- [ ] Add device fingerprinting
- [ ] Add token rotation logic

### Frontend Changes

**Phase 1: API Client**
- [ ] Remove sessionStorage token storage
- [ ] Update `apiRequest` to use cookies (automatic)
- [ ] Add 401 interceptor → call `/auth/refresh` → retry
- [ ] Prevent concurrent refresh calls (lock mechanism)

**Phase 2: Auth Context**
- [ ] Create `AuthProvider` with user state
- [ ] Load user via `/auth/me` ONCE on app mount
- [ ] Remove redundant verification calls
- [ ] Update logout to call `/auth/logout` endpoint

**Phase 3: Route Guards**
- [ ] Create `RequireRole` guard component
- [ ] Apply at dashboard LAYOUT level (not per page)
- [ ] Remove inline role checks from pages
- [ ] Add `/unauthorized` page

### Testing

- [ ] Login flow (all roles)
- [ ] Token expiry + auto-refresh
- [ ] Manual refresh (F5) with valid token
- [ ] Manual refresh with expired token
- [ ] Logout + verify token revoked
- [ ] Password change + verify old tokens invalid
- [ ] Concurrent requests (race condition handling)
- [ ] Role-based access (allowed and forbidden)
- [ ] XSS attack (verify cookies not accessible)

---

## Risks & Mitigation

### Risk 1: Breaking Existing Sessions
**Impact:** All users logged out on deployment  
**Mitigation:** 
- Deploy during low-traffic window
- Keep old token verification as fallback for 24h
- Clear communication to users

### Risk 2: Cookie Configuration Issues
**Impact:** Tokens not sent/received in production  
**Mitigation:**
- Test on staging with HTTPS
- Verify `sameSite`, `secure`, `domain` settings
- Add logging for cookie issues

### Risk 3: Refresh Token Rotation Complexity
**Impact:** Race conditions, token reuse  
**Mitigation:**
- Use database transactions
- Implement refresh token "grace period"
- Add comprehensive logging

---

## Environment Variables Required

**New in `.env`:**
```bash
# Token expiry (shorter for access token)
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Cookie settings
COOKIE_DOMAIN=localhost  # or .yourdomain.com in production
COOKIE_SECURE=false      # true in production (HTTPS)
COOKIE_SAMESITE=lax      # or strict

# Cleanup job
REFRESH_TOKEN_CLEANUP_INTERVAL=86400000  # 24 hours
```

---

## Estimated Performance Improvement

### Before (10 tab navigations in a session):
```
Auth database queries: ~20-30 queries
Average query time: 50ms
Total auth overhead: 1000-1500ms
```

### After (10 tab navigations in a session):
```
Auth database queries: 1 query (initial /auth/me)
Refresh token queries: 2 queries (if 15min elapsed)
Average query time: 50ms
Total auth overhead: ~150ms
```

**Improvement:** 85-90% reduction in auth-related database load ✅

---

## Recommendation

**Proceed with refactor:** YES ✅

**Reasoning:**
1. Clear performance bottleneck identified (DB lookups in auth middleware)
2. Security improvements needed (httpOnly cookies, refresh tokens)
3. Existing architecture already has good foundations (JWT, bcrypt, rate limiting)
4. Changes are surgical and testable
5. Migration path is clear and reversible

**Timeline Estimate:**
- Backend refactor: 6-8 hours
- Frontend refactor: 4-6 hours
- Testing: 3-4 hours
- **Total: 13-18 hours**

---

## Next Steps

1. **Get approval** for downtime during deployment
2. **Create feature branch:** `feature/auth-refresh-tokens`
3. **Phase 1:** Backend token infrastructure
4. **Phase 2:** Backend middleware refactor
5. **Phase 3:** Frontend interceptors
6. **Phase 4:** Testing + deployment
7. **Phase 5:** Monitor + rollback plan

**Ready to proceed?**
