import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import config from "../config/config.js";

export async function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ status: "error", message: "Bearer token required" });
  }

  let payload;
  try {
    payload = jwt.verify(header.slice(7), config.jwt.accessSecret, {
      issuer: "school-management-system",
      audience: "sms-web",
    });
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: error.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
  }

  if (!payload || typeof payload !== "object" || !payload.id) {
    return res.status(401).json({ status: "error", message: "Invalid token payload" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, username: true, role: true, schoolId: true },
    });
    if (!user) {
      return res.status(401).json({ status: "error", message: "User account no longer exists" });
    }
    if (user.role === "DIRECTOR") {
      const ownedSchools = await prisma.directorSchool.findMany({
        where: { directorId: user.id },
        select: { schoolId: true },
      });
      const requestedSchoolId = req.headers["x-school-id"];
      let activeSchoolId = null;
      if (requestedSchoolId) {
        if (!ownedSchools.some((item) => item.schoolId === requestedSchoolId)) {
          return res.status(403).json({ status: "error", message: "You do not have access to this school" });
        }
        activeSchoolId = requestedSchoolId;
      } else if (ownedSchools.length === 1) {
        activeSchoolId = ownedSchools[0].schoolId;
      }
      req.user = { ...user, schoolId: activeSchoolId, ownedSchoolIds: ownedSchools.map((item) => item.schoolId) };
    } else {
      req.user = user;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ status: "error", message: "Insufficient permissions" });
    }
    return next();
  };
}
