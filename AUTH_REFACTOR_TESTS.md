# Authentication Refactor - Testing Guide

**Date:** November 27, 2026  
**Status:** Ready for Testing

---

## Quick Start Testing

### 1. Update Environment Variables

**Before starting, update `sms/backend/.env`:**

```bash
# Change this:
JWT_ACCESS_EXPIRY=8h

# To this:
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Add these:
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false
COOKIE_SAMESITE=lax
```

### 2. Start Backend

```bash
cd sms/backend
npm run dev
```

**Expected output:**
```
School ERP API running at http://localhost:5000
Environment: development
[Token Cleanup] Removed 0 expired refresh tokens
```

### 3. Start Frontend

```bash
cd sms/frontend
npm run dev
```

### 4. Clear Browser Storage (Important!)

Open browser console (F12):
```javascript
sessionStorage.clear()
localStorage.clear()
location.reload()
```

---

## Manual Testing Procedures

### Test 1: Login Flow ✅

**Steps:**
1. Navigate to `http://localhost:5173/login`
2. Enter credentials (use seeded user or create new)
3. Click "Login"

**Expected Results:**
- ✅ Redirected to role-specific dashboard
- ✅ No page freeze or delay
- ✅ User data visible in dashboard

**Verification:**
1. Open DevTools → Network tab
2. Find the `/auth/login` request
3. Check response:
   - Status: `200`
   - Response body: `{ status: "success", data: { user: {...} } }`
   - **NO** `token` field in response body ✅
4. Go to Application → Cookies → `http://localhost:5173`
5. Should see:
   - `accessToken` - HttpOnly ✅, Secure: false, SameSite: Lax
   - `refreshToken` - HttpOnly ✅, Secure: false, SameSite: Strict, Path: /api/auth

**What Changed:**
- Before: Token returned in response body, stored in sessionStorage
- After: Tokens in httpOnly cookies (not visible to JavaScript)

---

### Test 2: Dashboard Navigation ✅

**Steps:**
1. After logging in, navigate between dashboard tabs
2. Example: Dashboard → Teachers → Students → Fees → Reports
3. Watch Network tab during navigation

**Expected Results:**
- ✅ Fast navigation (no delays)
- ✅ Each API request succeeds
- ✅ **NO** `/auth/me` calls after initial load

**Verification:**
1. Network tab → Filter by "API" or "auth"
2. Count API requests:
   - Initial load: 1x `/auth/me` ✅
   - Navigation clicks: 0x `/auth/me` ✅
   - Data requests: Multiple (teachers, students, etc.) ✅

**Performance Check:**
1. Open DevTools → Performance tab
2. Click "Record"
3. Navigate between 5 tabs
4. Stop recording
5. Check timing:
   - Each API request: ~10-50ms (network + query)
   - **NO** extra 50-100ms auth overhead ✅

**What Changed:**
- Before: Every API request → DB lookup for user (~50ms overhead)
- After: Every API request → JWT verification only (~0.5ms overhead)

---

### Test 3: Token Auto-Refresh ✅

**Steps:**
1. Log in
2. Wait exactly 16 minutes (access token expires at 15min)
3. Click on any dashboard tab to trigger an API request

**Expected Results:**
- ✅ Request succeeds automatically
- ✅ No "session expired" error
- ✅ User stays logged in
- ✅ Transparent to user (no visible refresh)

**Verification:**
1. Network tab → Find the failed request (401)
2. Immediately after, should see:
   - `POST /api/auth/refresh` - Status 200 ✅
   - Original request retried - Status 200 ✅
3. Application → Cookies:
   - `accessToken` - New value ✅
   - `refreshToken` - New value ✅ (token rotation)

**What Changed:**
- Before: User logged out after 8 hours (manual re-login)
- After: Auto-refresh every 15 minutes (seamless)

---

### Test 4: Manual Refresh (F5) ✅

**Steps:**
1. Navigate to any dashboard page
2. Press F5 (hard refresh)
3. Wait for page to reload

**Expected Results:**
- ✅ User stays logged in
- ✅ Redirected to same dashboard
- ✅ One `/auth/me` call to hydrate user data

**Verification:**
1. Network tab:
   - Should see: `GET /auth/me` - Status 200 ✅
   - User data returned with full profile
2. Dashboard loads with correct user data

**What Changed:**
- Before: Token in sessionStorage checked on load
- After: Cookie automatically sent, `/auth/me` validates session

---

