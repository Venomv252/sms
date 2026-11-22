import { Router } from "express";
import prisma from "../config/prisma.js";
import { auth, allowRoles } from "../middleware/auth.js";
import { accessibleStudentWhere } from "../middleware/schoolScope.js";

const router = Router();
router.use(auth);

router.get("/me", async (req, res, next) => {
  try {
    if (req.user.role !== "STUDENT") return res.status(403).json({ message: "Students only" });
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id },
      include: { attendance: { orderBy: { date: "desc" }, take: 20 }, fees: true, certificates: true },
    });
    if (!student) return res.status(404).json({ message: "Student profile not found" });
    res.json({ data: student });
  } catch (e) { next(e); }
});

router.get("/children", allowRoles("PARENT"), async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({
      where: { parentLinks: { some: { parentUserId: req.user.id } } },
      include: { user: { select: { id: true, firstName: true, lastName: true } } },
      orderBy: [{ grade: "asc" }, { section: "asc" }, { rollNumber: "asc" }],
    });
    res.json({ data: students });
  } catch (e) { next(e); }
});

router.get("/", allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT", "TEACHER", "ACCOUNTANT"), async (req, res, next) => {
  try {
    const studentWhere = await accessibleStudentWhere(req);
    const students = await prisma.student.findMany({
      where: studentWhere,
      include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
      orderBy: [{ grade: "asc" }, { section: "asc" }, { rollNumber: "asc" }],
    });
    res.json({ data: students });
  } catch (e) { next(e); }
});

export default router;
