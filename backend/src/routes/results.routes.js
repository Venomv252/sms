import { Router } from "express";
import prisma from "../config/prisma.js";
import { auth, allowRoles } from "../middleware/auth.js";

const router = Router();

router.use(auth);

// GET RESULTS
router.get(
  "/",
  allowRoles(
    "SUPER_ADMIN",
    "DIRECTOR",
    "PRINCIPAL",
    "MANAGEMENT",
    "TEACHER",
    "STUDENT",
    "PARENT",
  ),
  async (req, res, next) => {
    try {
      const { role, id, schoolId } = req.user;
      let where = {};

      switch (role) {
        case "SUPER_ADMIN":
          // Admin can view results across all schools.
          break;

        case "STUDENT": {
          const student = await prisma.student.findUnique({
            where: { userId: id },
            select: { id: true },
          });

          if (!student) {
            return res.status(404).json({
              message: "Student profile not found",
            });
          }

          where.studentId = student.id;
          break;
        }

        case "PARENT":
          where.student = {
            parentLinks: {
              some: { parentUserId: id },
            },
          };
          break;

        case "TEACHER":
          if (!schoolId) {
            return res.status(403).json({
              message: "Your account is not assigned to a school",
            });
          }

          where = {
            student: {
              user: { schoolId },
            },
            subject: {
              teacher: {
                userId: id,
              },
            },
          };
          break;

        case "PRINCIPAL":
        case "MANAGEMENT":
          if (!schoolId) {
            return res.status(403).json({
              message: "Your account is not assigned to a school",
            });
          }

          where = {
            student: {
              user: { schoolId },
            },
            subject: {
              teacher: {
                user: { schoolId },
              },
            },
          };
          break;
      }

      const results = await prisma.result.findMany({
        where,
        select: {
          id: true,
          studentId: true,
          subjectId: true,
          examType: true,
          theoryMarks: true,
          internalMarks: true,
          totalMarks: true,
          grade: true,
          remarks: true,
          academicYear: true,
          term: true,
          createdAt: true,

          subject: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },

          student: {
            select: {
              id: true,
              grade: true,
              section: true,
              rollNumber: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return res.json({ data: results });
    } catch (error) {
      next(error);
    }
  },
);

// CREATE RESULT
router.post(
  "/",
  allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "TEACHER"),
  async (req, res, next) => {
    try {
      const {
        studentId,
        subjectId,
        examType,
        theoryMarks,
        internalMarks,
        totalMarks,
        grade,
        academicYear,
        term,
        remarks,
      } = req.body ?? {};

      // Required fields
      if (
        !studentId ||
        !subjectId ||
        !examType ||
        theoryMarks == null ||
        internalMarks == null ||
        totalMarks == null ||
        !grade ||
        !academicYear ||
        !term
      ) {
        return res.status(400).json({
          message: "Required result fields are missing",
        });
      }

      // Validate marks
      const theory = Number(theoryMarks);
      const internal = Number(internalMarks);
      const total = Number(totalMarks);

      if (
        !Number.isFinite(theory) ||
        !Number.isFinite(internal) ||
        !Number.isFinite(total) ||
        theory < 0 ||
        internal < 0 ||
        total <= 0 ||
        theory + internal > total
      ) {
        return res.status(400).json({
          message: "Invalid marks. Check theory, internal and total marks.",
        });
      }

      // Fetch student and school information
      const student = await prisma.student.findUnique({
        where: { id: studentId },
        select: {
          id: true,
          grade: true,
          section: true,
          user: {
            select: {
              schoolId: true,
            },
          },
        },
      });

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      // Fetch subject and assigned teacher information
      const subject = await prisma.subject.findUnique({
        where: { id: subjectId },
        include: {
          teacher: {
            include: {
              user: {
                select: {
                  id: true,
                  schoolId: true,
                },
              },
            },
          },
        },
      });

      if (!subject || !subject.teacher?.user) {
        return res.status(404).json({
          message: "Subject or assigned teacher not found",
        });
      }

      const studentSchoolId = student.user.schoolId;
      const subjectSchoolId = subject.teacher.user.schoolId;

      // Student and subject must belong to the same school.
      if (
        !studentSchoolId ||
        !subjectSchoolId ||
        studentSchoolId !== subjectSchoolId
      ) {
        return res.status(403).json({
          message: "Student and subject must belong to the same school",
        });
      }

      // Non-admin users must belong to the same school.
      if (req.user.role !== "SUPER_ADMIN" && req.user.schoolId !== studentSchoolId) {
        return res.status(403).json({
          message: "You cannot create results for another school",
        });
      }

      // Teachers can only create results for their own subjects.
      if (
        req.user.role === "TEACHER" &&
        subject.teacher.user.id !== req.user.id
      ) {
        return res.status(403).json({
          message: "You are not assigned to this subject",
        });
      }

      // A teacher must also be assigned to a matching class.
      if (req.user.role === "TEACHER") {
        const assignedClass = await prisma.class.findFirst({
          where: {
            subjectId,
            teacherId: subject.teacherId,
            grade: student.grade,
            section: student.section,
            academicYear,
          },
          select: { id: true },
        });

        if (!assignedClass) {
          return res.status(403).json({
            message: "Student is not in your assigned class for this subject",
          });
        }
      }

      const result = await prisma.result.create({
        data: {
          studentId,
          subjectId,
          examType,
          theoryMarks: theory,
          internalMarks: internal,
          totalMarks: total,
          grade,
          academicYear,
          term,
          remarks,
        },
      });

      return res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