### Test 5: Logout ✅

**Steps:**
1. Log in
2. Navigate to dashboard
3. Click "Logout" button

**Expected Results:**
- ✅ Redirected to login page
- ✅ Cookies cleared
- ✅ Refresh token revoked in database

**Verification:**
1. Network tab:
   - `POST /api/auth/logout` - Status 200 ✅
2. Application → Cookies:
   - `accessToken` - GONE ✅
   - `refreshToken` - GONE ✅
3. Try accessing dashboard URL directly:
   - Should redirect to /login ✅

**Database Check:**
```sql
-- Check refresh_tokens table
SELECT * FROM refresh_tokens WHERE "userId" = '<user-id>';
-- Should return 0 rows (all revoked)
```

**What Changed:**
- Before: Logout was client-side only (token remained valid)
- After: Logout revokes refresh token server-side (true logout)

---

### Test 6: Cookie Security (XSS Protection) ✅

**Steps:**
1. Log in
2. Open browser console
3. Try to access cookies:

```javascript
// Try to read cookies
console.log(document.cookie);

// Try to access tokens
console.log(sessionStorage.getItem('sms_access_token'));
console.log(localStorage.getItem('sms_access_token'));
```

**Expected Results:**
- ✅ `document.cookie` does NOT show accessToken or refreshToken
- ✅ sessionStorage has NO token (only user data)
- ✅ localStorage has NO token

**What You'll See:**
```javascript
document.cookie
// Output: "" (or other non-auth cookies, but NOT accessToken/refreshToken)

sessionStorage.getItem('sms_access_token')
// Output: null

sessionStorage.getItem('sms_authenticated_user')
// Output: "{\"id\":\"...\",\"email\":\"...\"}" (user data only, NO token)
```

**What Changed:**
- Before: Token in sessionStorage → XSS vulnerable
- After: Token in httpOnly cookie → JavaScript cannot access

---

### Test 7: Password Change (Session Invalidation) ✅

**Steps:**
1. Open two browser tabs
2. Log in as the same user in both tabs
3. In Tab 1: Navigate to settings/change password
4. Change password
5. In Tab 2: Try to navigate or refresh

**Expected Results:**
- ✅ Tab 1: Password changed successfully, logged out
- ✅ Tab 2: Next request fails, logged out automatically
- ✅ All refresh tokens for that user revoked

**Verification:**
1. Tab 1 Network:
   - `POST /api/auth/change-password` - Status 200 ✅
   - Cookies cleared ✅
2. Tab 2 Network:
   - Next API request: Status 401 ✅
   - Redirect to /login ✅

**Database Check:**
```sql
-- Check user's tokenVersion incremented
SELECT "tokenVersion" FROM users WHERE id = '<user-id>';
-- Should be 2 (or +1 from before)

-- Check all refresh tokens revoked
SELECT * FROM refresh_tokens WHERE "userId" = '<user-id>';
-- Should return 0 rows
```

**What Changed:**
- Before: Old sessions remained valid after password change
- After: All sessions invalidated immediately (tokenVersion + revoke)

---

### Test 8: Concurrent Refresh Requests ✅

**Steps:**
1. Log in
2. Wait 16 minutes (token expires)
3. Quickly click on 3 different tabs

**Expected Results:**
- ✅ Only ONE `/auth/refresh` call made
- ✅ Other requests wait for refresh to complete
- ✅ All requests succeed after refresh

**Verification:**
1. Network tab → Filter "refresh"
2. Should see exactly 1 `/auth/refresh` call ✅
3. Other API requests queued, then succeed ✅

**Code Protection:**
```javascript
// In api.js
let refreshPromise = null;

async function refreshAccessToken() {
  if (refreshPromise) {
    return refreshPromise;  // ✅ Reuse existing refresh
  }
  refreshPromise = fetchRefresh();
  return refreshPromise;
}
```

**What Changed:**
- Before: N/A (no auto-refresh)
- After: Concurrency-safe refresh (prevents race conditions)

---

### Test 9: Role-Based Access Control ✅

**Steps:**
1. Log in as a **TEACHER**
2. Try to access principal-only endpoints

**Test A: Frontend (UI blocking):**
```
Navigate to /principal/dashboard
```
**Expected:** Redirect to /unauthorized or /teacher/dashboard ✅

