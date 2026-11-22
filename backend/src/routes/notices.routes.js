import { Router } from "express";
import prisma from "../config/prisma.js";
import { auth, allowRoles } from "../middleware/auth.js";

const router = Router();
router.use(auth);

router.get("/", async (req, res, next) => {
  try {
    const notices = await prisma.notice.findMany({
      where: {
        ...(req.user.role === "SUPER_ADMIN" ? {} : { schoolId: req.user.schoolId }),
        isActive: true,
        OR: [{ expiryDate: null }, { expiryDate: { gte: new Date() } }],
      },
      orderBy: { publishDate: "desc" },
    });
    res.json({ data: notices });
  } catch (e) { next(e); }
});

router.post("/", allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT", "TEACHER"), async (req, res, next) => {
  try {
    const { title, content, category, priority, expiryDate } = req.body ?? {};
    if (!title || !content || !category) return res.status(400).json({ message: "Title, content and category are required" });
    
    // Determine schoolId based on role
    let schoolId;
    if (req.user.role === "SUPER_ADMIN") {
      // SUPER_ADMIN can specify schoolId or create platform-wide notice (null)
      schoolId = req.body.schoolId !== undefined ? req.body.schoolId : null;
      
      // If ADMIN supplies a non-null schoolId, validate type and existence
      if (schoolId !== null) {
        // Validate type: must be a non-empty string
        if (typeof schoolId !== 'string' || !schoolId.trim()) {
          return res.status(400).json({ message: "School ID must be a non-empty string" });
        }
        
        // Verify school exists in database
        const schoolExists = await prisma.school.findUnique({
          where: { id: schoolId },
          select: { id: true },
        });
        if (!schoolExists) {
          return res.status(400).json({ message: "Invalid school ID: school does not exist" });
        }
      }
    } else {
      // School-scoped users must use their assigned or selected schoolId
      schoolId = req.user.schoolId;
    }
    
    const notice = await prisma.notice.create({
      data: { title, content, category, priority: priority || "NORMAL", expiryDate: expiryDate ? new Date(expiryDate) : null, schoolId },
    });
    res.status(201).json({ data: notice });
  } catch (e) { next(e); }
});

export default router;
