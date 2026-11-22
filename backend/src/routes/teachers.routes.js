import { Router } from "express";
import prisma from "../config/prisma.js";
import { auth, allowRoles } from "../middleware/auth.js";

const router = Router();
router.use(auth);

router.get("/", allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT"), async (req, res, next) => {
  try {
    const teachers = await prisma.teacher.findMany({
      where: req.user.role === "SUPER_ADMIN" ? {} : { user: { schoolId: req.user.schoolId } },
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
        subjects: true,
        classes: true,
      },
    });
    res.json({ data: teachers });
  } catch (e) { next(e); }
});

router.get("/me", allowRoles("TEACHER"), async (req, res, next) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.id },
      include: { subjects: true, classes: true },
    });
    if (!teacher) return res.status(404).json({ message: "Teacher profile not found" });
    res.json({ data: teacher });
  } catch (e) { next(e); }
});

export default router;