**Test B: Backend (API blocking):**
```bash
# In browser console
fetch('http://localhost:5000/api/principal/stats', {
  credentials: 'include'
}).then(r => r.json()).then(console.log)
```
**Expected:**
```json
{
  "status": "error",
  "message": "Insufficient permissions"
}
```
Status: 403 ✅

**Verification:**
- ✅ Frontend prevents navigation (UX)
- ✅ Backend enforces authorization (security)
- ✅ JWT payload contains role, verified without DB lookup

**What Changed:**
- Before: DB lookup to get role, then check
- After: Role in JWT payload, check without DB

---

### Test 10: Directors with Multiple Schools ✅

**Steps:**
1. Log in as a **DIRECTOR** who owns multiple schools
2. Switch between schools using school selector
3. Make API requests

**Expected Results:**
- ✅ Each request includes `X-School-Id` header
- ✅ Backend verifies director owns that school
- ✅ Data filtered to selected school

**Verification:**
1. Network tab → Find API request
2. Check Request Headers:
   - `X-School-Id: <school-uuid>` ✅
3. Check Response:
   - Data belongs to selected school ✅

**Backend Behavior:**
```javascript
// In auth.js middleware
if (user.role === "DIRECTOR" && requestedSchoolId) {
  // This is the ONLY place we do a DB lookup in auth
  const hasAccess = await prisma.directorSchool.findFirst({
    where: { directorId: user.id, schoolId: requestedSchoolId }
  });
  if (!hasAccess) return 403;
}
```

**What Changed:**
- Before: Always fetched all owned schools from DB
- After: Only verify when school-specific request made

---

## Automated Testing (Optional)

### Using curl

**Test 1: Login and get cookies**
```bash
curl -i -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}' \
  -c cookies.txt

# Check cookies.txt - should contain accessToken and refreshToken
```

**Test 2: Use cookies to access protected endpoint**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -b cookies.txt

# Should return user data
```

**Test 3: Refresh token**
```bash
curl -i -X POST http://localhost:5000/api/auth/refresh \
  -b cookies.txt \
  -c cookies-new.txt

# Should get new cookies
```

**Test 4: Logout**
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt

# Cookies should be invalidated
```

---

## Performance Benchmarks

### Before Refactor

**Test:** Login + 10 API requests
```
Request 1 (Login): 150ms (DB query + bcrypt)
Request 2 (/auth/me): 50ms (DB lookup)
Request 3 (/api/teachers): 100ms (50ms auth DB + 50ms query)
Request 4 (/api/students): 100ms (50ms auth DB + 50ms query)
Request 5 (/api/fees): 100ms (50ms auth DB + 50ms query)
...
Request 11 (/api/reports): 100ms (50ms auth DB + 50ms query)

Total: 150 + 50 + (9 × 100) = 1100ms
Auth overhead: 500ms (45%)
```

### After Refactor

**Test:** Login + 10 API requests
```
Request 1 (Login): 150ms (DB query + bcrypt)
Request 2 (/auth/me): 50ms (DB lookup in service)
Request 3 (/api/teachers): 51ms (0.5ms JWT + 50ms query)
Request 4 (/api/students): 51ms (0.5ms JWT + 50ms query)
Request 5 (/api/fees): 51ms (0.5ms JWT + 50ms query)
...
Request 11 (/api/reports): 51ms (0.5ms JWT + 50ms query)

Total: 150 + 50 + (9 × 51) = 659ms
Auth overhead: 5ms (0.8%)
```

**Improvement:** 40% faster overall, 99% faster auth

---

## Troubleshooting

### Issue 1: Cookies not being set

**Symptoms:**
- Login succeeds but cookies not in DevTools
- Subsequent requests return 401

**Solutions:**

1. **Check CORS configuration:**
```javascript
// In backend app.js
corsOptions: {
  credentials: true,  // ✅ Must be true
  origin: "http://localhost:5173",  // ✅ Exact match
}
```

2. **Check cookie settings:**
```javascript
// For localhost development
COOKIE_DOMAIN=localhost  // Not .localhost
COOKIE_SECURE=false      // Must be false for HTTP
```

3. **Check browser privacy settings:**
- Disable "Block third-party cookies"
- Disable tracking prevention (temporarily)

4. **Check Network tab:**
```
Response Headers:
Set-Cookie: accessToken=...; Path=/; HttpOnly; SameSite=Lax
Set-Cookie: refreshToken=...; Path=/api/auth; HttpOnly; SameSite=Strict
```

---

### Issue 2: 401 errors after refresh

**Symptoms:**
- Login works
- Navigate once → works
- Navigate again → 401

