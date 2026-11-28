# ⚡ Quick Deployment Checklist

## 🎯 Goal
Fix 401 authentication errors in production (Vercel + Render)

## ✅ Pre-Deployment Checklist

### Backend (Render)
- [ ] Code changes committed and pushed to GitHub
- [ ] Environment variables configured on Render:
  ```
  JWT_ACCESS_SECRET=<strong-random-secret>
  JWT_REFRESH_SECRET=<different-strong-random-secret>
  COOKIE_SECURE=true
  COOKIE_SAMESITE=none
  CORS_ORIGIN=https://sms-rho-umber.vercel.app
  ```
- [ ] All other existing env vars still present (DATABASE_URL, etc.)

### Frontend (Vercel)
- [ ] Code changes committed and pushed to GitHub
- [ ] Environment variable set on Vercel:
  ```
  VITE_API_URL=https://sms-55v8.onrender.com/api
  ```

## 🚀 Deployment Steps

### Step 1: Deploy Backend
```bash
# If using GitHub integration
git push origin main

# Or manual deploy on Render Dashboard
# → Click "Manual Deploy" → "Deploy latest commit"
```

**Wait for:** ✅ "Deploy successful" message on Render

### Step 2: Deploy Frontend
```bash
# If using GitHub integration
git push origin main

# Or using Vercel CLI
vercel --prod

# Or trigger from Vercel Dashboard
# → Deployments → Click "Redeploy"
```

**Wait for:** ✅ "Deployment ready" message on Vercel

## 🧪 Testing (5 Minutes)

### Test 1: Login
1. Go to `https://sms-rho-umber.vercel.app`
2. Open DevTools (F12) → Console tab
3. Login with: `priyanshu` / `YourStrongPassword@2026`
4. **Expected:** ✅ No errors in console, redirected to dashboard

### Test 2: Protected Endpoints
1. After login, check Network tab
2. Look for requests to `/api/auth/me` and `/api/platform/...`
3. **Expected:** ✅ All return 200 OK (not 401)

### Test 3: Token Storage
1. DevTools → Application tab → Session Storage
2. **Expected:** ✅ See `sms_access_token` and `sms_refresh_token`

### Test 4: Authorization Header
1. Network tab → Click any API request
2. Check Headers → Request Headers
3. **Expected:** ✅ See `Authorization: Bearer eyJhbGc...`

## ⚠️ If Tests Fail

### Issue: Still getting 401 errors
```bash
# 1. Clear Render build cache
Render Dashboard → Manual Deploy → ☑ Clear build cache

# 2. Force redeploy Vercel
vercel --prod --force

# 3. Hard refresh browser
Ctrl + Shift + R (or Cmd + Shift + R on Mac)
```

### Issue: CORS errors
```bash
# Check CORS_ORIGIN on Render
# Must be: https://sms-rho-umber.vercel.app
# (no trailing slash)
```

### Issue: Tokens not storing
```bash
# 1. Clear browser data
# 2. Try incognito mode
# 3. Check console for JavaScript errors
```

## 📊 Success Criteria

| Check | Status |
|-------|--------|
| Login works without errors | ⬜ |
| Dashboard loads after login | ⬜ |
| No 401 errors in console | ⬜ |
| No CORS errors in console | ⬜ |
| Protected API calls return 200 | ⬜ |
| Tokens visible in sessionStorage | ⬜ |
| Authorization header present in requests | ⬜ |

**All checked?** ✅ **Deployment successful!**

## 🔗 Quick Links

- **Frontend**: https://sms-rho-umber.vercel.app
- **Backend Health**: https://sms-55v8.onrender.com/health
- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard

## 📚 Full Documentation

For detailed explanation, troubleshooting, and security considerations, see:
- `PRODUCTION_AUTH_FIX.md`

---

**Last Updated:** November 23, 2026
