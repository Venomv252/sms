import authService from "../services/auth.service.js";
import {
  setAuthCookies,
  clearAuthCookies,
  verifyAccessToken,
  verifyRefreshToken,
  hashRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
  invalidateAllUserSessions,
  getDeviceFingerprint,
  storeRefreshToken,
} from "../utils/tokens.js";
import prisma from "../config/prisma.js";

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    
    // Set httpOnly cookies for same-origin deployments
    setAuthCookies(res, result.accessToken, result.refreshToken);
    
    // ALSO return tokens in response body for cross-origin deployments
    res.status(201).json({ 
      status: "success", 
      data: { 
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      } 
    });
  } catch (error) { 
    next(error); 
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body ?? {};
    const deviceInfo = getDeviceFingerprint(req);
    
    const result = await authService.login(username, password, deviceInfo);
    
    // Set httpOnly cookies for same-origin deployments
    setAuthCookies(res, result.accessToken, result.refreshToken);
    
    // ALSO return tokens in response body for cross-origin deployments (Vercel + Render)
    // Frontend will use Bearer token strategy when cookies don't work
    res.status(200).json({ 
      status: "success", 
      data: { 
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      } 
    });
  } catch (error) { 
    next(error); 
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.status(200).json({ status: "success", data: user });
  } catch (error) { 
    next(error); 
  }
};

const refresh = async (req, res, next) => {
  try {
    // Try to get refresh token from cookie first, then from body (for cross-origin)
    let refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken && req.body?.refreshToken) {
      refreshToken = req.body.refreshToken;
    }
    
    if (!refreshToken) {
      return res.status(401).json({ 
        status: "error", 
        message: "Refresh token required" 
      });
    }
    
    // Hash the token to look it up in database
    const tokenHash = await hashRefreshToken(refreshToken);
    
    // Find token in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { 
        user: {
          select: {
            id: true,
            role: true,
            schoolId: true,
            tokenVersion: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
          }
        }
      },
    });
    
    if (!storedToken) {
      // Token not found - possible reuse attack
      // Clear cookies and return error
      clearAuthCookies(res);
      return res.status(401).json({ 
        status: "error", 
        message: "Invalid refresh token" 
      });
    }
    
    // Check if token expired
    if (new Date() > storedToken.expiresAt) {
      await revokeRefreshToken(tokenHash);
      clearAuthCookies(res);
      return res.status(401).json({ 
        status: "error", 
        message: "Refresh token expired" 
      });
    }
    
    // Check token version (for session invalidation)
    const user = storedToken.user;
    
    // Try to verify existing access token to check version
    let accessTokenPayload = null;
    try {
      const existingAccessToken = req.cookies?.accessToken || req.headers.authorization?.slice(7);
      if (existingAccessToken) {
        accessTokenPayload = verifyAccessToken(existingAccessToken);
      }
    } catch {
      // Access token invalid/expired - that's why we're refreshing
      accessTokenPayload = null;
    }
    
    if (accessTokenPayload && accessTokenPayload.tokenVersion !== user.tokenVersion) {
      // Token version mismatch - all sessions invalidated
      await revokeAllUserTokens(user.id);
      clearAuthCookies(res);
      return res.status(401).json({ 
        status: "error", 
        message: "Session invalidated" 
      });
    }
    
    // Revoke old refresh token (one-time use)
    await revokeRefreshToken(tokenHash);
    
    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken();
    const newRefreshTokenHash = await hashRefreshToken(newRefreshToken);
    
    // Store new refresh token
    const deviceInfo = getDeviceFingerprint(req);
    await storeRefreshToken(user.id, newRefreshTokenHash, deviceInfo);
    
    // Set new cookies (for same-origin deployments)
    setAuthCookies(res, newAccessToken, newRefreshToken);
    
    // ALSO return tokens in response body for cross-origin deployments
    res.status(200).json({ 
      status: "success", 
      message: "Token refreshed",
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) { 
    clearAuthCookies(res);
    next(error); 
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    
    if (refreshToken) {
      // Revoke refresh token
      const tokenHash = await hashRefreshToken(refreshToken);
      await revokeRefreshToken(tokenHash);
    }
    
    // Clear cookies
    clearAuthCookies(res);
    
    res.status(200).json({ 
      status: "success", 
      message: "Logged out successfully" 
    });
  } catch (error) { 
    // Always clear cookies even if revocation fails
    clearAuthCookies(res);
    next(error); 
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body ?? {};
    await authService.changePassword(req.user.id, currentPassword, newPassword);
    
    // Invalidate all user sessions on password change
    await invalidateAllUserSessions(req.user.id);
    
    // Clear current user's cookies
    clearAuthCookies(res);
    
    res.status(200).json({ 
      status: "success", 
      message: "Password changed successfully. Please log in again." 
    });
  } catch (error) { 
    next(error); 
  }
};

export default { register, login, getMe, refresh, logout, changePassword };
