# Fix: Duplicate `safeUserSelect` Declaration

**Date:** November 27, 2026  
**Status:** ✅ Fixed

---

## Root Cause

**File:** `sms/backend/src/services/auth.service.js`

**Problem:** Two `const safeUserSelect` declarations on lines 17-26 and 28-36, causing:
```
SyntaxError: Identifier 'safeUserSelect' has already been declared
```

This happened during the auth refactor when I added `tokenVersion` to the first declaration but didn't remove the old one.

---

## Fix Applied

**Removed duplicate declaration (lines 28-36):**

```diff
  const normalizeUsername = (value) =>
    String(value ?? "").trim().toLowerCase();

  const safeUserSelect = {
    id: true,
    email: true,
    username: true,
    role: true,
    schoolId: true,
    firstName: true,
    lastName: true,
    tokenVersion: true,
    createdAt: true,
  };

- const safeUserSelect = {
-   id: true,
-   email: true,
-   username: true,
-   role: true,
-   schoolId: true,
-   firstName: true,
-   lastName: true,
-   createdAt: true,
- };

  async function register(input = {}) {
```

**Kept the first declaration** because it includes `tokenVersion: true` which is required for the auth refactor (session invalidation feature).

---

## Verification

### Syntax Check
```bash
cd sms/backend
node --check src/services/auth.service.js
# Exit code: 0 ✅
```

### All Auth-Related Files
```bash
node --check src/utils/tokens.js              # ✅ Pass
node --check src/utils/tokenCleanup.js        # ✅ Pass
node --check src/controllers/auth.controller.js # ✅ Pass
node --check src/middleware/auth.js           # ✅ Pass
node --check src/app.js                       # ✅ Pass
node --check src/server.js                    # ✅ Pass
```

All files pass syntax validation.

---

## Environment Variables for Render

Ensure these variables are set in your Render environment:

### Required (Must Set)
```bash
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
JWT_ACCESS_SECRET=your-long-random-secret-here
JWT_REFRESH_SECRET=another-long-random-secret-here
```

### Cookie Settings (For Production)
```bash
COOKIE_DOMAIN=.yourdomain.com
COOKIE_SECURE=true
COOKIE_SAMESITE=strict
```

### Optional (Have Defaults)
```bash
NODE_ENV=production
PORT=5000
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
CORS_ORIGIN=https://your-frontend.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOGIN_RATE_LIMIT_WINDOW_MS=900000
LOGIN_RATE_LIMIT_MAX_REQUESTS=50
LOGIN_RATE_LIMIT_MAX_IPS=50000
```

---

## Changes Made

**1 file changed:**
- `sms/backend/src/services/auth.service.js` - Removed duplicate `safeUserSelect` (lines 28-36)

**Lines removed:** 10 lines (duplicate declaration)

**No other changes** - Database schema, routes, and all other code remain unchanged.

---

## Testing

The server should now start without errors. Test with:

```bash
cd sms/backend
npm start
```

Expected output:
```
School ERP API running at http://localhost:5000
Environment: production
[Token Cleanup] Removed 0 expired refresh tokens
```

---

## Summary

✅ **Fixed:** Duplicate `const safeUserSelect` declaration  
✅ **Verified:** All auth files pass syntax check  
✅ **Ready:** Server should boot correctly on Render  

**Action Required:** Ensure all environment variables listed above are set in Render dashboard.
