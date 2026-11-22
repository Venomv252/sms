
import { Router } from "express";
import prisma from "../config/prisma.js";
import { auth, allowRoles } from "../middleware/auth.js";
import { createScheduleWithConflictCheck } from "../services/schedule-conflict.service.js";

const router = Router();

router.use(auth);

const SCHOOL_ROLES = ["PRINCIPAL", "MANAGEMENT"];

const getClassSchoolFilter = (schoolId) => ({
  teacher: {
    user: { schoolId }
  }
});

// GET SCHEDULES
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
      const { id, role, schoolId } = req.user;

      if (role !== "SUPER_ADMIN" && !schoolId) {
        return res.status(403).json({
          message: "Your account is not assigned to a school"
        });
      }

      let where = {};

      if (role === "SUPER_ADMIN") {
        where = {};
      }

      if (SCHOOL_ROLES.includes(role)) {
        where = {
          class: getClassSchoolFilter(schoolId)
        };
      }

      if (role === "TEACHER") {
        where = {
          class: {
            teacher: {
              userId: id,
              user: { schoolId }
            }
          }
        };
      }

      if (role === "STUDENT") {
        const student = await prisma.student.findUnique({
          where: { userId: id },
          select: {
            grade: true,
            section: true
          }
        });

        if (!student) {
          return res.status(404).json({
            message: "Student record not found"
          });
        }

        where = {
          class: {
            grade: student.grade,
            section: student.section,
            ...getClassSchoolFilter(schoolId)
          }
        };
      }

      if (role === "PARENT") {
        const children = await prisma.parentStudent.findMany({
          where: { parentUserId: id },
          select: {
            student: {
              select: {
                grade: true,
                section: true,
                user: {
                  select: { schoolId: true }
                }
              }
            }
          }
        });

        if (children.length === 0) {
          return res.json({ data: [] });
        }

        where = {
          OR: children
            .filter(
              (link) => link.student.user.schoolId === schoolId
            )
            .map((link) => ({
              class: {
                grade: link.student.grade,
                section: link.student.section,
                ...getClassSchoolFilter(schoolId)
              }
            }))
        };
      }

      const schedules = await prisma.schedule.findMany({
        where,
        select: {
          id: true,
          dayOfWeek: true,
          period: true,
          startTime: true,
          endTime: true,
          room: true,
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
              },
              teacher: {
                select: {
                  user: {
                    select: {
                      firstName: true,
                      lastName: true
                    }
                  }
                }
              }
            }
          }
        },
        orderBy: [
          { dayOfWeek: "asc" },
          { period: "asc" }
        ]
      });

      return res.json({ data: schedules });
    } catch (error) {
      next(error);
    }
  }
);

// CREATE SCHEDULE
router.post(
  "/",
  allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT"),
  async (req, res, next) => {
    try {
      const {
        classId,
        dayOfWeek,
        period,
        startTime,
        endTime,
        room
      } = req.body ?? {};

      if (
        !classId ||
        !dayOfWeek ||
        period == null ||
        !startTime ||
        !endTime
      ) {
        return res.status(400).json({
          message: "Required schedule fields are missing"
        });
      }

      const validDays = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY"
      ];

      if (!validDays.includes(dayOfWeek)) {
        return res.status(400).json({
          message: "Invalid day of week"
        });
      }

      const periodNumber = Number(period);

      if (!Number.isInteger(periodNumber) || periodNumber < 1) {
        return res.status(400).json({
          message: "Period must be a positive integer"
        });
      }

      const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

      if (
        !timePattern.test(startTime) ||
        !timePattern.test(endTime)
      ) {
        return res.status(400).json({
          message: "Time must use HH:mm format"
        });
      }

      const toMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      if (toMinutes(endTime) <= toMinutes(startTime)) {
        return res.status(400).json({
          message: "End time must be later than start time"
        });
      }

      const { role, schoolId } = req.user;

      if (role !== "SUPER_ADMIN" && !schoolId) {
        return res.status(403).json({
          message: "Your account is not assigned to a school"
        });
      }

      const classRecord = await prisma.class.findFirst({
        where: {
          id: classId,
          ...(role === "SUPER_ADMIN"
            ? {}
            : getClassSchoolFilter(schoolId))
        },
        select: {
          id: true,
          teacher: {
            select: {
              user: {
                select: { schoolId: true }
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

      // Create schedule with conflict detection
      // This uses a serializable transaction to prevent race conditions
      try {
        const schedule = await createScheduleWithConflictCheck({
          classId,
          dayOfWeek,
          period: periodNumber,
          startTime,
          endTime,
          room
        });

        return res.status(201).json({
          data: schedule
        });
      } catch (conflictError) {
        // Handle conflict detection errors
        if (conflictError.statusCode === 409 && conflictError.conflicts) {
          return res.status(409).json({
            message: conflictError.message,
            conflicts: conflictError.conflicts
          });
        }

        // Handle unique constraint violation (P2002)
        if (conflictError.code === "P2002") {
          const meta = conflictError.meta;
          if (meta?.target && meta.target.includes("classId") && 
              meta.target.includes("dayOfWeek") && meta.target.includes("period")) {
            return res.status(409).json({
              message: "Schedule conflict detected",
              conflicts: [{
                type: "CLASS_PERIOD_CONFLICT",
                message: "Class already has a schedule for this day and period"
              }]
            });
          }
          // Other unique constraint violations
          return res.status(409).json({
            message: "Schedule conflict detected",
            conflicts: [{
              type: "CONSTRAINT_VIOLATION",
              message: "A schedule with these details already exists"
            }]
          });
        }

        // Handle serialization failures (concurrent transaction conflicts)
        if (
          conflictError.code === "P2034" ||
          conflictError.message?.includes("serialization")
        ) {
          return res.status(409).json({
            message:
              "Schedule conflict detected due to concurrent request. Please try again.",
            conflicts: []
          });
        }

        // Re-throw other errors to be handled by error middleware
        throw conflictError;
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE SCHEDULE (for testing and admin management)
router.delete(
  "/:id",
  allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role, schoolId } = req.user;

      // Verify schedule exists and check school isolation
      const schedule = await prisma.schedule.findUnique({
        where: { id },
        include: {
          class: {
            select: {
              teacher: {
                select: {
                  user: {
                    select: { schoolId: true }
                  }
                }
              }
            }
          }
        }
      });

      if (!schedule) {
        return res.status(404).json({
          message: "Schedule not found"
        });
      }

      // Check school isolation (except for ADMIN)
      if (
        role !== "SUPER_ADMIN" &&
        schedule.class.teacher.user.schoolId !== schoolId
      ) {
        return res.status(403).json({
          message: "Cannot delete schedules from other schools"
        });
      }

      await prisma.schedule.delete({
        where: { id }
      });

      return res.status(200).json({
        message: "Schedule deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
