import prisma from "../config/prisma.js";

/**
 * Build a Prisma filter for records owned by the authenticated user's school.
 * SUPER_ADMIN is platform-wide. Every other school-scoped role must have schoolId.
 */
export function requireSchoolScope(req, res, next) {
  if (req.user.role === "SUPER_ADMIN") return next();
  if (!req.user.schoolId) {
    return res.status(403).json({ status: "error", message: "Your account is not assigned to a school" });
  }
  return next();
}

export function schoolUserFilter(req, relation = "user") {
  if (req.user.role === "SUPER_ADMIN") return {};
  return { [relation]: { schoolId: req.user.schoolId } };
}

/** Student ownership filter for student, parent, and school staff accounts. */
export async function accessibleStudentWhere(req) {
  switch (req.user.role) {
    case "SUPER_ADMIN":
      return {};
    case "STUDENT":
      return { userId: req.user.id };
    case "PARENT":
      return { parentLinks: { some: { parentUserId: req.user.id } } };
    default:
      if (!req.user.schoolId) {
        const error = new Error("Your account is not assigned to a school");
        error.statusCode = 403;
        throw error;
      }
      return { user: { schoolId: req.user.schoolId } };
  }
}

export async function canAccessStudent(req, studentId) {
  const where = await accessibleStudentWhere(req);
  return Boolean(await prisma.student.findFirst({ where: { id: studentId, ...where }, select: { id: true } }));
}
