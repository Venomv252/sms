import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import prisma from "../config/prisma.js";
import config from "../config/config.js";

/**
 * Generate a short-lived access token (15 minutes)
 * Contains user identity, role, schoolId for stateless authorization
 */
export function generateAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
      schoolId: user.schoolId ?? null,
      tokenVersion: user.tokenVersion ?? 1,
    },
    config.jwt.accessSecret,
    {
      expiresIn: config.jwt.accessExpiry,
      issuer: "school-management-system",
      audience: "sms-web",
    },
  );
}

/**
 * Generate a long-lived refresh token (7 days)
 * Random string, stored hashed in database
 */
export function generateRefreshToken() {
  // Generate 64 bytes of random data, convert to base64url
  return crypto.randomBytes(64).toString("base64url");
}

/**
 * Hash refresh token before storing in database
 */
export async function hashRefreshToken(token) {
  return bcrypt.hash(token, 10); // Lower cost for refresh tokens (they're random)
}

/**
 * Verify refresh token against stored hash
 */
export async function verifyRefreshToken(token, hash) {
  return bcrypt.compare(token, hash);
}

/**
 * Store refresh token in database
 */
export async function storeRefreshToken(userId, tokenHash, deviceInfo = null) {
  const expiresAt = new Date();
  const days = parseInt(config.jwt.refreshExpiry.match(/\\d+/)?.[0] || "7");
  expiresAt.setDate(expiresAt.getDate() + days);

  return prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      deviceInfo,
    },
  });
}

/**
 * Find refresh token by hash
 */
export async function findRefreshToken(tokenHash) {
  return prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });
}

/**
 * Revoke (delete) a refresh token
 */
export async function revokeRefreshToken(tokenHash) {
  try {
    await prisma.refreshToken.delete({
      where: { tokenHash },
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Revoke all refresh tokens for a user
 */
export async function revokeAllUserTokens(userId) {
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });
}

/**
 * Clean up expired refresh tokens (should run periodically)
 */
export async function cleanupExpiredTokens() {
  const result = await prisma.refreshToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
  return result.count;
}

/**
 * Increment user's token version to invalidate all existing sessions
 */
export async function invalidateAllUserSessions(userId) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      tokenVersion: { increment: 1 },
    },
  });
  await revokeAllUserTokens(userId);
}

/**
 * Generate device fingerprint from request
 */
export function getDeviceFingerprint(req) {
  const userAgent = req.headers["user-agent"] || "unknown";
  const ip = req.ip || req.connection.remoteAddress || "unknown";
  
  // Hash IP for privacy
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
  
  return `${userAgent.slice(0, 100)}_${ipHash}`;
}

/**
 * Verify access token and return payload
 * Does NOT check database - purely cryptographic verification
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, config.jwt.accessSecret, {
    issuer: "school-management-system",
    audience: "sms-web",
  });
}

/**
 * Set auth cookies in response
 */
export function setAuthCookies(res, accessToken, refreshToken) {
  // Access token cookie (15 minutes)
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: config.cookie.sameSite,
    maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    domain: config.cookie.domain,
  });

  // Refresh token cookie (7 days)
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: "strict", // Stricter for refresh token
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: "/api/auth", // Only sent to auth endpoints
    domain: config.cookie.domain,
  });
}

/**
 * Clear auth cookies
 */
export function clearAuthCookies(res) {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: config.cookie.sameSite,
    domain: config.cookie.domain,
  });
  
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: "strict",
    path: "/api/auth",
    domain: config.cookie.domain,
  });
}
