import { verifyAccessToken } from "../utils/tokens.js";
import prisma from "../config/prisma.js";

export async function auth(req, res, next) {
  // Try to get token from cookie first, fallback to Authorization header for backward compatibility
  let token = req.cookies?.accessToken;
  
  if (!token) {
    const header = req.headers.authorization;
    if (header?.startsWith("Bearer ")) {
      token = header.slice(7);
    }
  }

  if (!token) {
    return res.status(401).json({ status: "error", message: "Authentication required" });
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: error.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
  }

  if (!payload || typeof payload !== "object" || !payload.sub) {
    return res.status(401).json({ status: "error", message: "Invalid token payload" });
  }

  // Use token payload directly - NO DATABASE LOOKUP
  // This makes auth checks extremely fast (cryptographic verification only)
  const user = {
    id: payload.sub,
    role: payload.role,
    schoolId: payload.schoolId,
    tokenVersion: payload.tokenVersion,
  };

  // For directors, handle multi-school access
  if (user.role === "DIRECTOR") {
    const requestedSchoolId = req.headers["x-school-id"];
    
    // If a specific school is requested, we need to verify ownership (requires DB lookup)
    // This is the ONLY case where we hit the database in auth middleware
    if (requestedSchoolId) {
      const hasAccess = await prisma.directorSchool.findFirst({
        where: {
          directorId: user.id,
          schoolId: requestedSchoolId,
        },
      });
      
      if (!hasAccess) {
        return res.status(403).json({ status: "error", message: "You do not have access to this school" });
      }
      
      user.schoolId = requestedSchoolId;
    }
    // If no specific school requested, leave schoolId as null
    // The endpoint can fetch owned schools if needed
  }

  req.user = user;
  return next();
}

export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ status: "error", message: "Insufficient permissions" });
    }
    return next();
  };
}

// Role groups for common access patterns
export const ROLE_GROUPS = {
  // Administrative roles (can manage school operations)
  ADMIN: ["SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT"],
  
  // Staff roles (can view/manage students and academics)
  STAFF: ["SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT", "TEACHER"],
  
  // Financial roles (can access fee and payment data)
  FINANCIAL: ["SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "ACCOUNTANT"],
  
  // All school users (authenticated access)
  ALL_USERS: ["SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT", "TEACHER", "ACCOUNTANT", "STUDENT", "PARENT", "DRIVER"],
  
  // Student-related access (can view student data)
  STUDENT_ACCESS: ["SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT", "TEACHER", "ACCOUNTANT", "STUDENT", "PARENT"],
};

// Helper function to allow role groups
export function allowRoleGroup(groupName) {
  const roles = ROLE_GROUPS[groupName];
  if (!roles) {
    throw new Error(`Unknown role group: ${groupName}`);
  }
  return allowRoles(...roles);
}
