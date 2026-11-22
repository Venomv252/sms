
import { Router } from "express";
import prisma from "../config/prisma.js";
import { auth, allowRoles } from "../middleware/auth.js";
import {
  accessibleStudentWhere,
  canAccessStudent
} from "../middleware/schoolScope.js";

const router = Router();
router.use(auth);

// GET ATTENDANCE
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

      if (role !== "SUPER_ADMIN" && !schoolId) {
        return res.status(403).json({
          message: "Your account is not assigned to a school"
        });
      }

      const studentWhere = await accessibleStudentWhere(req);

      const where = {
        student: studentWhere
      };

      if (role === "TEACHER") {
        where.class = {
          teacher: {
            userId: id,
            user: { schoolId }
          }
        };
      }

      const attendance = await prisma.attendance.findMany({
        where,
        select: {
          id: true,
          studentId: true,
          classId: true,
          date: true,
          status: true,
          remarks: true,
          createdAt: true,
          class: {
            select: {
              id: true,
              name: true,
              grade: true,
              section: true,
              academicYear: true,
              subject: {
                select: {
                  id: true,
                  name: true,
                  code: true
                }
              }
            }
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
                  lastName: true
                }
              }
            }
          }
        },
        orderBy: { date: "desc" },
        take: 500
      });

      return res.json({ data: attendance });
    } catch (error) {
      next(error);
    }
  }
);

// CREATE ATTENDANCE
router.post(
  "/",
  allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT", "TEACHER"),
  async (req, res, next) => {
    try {
      const { studentId, classId, date, status, remarks } = req.body ?? {};

      if (!studentId || !classId || !date || !status) {
        return res.status(400).json({
          message: "studentId, classId, date and status are required"
        });
      }

      const allowedStatuses = [
        "PRESENT",
        "ABSENT",
        "LATE",
        "EXCUSED",
        "MEDICAL"
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid attendance status"
        });
      }

      const attendanceDate = new Date(date);

      if (Number.isNaN(attendanceDate.getTime())) {
        return res.status(400).json({
          message: "Invalid attendance date"
        });
      }

      const { role, id, schoolId } = req.user;

      if (role !== "SUPER_ADMIN" && !schoolId) {
        return res.status(403).json({
          message: "Your account is not assigned to a school"
        });
      }

      const student = await prisma.student.findFirst({
        where: {
          id: studentId,
          ...(role === "SUPER_ADMIN"
            ? {}
            : { user: { schoolId } })
        },
        select: {
          id: true,
          grade: true,
          section: true,
          user: {
            select: { schoolId: true }
          }
        }
      });

      if (!student) {
        return res.status(404).json({
          message: "Student not found in your school"
        });
      }

      const classRecord = await prisma.class.findFirst({
        where: {
          id: classId,
          ...(role === "SUPER_ADMIN"
            ? {}
            : { teacher: { user: { schoolId } } })
        },
        select: {
          id: true,
          grade: true,
          section: true,
          teacherId: true,
          subject: {
            select: {
              teacherId: true
            }
          },
          teacher: {
            select: {
              userId: true,
              user: {
                select: {
                  schoolId: true
                }
              }
            }
          }
        }
      });

      if (!classRecord) {
        return res.status(404).json({
          message: "Class not found in your school"
        });
      }

      // Enforce school consistency even for ADMIN.
      if (
        !student.user.schoolId ||
        student.user.schoolId !== classRecord.teacher.user.schoolId
      ) {
        return res.status(403).json({
          message: "Student and class must belong to the same school"
        });
      }

      if (
        student.grade !== classRecord.grade ||
        student.section !== classRecord.section
      ) {
        return res.status(400).json({
          message: "Student does not belong to the selected class section"
        });
      }

      // Teacher must own both the class and its subject.
      if (
        role === "TEACHER" &&
        (
          classRecord.teacher.userId !== id ||
          classRecord.subject.teacherId !== classRecord.teacherId
        )
      ) {
        return res.status(403).json({
          message: "You can only mark attendance for your assigned classes"
        });
      }

      const record = await prisma.attendance.upsert({
        where: {
          studentId_classId_date: {
            studentId,
            classId,
            date: attendanceDate
          }
        },
        update: {
          status,
          remarks: remarks ?? null
        },
        create: {
          studentId,
          classId,
          date: attendanceDate,
          status,
          remarks
        }
      });

      return res.status(201).json({ data: record });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
