# 401 Authentication Error - Quick Fix

## 🔴 Problem
Getting 401 errors means your authentication session has expired or is invalid.

## ✅ Instant Solution (30 seconds)

### Option 1: Use Browser DevTools
1. Open DevTools (Press **F12**)
2. Go to **Console** tab
3. Paste this and press Enter:
```javascript
sessionStorage.clear();
localStorage.clear();
document.cookie.split(";").forEach(c => document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"));
location.reload();
```
4. **Log in again**

### Option 2: Logout Button
1. Click **Logout** button (if visible)
2. **Log in again**

### Option 3: Clear Browser Data
1. Press **Ctrl+Shift+Delete**
2. Select "Cookies" and "Cached images"
3. Clear for "Last hour"
4. Close and reopen browser
5. **Log in again**

---

## 🔧 If Problem Persists

### 1. Check Backend Server
```bash
cd sms/backend
npm start
```
**Expected:** Server should run on `http://localhost:5000`

### 2. Check Backend Logs
Look for errors in backend terminal:
- Database connection errors
- JWT secret missing
- Port already in use

### 3. Verify Environment Variables
Check `sms/backend/.env` has:
```env
JWT_SECRET=your_secret_key_here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
DATABASE_URL=your_database_url
```

### 4. Test Auth Endpoint Manually
```bash
# Test if backend is responding
curl http://localhost:5000/api/auth/me

# Should return 401 if not authenticated (which is correct)
```

### 5. Check CORS Configuration
If frontend and backend are on different domains/ports, check `sms/backend/src/app.js` has proper CORS settings:

```javascript
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Important for cookies!
}));
```

---

## 🎯 Why This Happens

**httpOnly Cookies** (used for security) can expire or become invalid when:
- ✅ **Refresh token expired** (after 7 days of no use)
- ✅ **Backend restarted** (tokens in memory cleared)
- ✅ **Password changed** (all sessions invalidated)
- ✅ **Token version mismatch** (security feature)
- ✅ **System time changed** (causes token validation issues)
- ✅ **Browser cleared cookies** (manual or automatic)

---

## 🛡️ Prevention

To avoid this in the future:
1. **Keep backend running** during development
2. **Don't manually clear cookies** unless necessary
3. **Use same browser** for testing
4. **Check backend logs** for errors

---

## 📞 Still Not Working?

1. Check browser console (F12) for specific error messages
2. Check backend logs for authentication errors
3. Try different browser (to rule out browser-specific issues)
4. Restart both frontend and backend servers

---

**TL;DR:** Clear cookies and session, then log in again. That fixes 99% of 401 errors! 🎉