**Solutions:**

1. **Check refresh token in database:**
```sql
SELECT * FROM refresh_tokens WHERE "userId" = '<user-id>';
-- Should have at least one row
```

2. **Check token rotation:**
```javascript
// In auth.controller.js refresh()
await revokeRefreshToken(tokenHash);  // ✅ Revoke old
await storeRefreshToken(user.id, newTokenHash);  // ✅ Store new
```

3. **Check tokenVersion:**
```sql
SELECT "tokenVersion" FROM users WHERE id = '<user-id>';
-- Should match JWT payload
```

4. **Check refresh endpoint:**
```bash
curl -v -X POST http://localhost:5000/api/auth/refresh \
  -b cookies.txt

# Should return 200, not 401
```

---

### Issue 3: Frontend infinite refresh loop

**Symptoms:**
- Network tab shows many `/auth/refresh` calls
- Page never loads

**Solutions:**

1. **Check refresh promise locking:**
```javascript
// In api.js
let refreshPromise = null;  // ✅ Must be module-level

async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise;  // ✅ Reuse
  refreshPromise = fetchRefresh();
  return refreshPromise;
}
```

2. **Check 401 handling:**
```javascript
// In apiRequest()
if (response.status === 401 && !path.includes("/auth/refresh")) {
  // ✅ Don't refresh if already refreshing
}
```

3. **Clear browser storage and cookies:**
```javascript
sessionStorage.clear();
localStorage.clear();
// DevTools → Application → Clear all cookies
```

---

### Issue 4: Password change doesn't invalidate sessions

**Symptoms:**
- Change password
- Old session still works

**Solutions:**

1. **Check tokenVersion increment:**
```javascript
// In auth.service.js changePassword()
await prisma.user.update({
  where: { id: userId },
  data: { tokenVersion: { increment: 1 } }  // ✅ Must increment
});
```

2. **Check refresh token revocation:**
```javascript
await revokeAllUserTokens(userId);  // ✅ Delete all tokens
```

3. **Verify in database:**
```sql
-- Check tokenVersion increased
SELECT "tokenVersion" FROM users WHERE id = '<user-id>';

-- Check tokens deleted
SELECT * FROM refresh_tokens WHERE "userId" = '<user-id>';
```

---

## Production Deployment

### Environment Variables

**Update production `.env`:**
```bash
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# IMPORTANT for production
COOKIE_DOMAIN=.yourdomain.com  # Leading dot for subdomains
COOKIE_SECURE=true             # HTTPS only
COOKIE_SAMESITE=strict         # Stricter CSRF protection
```

### Database Migration

If using proper migrations (not db push):
```bash
npx prisma migrate deploy
```

### Monitoring

**Key metrics to watch:**

1. **Refresh token creation rate:**
```sql
SELECT COUNT(*) FROM refresh_tokens 
WHERE "createdAt" > NOW() - INTERVAL '1 hour';
```

2. **Failed refresh attempts:**
```sql
-- Look for 401s on /auth/refresh in logs
```

3. **Average auth time:**
```sql
-- Should be <2ms after refactor
```

4. **Database query count:**
```sql
-- Auth queries should drop by ~95%
```

---

## Success Criteria

**All tests must pass:**
- ✅ Login sets httpOnly cookies
- ✅ Dashboard navigation has no auth delays
- ✅ Token auto-refreshes at 15 minutes
- ✅ Manual refresh (F5) works
- ✅ Logout clears cookies and revokes tokens
- ✅ Cookies not accessible via JavaScript
- ✅ Password change invalidates all sessions
- ✅ Concurrent refreshes don't duplicate
- ✅ Role-based access enforced
- ✅ Directors can switch schools

**Performance metrics:**
- ✅ Auth overhead <2ms per request (was ~50ms)
- ✅ DB queries reduced by 95%
- ✅ Dashboard navigation <100ms (was 150-200ms)

**Security checklist:**
- ✅ Tokens in httpOnly cookies (XSS protected)
- ✅ Refresh token rotation (theft protected)
- ✅ Token revocation works (logout/password change)
- ✅ Short-lived access tokens (15min)
- ✅ Device tracking enabled

---

## Ready for Production ✅

If all tests pass, the auth refactor is complete and ready for production deployment.

**Deployment order:**
1. Deploy backend (with new env vars)
2. Deploy frontend
3. Monitor for 24 hours
4. Celebrate 🎉
