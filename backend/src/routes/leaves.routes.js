import { Router } from "express";
import prisma from "../config/prisma.js";
import { auth, allowRoles, allowRoleGroup } from "../middleware/auth.js";

const router = Router();
router.use(auth);

/**
 * GET /api/leaves
 * Get leave requests
 * - Students see their own leaves
 * - Parents see their children's leaves
 * - Staff see all leaves in their school
 */
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

      if (role === "SUPER_ADMIN") {
        // Can view all leaves
      } else if (role === "STUDENT") {
        // Students see only their own leaves
        where.userId = id;
      } else if (role === "PARENT") {
        // Parents see their children's leaves
        where.student = {
          parentLinks: {
            some: { parentUserId: id }
          }
        };
      } else {
        // Staff see leaves in their school
        if (!schoolId) {
          return res.status(403).json({
            message: "Your account is not assigned to a school"
          });
        }
        
        where.user = { schoolId };
      }

      const leaves = await prisma.leaveRequest.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true
            }
          },
          student: {
            select: {
              id: true,
              grade: true,
              section: true,
              rollNumber: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      });

      return res.json({ data: leaves });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/leaves
 * Submit a leave request
 * - Students can apply for their own leave
 * - Parents can apply for their children's leave
 */
router.post(
  "/",
  allowRoles("STUDENT", "PARENT", "TEACHER", "ACCOUNTANT", "MANAGEMENT", "PRINCIPAL"),
  async (req, res, next) => {
    try {
      const { fromDate, toDate, reason, studentId } = req.body;

      // Validate required fields
      if (!fromDate || !toDate || !reason) {
        return res.status(400).json({
          message: "fromDate, toDate, and reason are required"
        });
      }

      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return res.status(400).json({
          message: "Invalid date format"
        });
      }

      if (endDate < startDate) {
        return res.status(400).json({
          message: "End date cannot be before start date"
        });
      }

      const { role, id, schoolId } = req.user;
      let finalStudentId = null;

      if (role === "STUDENT") {
        // Student applying for their own leave
        const student = await prisma.student.findUnique({
          where: { userId: id },
          select: { id: true, user: { select: { schoolId: true } } }
        });

        if (!student) {
          return res.status(404).json({
            message: "Student profile not found"
          });
        }

        finalStudentId = student.id;
      } else if (role === "PARENT") {
        // Parent applying for child's leave
        if (!studentId) {
          return res.status(400).json({
            message: "studentId is required for parent leave applications"
          });
        }

        // Verify parent-child relationship
        const link = await prisma.parentStudent.findFirst({
          where: {
            parentUserId: id,
            studentId: studentId
          },
          include: {
            student: {
              select: {
                id: true,
                user: { select: { schoolId: true } }
              }
            }
          }
        });

        if (!link) {
          return res.status(403).json({
            message: "You are not authorized to apply leave for this student"
          });
        }

        finalStudentId = link.student.id;
      } else {
        // Staff applying for their own leave (teacher, management, etc.)
        if (!schoolId) {
          return res.status(403).json({
            message: "Your account is not assigned to a school"
          });
        }
        // Staff leaves don't have studentId
        finalStudentId = null;
      }

      // Create leave request
      const leave = await prisma.leaveRequest.create({
        data: {
          userId: id,
          studentId: finalStudentId,
          fromDate: startDate,
          toDate: endDate,
          reason: reason.trim(),
          status: "PENDING"
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              role: true
            }
          },
          student: {
            select: {
              grade: true,
              section: true,
              rollNumber: true
            }
          }
        }
      });

      return res.status(201).json({
        message: "Leave request submitted successfully",
        data: leave
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PATCH /api/leaves/:id
 * Update leave request status (approve/reject)
 * Only principals and management can update
 */
router.patch(
  "/:id",
  allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT"),
  async (req, res, next) => {
    try {
      const { id: leaveId } = req.params;
      const { status, adminNote } = req.body;

      if (!status || !["APPROVED", "REJECTED"].includes(status)) {
        return res.status(400).json({
          message: "Invalid status. Must be APPROVED or REJECTED"
        });
      }

      const { role, schoolId } = req.user;

      // Find the leave request
      const leave = await prisma.leaveRequest.findUnique({
        where: { id: leaveId },
        include: {
          user: {
            select: { schoolId: true }
          }
        }
      });

      if (!leave) {
        return res.status(404).json({
          message: "Leave request not found"
        });
      }

      // Verify school scope
      if (role !== "SUPER_ADMIN" && leave.user.schoolId !== schoolId) {
        return res.status(403).json({
          message: "You cannot update leaves from another school"
        });
      }

      // Update leave status
      const updated = await prisma.leaveRequest.update({
        where: { id: leaveId },
        data: {
          status,
          adminNote: adminNote || null
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          student: {
            select: {
              grade: true,
              section: true,
              rollNumber: true
            }
          }
        }
      });

      return res.json({
        message: `Leave request ${status.toLowerCase()}`,
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/leaves/summary
 * Get leave summary/statistics
 */
router.get(
  "/summary",
  allowRoles("STUDENT", "PARENT", "TEACHER", "ACCOUNTANT", "MANAGEMENT", "PRINCIPAL"),
  async (req, res, next) => {
    try {
      const { role, id } = req.user;
      let where = {};

      if (role === "STUDENT") {
        where.userId = id;
      } else if (role === "PARENT") {
        where.student = {
          parentLinks: {
            some: { parentUserId: id }
          }
        };
      } else {
        // For staff, return their own leave summary
        where.userId = id;
      }

      const [total, pending, approved, rejected] = await Promise.all([
        prisma.leaveRequest.count({ where }),
        prisma.leaveRequest.count({ where: { ...where, status: "PENDING" } }),
        prisma.leaveRequest.count({ where: { ...where, status: "APPROVED" } }),
        prisma.leaveRequest.count({ where: { ...where, status: "REJECTED" } })
      ]);

      // Calculate total days (sum of approved leaves)
      const approvedLeaves = await prisma.leaveRequest.findMany({
        where: { ...where, status: "APPROVED" },
        select: { fromDate: true, toDate: true }
      });

      const totalDays = approvedLeaves.reduce((sum, leave) => {
        const days = Math.ceil(
          (new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24)
        ) + 1;
        return sum + days;
      }, 0);

      return res.json({
        data: {
          total,
          pending,
          approved,
          rejected,
          totalDaysApproved: totalDays
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
