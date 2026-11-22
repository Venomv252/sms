import { Router } from "express";
import prisma from "../config/prisma.js";
import { auth, allowRoles } from "../middleware/auth.js";

const router = Router();

router.use(auth);

// GET /api/homework
router.get(
  "/",
  allowRoles(
    "SUPER_ADMIN",
    "DIRECTOR",
    "PRINCIPAL",
    "MANAGEMENT",
    "TEACHER",
    "STUDENT",
    "PARENT"
  ),
  async (req, res, next) => {
    try {
      const { role, id, schoolId } = req.user;

      let where = {};
      let submissionWhere = {};

      if (role === "SUPER_ADMIN") {
        // Platform admin can access all schools.
      } else if (role === "STUDENT") {
        const student = await prisma.student.findUnique({
          where: { userId: id },
          include: { user: true },
        });

        if (!student) {
          return res.status(404).json({
            status: "error",
            message: "Student profile not found",
          });
        }

        if (!student.user.schoolId) {
          return res.status(403).json({
            status: "error",
            message: "Student is not assigned to a school",
          });
        }

        where = {
          class: {
            grade: student.grade,
            section: student.section,
            teacher: {
              user: { schoolId: student.user.schoolId },
            },
          },
          subject: {
            teacher: {
              user: { schoolId: student.user.schoolId },
            },
          },
        };

        submissionWhere = { studentId: student.id };
      } else if (role === "PARENT") {
        const links = await prisma.parentStudent.findMany({
          where: { parentUserId: id },
          include: {
            student: {
              include: { user: true },
            },
          },
        });

        const childScopes = links
          .filter((link) => link.student.user.schoolId)
          .map((link) => ({
            AND: [
              {
                class: {
                  grade: link.student.grade,
                  section: link.student.section,
                  teacher: {
                    user: {
                      schoolId: link.student.user.schoolId,
                    },
                  },
                },
              },
              {
                subject: {
                  teacher: {
                    user: {
                      schoolId: link.student.user.schoolId,
                    },
                  },
                },
              },
            ],
          }));

        if (childScopes.length === 0) {
          return res.json({ data: [] });
        }

        where = { OR: childScopes };

        submissionWhere = {
          student: {
            parentLinks: {
              some: { parentUserId: id },
            },
          },
        };
      } else {
        // Principal, Management and Teacher must belong to a school.
        if (!schoolId) {
          return res.status(403).json({
            status: "error",
            message: "Your account is not assigned to a school",
          });
        }

        where = {
          class: {
            teacher: {
              user: { schoolId },
            },
          },
          subject: {
            teacher: {
              user: { schoolId },
            },
          },
        };

        if (role === "TEACHER") {
          where.class.teacher.userId = id;
          where.subject.teacher.userId = id;
        }
      }

      const homework = await prisma.homework.findMany({
        where,
        include: {
          subject: true,
          class: true,
          submissions: {
            where: submissionWhere,
          },
        },
        orderBy: { dueDate: "asc" },
      });

      return res.json({ data: homework });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/homework
router.post(
  "/",
  allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "TEACHER"),
  async (req, res, next) => {
    try {
      const {
        title,
        description,
        subjectId,
        classId,
        dueDate,
        totalMarks,
      } = req.body ?? {};

      if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof description !== "string" ||
        !description.trim() ||
        typeof subjectId !== "string" ||
        typeof classId !== "string" ||
        !dueDate
      ) {
        return res.status(400).json({
          status: "error",
          message: "Required homework fields are missing or invalid",
        });
      }

      const parsedDueDate = new Date(dueDate);

      if (Number.isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({
          status: "error",
          message: "Invalid due date",
        });
      }

      const marks =
        totalMarks === undefined ? 100 : Number(totalMarks);

      if (!Number.isFinite(marks) || marks <= 0) {
        return res.status(400).json({
          status: "error",
          message: "Total marks must be a positive number",
        });
      }

      // Fetch class and its assigned teacher.
      const classRecord = await prisma.class.findUnique({
        where: { id: classId },
        include: {
          teacher: {
            include: { user: true },
          },
        },
      });

      if (!classRecord) {
        return res.status(404).json({
          status: "error",
          message: "Class not found",
        });
      }

      // The subject must exist and belong to the selected class.
      const subject = await prisma.subject.findUnique({
        where: { id: subjectId },
        include: {
          teacher: {
            include: { user: true },
          },
        },
      });

      if (!subject) {
        return res.status(404).json({
          status: "error",
          message: "Subject not found",
        });
      }

      if (classRecord.subjectId !== subject.id) {
        return res.status(400).json({
          status: "error",
          message: "Subject does not belong to the selected class",
        });
      }

      // Class and subject must belong to the same school.
      const classSchoolId = classRecord.teacher.user.schoolId;
      const subjectSchoolId = subject.teacher.user.schoolId;

      if (!classSchoolId || classSchoolId !== subjectSchoolId) {
        return res.status(403).json({
          status: "error",
          message: "Class and subject school assignment is invalid",
        });
      }

      if (req.user.role !== "SUPER_ADMIN") {
        if (req.user.schoolId !== classSchoolId) {
          return res.status(403).json({
            status: "error",
            message: "You cannot create homework for another school",
          });
        }

        if (req.user.role === "TEACHER") {
          if (
            classRecord.teacher.userId !== req.user.id ||
            subject.teacher.userId !== req.user.id
          ) {
            return res.status(403).json({
              status: "error",
              message: "You are not assigned to this class and subject",
            });
          }
        }
      }

      const homework = await prisma.homework.create({
        data: {
          title: title.trim(),
          description: description.trim(),
          subjectId,
          classId,
          dueDate: parsedDueDate,
          totalMarks: marks,
        },
      });

      return res.status(201).json({ data: homework });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/homework/:id/submit
router.post(
  "/:id/submit",
  allowRoles("STUDENT"),
  async (req, res, next) => {
    try {
      const student = await prisma.student.findUnique({
        where: { userId: req.user.id },
        include: { user: true },
      });

      if (!student) {
        return res.status(404).json({
          status: "error",
          message: "Student profile not found",
        });
      }

      if (!student.user.schoolId) {
        return res.status(403).json({
          status: "error",
          message: "Student is not assigned to a school",
        });
      }

      const homework = await prisma.homework.findUnique({
        where: { id: req.params.id },
        include: {
          class: {
            include: {
              teacher: {
                include: { user: true },
              },
            },
          },
          subject: {
            include: {
              teacher: {
                include: { user: true },
              },
            },
          },
        },
      });

      if (!homework) {
        return res.status(404).json({
          status: "error",
          message: "Homework not found",
        });
      }

      const homeworkSchoolId = homework.class.teacher.user.schoolId;
      const subjectSchoolId = homework.subject.teacher.user.schoolId;

      if (
        !homeworkSchoolId ||
        homeworkSchoolId !== student.user.schoolId ||
        subjectSchoolId !== student.user.schoolId
      ) {
        return res.status(403).json({
          status: "error",
          message: "You cannot submit homework belonging to another school",
        });
      }

      if (
        homework.class.grade !== student.grade ||
        homework.class.section !== student.section ||
        homework.class.subjectId !== homework.subjectId
      ) {
        return res.status(403).json({
          status: "error",
          message: "This homework is not assigned to your class",
        });
      }

      const { textAnswer, fileUrl } = req.body ?? {};

      if (
        (textAnswer !== undefined && typeof textAnswer !== "string") ||
        (fileUrl !== undefined && typeof fileUrl !== "string")
      ) {
        return res.status(400).json({
          status: "error",
          message: "Invalid submission data",
        });
      }

      if (!textAnswer?.trim() && !fileUrl?.trim()) {
        return res.status(400).json({
          status: "error",
          message: "Provide a text answer or file URL",
        });
      }

      // Validate file URL format if provided
      if (fileUrl?.trim()) {
        let parsedUrl;
        try {
          parsedUrl = new URL(fileUrl.trim());
        } catch (urlError) {
          return res.status(400).json({
            status: "error",
            message: "Invalid file URL format",
          });
        }

        // Reject unsafe protocols
        const allowedProtocols = ["http:", "https:"];
        if (!allowedProtocols.includes(parsedUrl.protocol)) {
          return res.status(400).json({
            status: "error",
            message: "File URL must use HTTP or HTTPS protocol",
          });
        }
      }

      const now = new Date();
      const status = now > homework.dueDate ? "LATE" : "SUBMITTED";

      const submission = await prisma.homeworkSubmission.upsert({
        where: {
          homeworkId_studentId: {
            homeworkId: homework.id,
            studentId: student.id,
          },
        },
        update: {
          textAnswer: textAnswer?.trim() || null,
          fileUrl: fileUrl?.trim() || null,
          status,
          submittedAt: now,
        },
        create: {
          homeworkId: homework.id,
          studentId: student.id,
          textAnswer: textAnswer?.trim() || null,
          fileUrl: fileUrl?.trim() || null,
          status,
          submittedAt: now,
        },
      });

      return res.status(201).json({ data: submission });
    } catch (error) {
      next(error);
    }
  }
);

export default router;