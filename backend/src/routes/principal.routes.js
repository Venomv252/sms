import express from "express";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import { auth, allowRoles } from "../middleware/auth.js";
import { requireSchoolScope } from "../middleware/schoolScope.js";
import { broadcastBusLocation } from "../services/websocket.js";
import { haversineDistance } from "../utils/haversine.js";

const router = express.Router();

// All routes require PRINCIPAL role and school assignment
router.use(auth, allowRoles("PRINCIPAL"), requireSchoolScope);

/**
 * GET /api/principal/dashboard/overview
 * Comprehensive dashboard overview with live statistics
 */
router.get("/dashboard/overview", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get school info
    const school = await prisma.school.findUnique({
      where: { id: schoolId },
      select: { id: true, name: true, code: true, address: true },
    });

    // Student counts
    const totalStudents = await prisma.student.count({
      where: { user: { schoolId } },
    });

    // Teacher counts
    const totalTeachers = await prisma.teacher.count({
      where: { user: { schoolId } },
    });

    // Total employees (all staff)
    const totalEmployees = await prisma.user.count({
      where: {
        schoolId,
        role: { in: ["TEACHER", "ACCOUNTANT", "DRIVER", "MANAGEMENT"] },
      },
    });

    // Today's student attendance
    const studentAttendanceToday = await prisma.attendance.groupBy({
      by: ["status"],
      where: {
        student: { user: { schoolId } },
        date: { gte: today, lt: tomorrow },
      },
      _count: { status: true },
    });

    const presentStudents = studentAttendanceToday.find((a) => a.status === "PRESENT")?._count.status || 0;
    const totalAttendanceRecords = studentAttendanceToday.reduce((sum, a) => sum + a._count.status, 0);
    const studentAttendanceRate = totalAttendanceRecords > 0 
      ? Math.round((presentStudents / totalAttendanceRecords) * 100) 
      : 0;

    // Fee statistics
    const totalFeesData = await prisma.feePayment.aggregate({
      where: { student: { user: { schoolId } } },
      _sum: { amount: true },
    });

    const paidFeesData = await prisma.feePayment.aggregate({
      where: {
        student: { user: { schoolId } },
        status: "PAID",
      },
      _sum: { amount: true },
    });

    const pendingFeesData = await prisma.feePayment.aggregate({
      where: {
        student: { user: { schoolId } },
        status: { in: ["PENDING", "OVERDUE"] },
      },
      _sum: { amount: true },
    });

    const totalFees = Number(totalFeesData._sum.amount || 0);
    const collectedFees = Number(paidFeesData._sum.amount || 0);
    const pendingFees = Number(pendingFeesData._sum.amount || 0);

    // Active buses
    const activeBuses = await prisma.bus.count({
      where: { schoolId, isActive: true },
    });

    // Pending leave applications
    const pendingLeaves = await prisma.leaveRequest.count({
      where: {
        user: { schoolId },
        status: "PENDING",
      },
    });

    // Unresolved complaints
    const unresolvedComplaints = await prisma.complaint.count({
      where: {
        schoolId,
        status: { in: ["SUBMITTED", "UNDER_REVIEW", "ASSIGNED", "IN_PROGRESS"] },
      },
    });

    // Active notices
    const activeNotices = await prisma.notice.count({
      where: {
        schoolId,
        isActive: true,
        expiryDate: { gte: today },
      },
    });

    // Recent activity
    const recentAdmissions = await prisma.student.findMany({
      where: { user: { schoolId } },
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        admissionNumber: true,
        grade: true,
        section: true,
        createdAt: true,
        user: { select: { firstName: true, lastName: true } },
      },
    });

    const recentComplaints = await prisma.complaint.findMany({
      where: { schoolId },
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        category: true,
        priority: true,
        status: true,
        createdAt: true,
      },
    });

    const recentNotices = await prisma.notice.findMany({
      where: { schoolId, isActive: true },
      take: 5,
      orderBy: { publishDate: "desc" },
      select: {
        id: true,
        title: true,
        category: true,
        priority: true,
        publishDate: true,
      },
    });

    // Class-wise student distribution
    const studentsByClass = await prisma.student.groupBy({
      by: ["grade", "section"],
      where: { user: { schoolId } },
      _count: { id: true },
      orderBy: [{ grade: "asc" }, { section: "asc" }],
    });

    // Fee collection trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const feeCollectionTrends = await prisma.feePayment.groupBy({
      by: ["status"],
      where: {
        student: { user: { schoolId } },
        createdAt: { gte: sixMonthsAgo },
      },
      _sum: { amount: true },
      _count: { status: true },
    });

    return res.json({
      status: "success",
      data: {
        school,
        overview: {
          totalStudents,
          totalTeachers,
          totalEmployees,
          studentAttendanceToday: {
            present: presentStudents,
            total: totalAttendanceRecords,
            rate: studentAttendanceRate,
          },
          fees: {
            total: totalFees,
            collected: collectedFees,
            pending: pendingFees,
            collectionRate: totalFees > 0 ? Math.round((collectedFees / totalFees) * 100) : 0,
          },
          activeBuses,
          pendingLeaves,
          unresolvedComplaints,
          activeNotices,
        },
        charts: {
          studentsByClass: studentsByClass.map((s) => ({
            class: `${s.grade}-${s.section}`,
            count: s._count.id,
          })),
          feeCollectionTrends: feeCollectionTrends.map((f) => ({
            status: f.status,
            amount: Number(f._sum.amount || 0),
            count: f._count.status,
          })),
        },
        recentActivity: {
          admissions: recentAdmissions.map((s) => ({
            id: s.id,
            name: `${s.user.firstName} ${s.user.lastName}`,
            admissionNumber: s.admissionNumber,
            class: `${s.grade}-${s.section}`,
            date: s.createdAt,
          })),
          complaints: recentComplaints,
          notices: recentNotices,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/principal/students
 * Get all students with filters
 */
router.get("/students", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { grade, section, search, page = 1, limit = 20 } = req.query;

    const where = {
      user: { schoolId },
      ...(grade && { grade }),
      ...(section && { section }),
      ...(search && {
        OR: [
          { user: { firstName: { contains: search, mode: "insensitive" } } },
          { user: { lastName: { contains: search, mode: "insensitive" } } },
          { rollNumber: { contains: search, mode: "insensitive" } },
          { admissionNumber: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: [{ grade: "asc" }, { section: "asc" }, { rollNumber: "asc" }],
        select: {
          id: true,
          rollNumber: true,
          admissionNumber: true,
          grade: true,
          section: true,
          dateOfBirth: true,
          phoneNumber: true,
          parentName: true,
          parentEmail: true,
          parentPhone: true,
          bloodGroup: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      prisma.student.count({ where }),
    ]);

    return res.json({
      status: "success",
      data: {
        students: students.map((s) => ({
          id: s.id,
          userId: s.user.id,
          name: `${s.user.firstName} ${s.user.lastName}`,
          email: s.user.email,
          rollNumber: s.rollNumber,
          admissionNumber: s.admissionNumber,
          class: `${s.grade}-${s.section}`,
          grade: s.grade,
          section: s.section,
          dateOfBirth: s.dateOfBirth,
          phoneNumber: s.phoneNumber,
          parentName: s.parentName,
          parentEmail: s.parentEmail,
          parentPhone: s.parentPhone,
          bloodGroup: s.bloodGroup,
        })),
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/principal/students/:id
 * Get detailed student profile
 */
router.get("/students/:id", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;

    const student = await prisma.student.findFirst({
      where: {
        id,
        user: { schoolId },
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        attendance: {
          take: 30,
          orderBy: { date: "desc" },
        },
        results: {
          orderBy: { createdAt: "desc" },
          include: {
            subject: { select: { name: true, code: true } },
          },
        },
        fees: {
          orderBy: { createdAt: "desc" },
        },
        leaves: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found",
      });
    }

    // Calculate attendance percentage
    const presentCount = student.attendance.filter((a) => a.status === "PRESENT").length;
    const attendanceRate = student.attendance.length > 0 
      ? Math.round((presentCount / student.attendance.length) * 100) 
      : 0;

    // Calculate fee payment status
    const totalFeeAmount = student.fees.reduce((sum, f) => sum + Number(f.amount), 0);
    const paidFeeAmount = student.fees
      .filter((f) => f.status === "PAID")
      .reduce((sum, f) => sum + Number(f.amount), 0);

    return res.json({
      status: "success",
      data: {
        student: {
          id: student.id,
          userId: student.user.id,
          name: `${student.user.firstName} ${student.user.lastName}`,
          email: student.user.email,
          rollNumber: student.rollNumber,
          admissionNumber: student.admissionNumber,
          class: `${student.grade}-${student.section}`,
          grade: student.grade,
          section: student.section,
          dateOfBirth: student.dateOfBirth,
          phoneNumber: student.phoneNumber,
          parentName: student.parentName,
          parentEmail: student.parentEmail,
          parentPhone: student.parentPhone,
          bloodGroup: student.bloodGroup,
          address: student.address,
        },
        attendance: {
          rate: attendanceRate,
          recent: student.attendance.slice(0, 10).map((a) => ({
            date: a.date,
            status: a.status,
            remarks: a.remarks,
          })),
        },
        academic: {
          results: student.results.map((r) => ({
            subject: r.subject.name,
            subjectCode: r.subject.code,
            examType: r.examType,
            theoryMarks: r.theoryMarks,
            internalMarks: r.internalMarks,
            totalMarks: r.totalMarks,
            grade: r.grade,
            term: r.term,
            academicYear: r.academicYear,
          })),
        },
        fees: {
          total: totalFeeAmount,
          paid: paidFeeAmount,
          pending: totalFeeAmount - paidFeeAmount,
          records: student.fees.map((f) => ({
            id: f.id,
            amount: Number(f.amount),
            term: f.term,
            academicYear: f.academicYear,
            status: f.status,
            dueDate: f.dueDate,
            paymentDate: f.paymentDate,
            transactionId: f.transactionId,
          })),
        },
        leaves: student.leaves.map((l) => ({
          id: l.id,
          fromDate: l.fromDate,
          toDate: l.toDate,
          reason: l.reason,
          status: l.status,
          adminNote: l.adminNote,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/principal/teachers
 * Get all teachers with filters
 */
router.get("/teachers", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { department, search, page = 1, limit = 20 } = req.query;

    const where = {
      user: { schoolId },
      ...(department && { department }),
      ...(search && {
        OR: [
          { user: { firstName: { contains: search, mode: "insensitive" } } },
          { user: { lastName: { contains: search, mode: "insensitive" } } },
          { employeeId: { contains: search, mode: "insensitive" } },
          { department: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          employeeId: true,
          department: true,
          designation: true,
          phoneNumber: true,
          address: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          subjects: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          classes: {
            select: {
              id: true,
              name: true,
              grade: true,
              section: true,
            },
          },
        },
      }),
      prisma.teacher.count({ where }),
    ]);

    return res.json({
      status: "success",
      data: {
        teachers: teachers.map((t) => ({
          id: t.id,
          userId: t.user.id,
          name: `${t.user.firstName} ${t.user.lastName}`,
          email: t.user.email,
          employeeId: t.employeeId,
          department: t.department,
          designation: t.designation,
          phoneNumber: t.phoneNumber,
          subjects: t.subjects.map((s) => s.name).join(", "),
          classesCount: t.classes.length,
        })),
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/principal/accountants
 * Create accountant account
 */
router.post("/accountants", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      employeeId,
      phoneNumber,
      permissions,
      approvalLimit,
      username,
      temporaryPassword,
    } = req.body;
    const schoolId = req.user.schoolId;

    // Validate required fields
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !employeeId?.trim() || !username?.trim() || !temporaryPassword?.trim()) {
      return res.status(400).json({
        status: "error",
        message: "First name, last name, email, employee ID, username, and password are required",
      });
    }

    // Validate password length
    if (temporaryPassword.length < 8 || temporaryPassword.length > 72) {
      return res.status(400).json({
        status: "error",
        message: "Password must be between 8 and 72 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "A user with this email already exists",
      });
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username: normalizedUsername },
    });

    if (existingUsername) {
      return res.status(409).json({
        status: "error",
        message: "Username already exists",
      });
    }

    // Check if employee ID already exists
    const existingAccountant = await prisma.accountant.findUnique({
      where: { employeeId: employeeId.trim() },
    });

    if (existingAccountant) {
      return res.status(409).json({
        status: "error",
        message: "An accountant with this employee ID already exists",
      });
    }

    const tempPassword = temporaryPassword.trim();
    const passwordHash = await bcrypt.hash(tempPassword, config.bcrypt.saltRounds);

    // Create user and accountant in transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: normalizedEmail,
          username: normalizedUsername,
          password: passwordHash,
          role: "ACCOUNTANT",
          schoolId,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        },
      });

      const accountant = await tx.accountant.create({
        data: {
          userId: user.id,
          employeeId: employeeId.trim(),
          phoneNumber: phoneNumber?.trim() || null,
          permissions: permissions || {},
          approvalLimit: approvalLimit ? parseFloat(approvalLimit) : null,
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      return { user, accountant };
    });

    return res.status(201).json({
      status: "success",
      message: "Accountant account created successfully",
      data: {
        accountant: {
          id: result.accountant.id,
          name: `${result.accountant.user.firstName} ${result.accountant.user.lastName}`,
          email: result.accountant.user.email,
          employeeId: result.accountant.employeeId,
        },
        credentials: {
          username: normalizedUsername,
          temporaryPassword: tempPassword,
          warning: "Store these credentials securely. They will not be shown again.",
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/principal/accountants
 * Get all accountants
 */
router.get("/accountants", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    const accountants = await prisma.accountant.findMany({
      where: {
        user: { schoolId },
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            username: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      status: "success",
      data: accountants.map((a) => ({
        id: a.id,
        userId: a.user.id,
        name: `${a.user.firstName} ${a.user.lastName}`,
        email: a.user.email,
        username: a.user.username,
        employeeId: a.employeeId,
        phoneNumber: a.phoneNumber,
        permissions: a.permissions,
        approvalLimit: a.approvalLimit ? Number(a.approvalLimit) : null,
        isActive: a.isActive,
        createdAt: a.user.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/principal/complaints
 * Get all complaints
 */
router.get("/complaints", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { status, priority, page = 1, limit = 20 } = req.query;

    const where = {
      schoolId,
      ...(status && { status }),
      ...(priority && { priority }),
    };

    const [complaints, total] = await Promise.all([
      prisma.complaint.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: { createdAt: "desc" },
      }),
      prisma.complaint.count({ where }),
    ]);

    return res.json({
      status: "success",
      data: {
        complaints,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/principal/complaints/:id/update
 * Update complaint status
 */
router.post("/complaints/:id/update", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, resolution, remarks, assignedTo } = req.body;
    const schoolId = req.user.schoolId;

    const complaint = await prisma.complaint.findFirst({
      where: { id, schoolId },
    });

    if (!complaint) {
      return res.status(404).json({
        status: "error",
        message: "Complaint not found",
      });
    }

    const updated = await prisma.complaint.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(resolution && { resolution }),
        ...(remarks && { remarks }),
        ...(assignedTo && { assignedTo }),
        ...(status === "RESOLVED" && { resolvedAt: new Date() }),
      },
    });

    return res.json({
      status: "success",
      message: "Complaint updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/principal/leaves
 * Get all leave requests
 */
router.get("/leaves", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { status, page = 1, limit = 20 } = req.query;

    const where = {
      user: { schoolId },
      ...(status && { status }),
    };

    const [leaves, total] = await Promise.all([
      prisma.leaveRequest.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
          student: {
            select: {
              grade: true,
              section: true,
            },
          },
        },
      }),
      prisma.leaveRequest.count({ where }),
    ]);

    return res.json({
      status: "success",
      data: {
        leaves: leaves.map((l) => ({
          id: l.id,
          applicant: `${l.user.firstName} ${l.user.lastName}`,
          role: l.user.role,
          studentClass: l.student ? `${l.student.grade}-${l.student.section}` : null,
          fromDate: l.fromDate,
          toDate: l.toDate,
          reason: l.reason,
          status: l.status,
          adminNote: l.adminNote,
          createdAt: l.createdAt,
        })),
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/principal/leaves/:id/approve
 * Approve leave request
 */
router.post("/leaves/:id/approve", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminNote } = req.body;
    const schoolId = req.user.schoolId;

    const leave = await prisma.leaveRequest.findFirst({
      where: {
        id,
        user: { schoolId },
      },
    });

    if (!leave) {
      return res.status(404).json({
        status: "error",
        message: "Leave request not found",
      });
    }

    const updated = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: "APPROVED",
        adminNote: adminNote || "Approved by Principal",
      },
    });

    return res.json({
      status: "success",
      message: "Leave request approved",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/principal/leaves/:id/reject
 * Reject leave request
 */
router.post("/leaves/:id/reject", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminNote } = req.body;
    const schoolId = req.user.schoolId;

    const leave = await prisma.leaveRequest.findFirst({
      where: {
        id,
        user: { schoolId },
      },
    });

    if (!leave) {
      return res.status(404).json({
        status: "error",
        message: "Leave request not found",
      });
    }

    if (!adminNote?.trim()) {
      return res.status(400).json({
        status: "error",
        message: "Reason for rejection is required",
      });
    }

    const updated = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: "REJECTED",
        adminNote: adminNote.trim(),
      },
    });

    return res.json({
      status: "success",
      message: "Leave request rejected",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/principal/notices
 * Get all notices for the school
 */
router.get("/notices", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { isActive, page = 1, limit = 20 } = req.query;

    const where = {
      schoolId,
      ...(isActive !== undefined && { isActive: isActive === "true" }),
    };

    const [notices, total] = await Promise.all([
      prisma.notice.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: { publishDate: "desc" },
      }),
      prisma.notice.count({ where }),
    ]);

    return res.json({
      status: "success",
      data: {
        notices,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/principal/notices
 * Create a new notice
 */
router.post("/notices", async (req, res, next) => {
  try {
    const { title, content, category, priority, publishDate, expiryDate } = req.body;
    const schoolId = req.user.schoolId;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        status: "error",
        message: "Title and content are required",
      });
    }

    const notice = await prisma.notice.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        category: category || "GENERAL",
        priority: priority || "NORMAL",
        publishDate: publishDate ? new Date(publishDate) : new Date(),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        schoolId,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Notice created successfully",
      data: notice,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/principal/finance/summary
 * Get financial summary
 */
router.get("/finance/summary", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    // Total fees
    const totalFeesData = await prisma.feePayment.aggregate({
      where: { student: { user: { schoolId } } },
      _sum: { amount: true },
      _count: { id: true },
    });

    // Fees by status
    const feesByStatus = await prisma.feePayment.groupBy({
      by: ["status"],
      where: { student: { user: { schoolId } } },
      _sum: { amount: true },
      _count: { status: true },
    });

    // Fees by class
    const feesByClass = await prisma.feePayment.groupBy({
      by: ["term"],
      where: { student: { user: { schoolId } } },
      _sum: { amount: true },
      _count: { term: true },
    });

    // Fee defaulters (overdue payments)
    const defaulters = await prisma.feePayment.findMany({
      where: {
        student: { user: { schoolId } },
        status: "OVERDUE",
      },
      include: {
        student: {
          select: {
            id: true,
            grade: true,
            section: true,
            user: {
              select: { firstName: true, lastName: true },
            },
          },
        },
      },
      orderBy: { dueDate: "asc" },
      take: 20,
    });

    return res.json({
      status: "success",
      data: {
        summary: {
          total: Number(totalFeesData._sum.amount || 0),
          totalRecords: totalFeesData._count.id,
        },
        byStatus: feesByStatus.map((f) => ({
          status: f.status,
          amount: Number(f._sum.amount || 0),
          count: f._count.status,
        })),
        byTerm: feesByClass.map((f) => ({
          term: f.term,
          amount: Number(f._sum.amount || 0),
          count: f._count.term,
        })),
        defaulters: defaulters.map((f) => ({
          id: f.id,
          studentName: `${f.student.user.firstName} ${f.student.user.lastName}`,
          class: `${f.student.grade}-${f.student.section}`,
          amount: Number(f.amount),
          dueDate: f.dueDate,
          term: f.term,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// GPS TRACKING & LIVE LOCATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/principal/tracking/active-trips
 * Get all active trips with live GPS location
 */
router.get("/tracking/active-trips", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    const activeTrips = await prisma.trip.findMany({
      where: {
        bus: { schoolId },
        status: "IN_PROGRESS",
      },
      include: {
        bus: {
          select: {
            id: true,
            busNumber: true,
            capacity: true,
            registrationNumber: true,
          },
        },
      },
      orderBy: { startTime: "desc" },
    });

    return res.json({
      status: "success",
      data: {
        trips: activeTrips.map((trip) => ({
          id: trip.id,
          busId: trip.busId,
          busNumber: trip.bus.busNumber,
          registrationNumber: trip.bus.registrationNumber,
          routeName: trip.routeName,
          status: trip.status,
          startTime: trip.startTime,
          currentLatitude: trip.currentLatitude,
          currentLongitude: trip.currentLongitude,
          lastLocationUpdate: trip.lastLocationUpdate,
          delayMinutes: trip.delayMinutes,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/principal/tracking/trip/:id
 * Get detailed trip information with GPS history
 */
router.get("/tracking/trip/:id", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;

    const trip = await prisma.trip.findFirst({
      where: {
        id,
        bus: { schoolId },
      },
      include: {
        bus: {
          select: {
            id: true,
            busNumber: true,
            capacity: true,
            registrationNumber: true,
          },
        },
        locationHistory: {
          orderBy: { recordedAt: "desc" },
          take: 100, // Last 100 GPS points
        },
      },
    });

    if (!trip) {
      return res.status(404).json({
        status: "error",
        message: "Trip not found",
      });
    }

    return res.json({
      status: "success",
      data: {
        trip: {
          id: trip.id,
          busId: trip.busId,
          busNumber: trip.bus.busNumber,
          registrationNumber: trip.bus.registrationNumber,
          routeName: trip.routeName,
          status: trip.status,
          startTime: trip.startTime,
          endTime: trip.endTime,
          currentLatitude: trip.currentLatitude,
          currentLongitude: trip.currentLongitude,
          lastLocationUpdate: trip.lastLocationUpdate,
          delayMinutes: trip.delayMinutes,
          remarks: trip.remarks,
          locationHistory: trip.locationHistory.map((loc) => ({
            latitude: loc.latitude,
            longitude: loc.longitude,
            recordedAt: loc.recordedAt,
          })),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/principal/tracking/trip/:id/location
 * Update bus location (called by driver app or simulation)
 * This endpoint is for ADMIN/PRINCIPAL testing and simulation
 */
router.post("/tracking/trip/:id/location", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        status: "error",
        message: "Latitude and longitude are required",
      });
    }

    // Validate trip exists and belongs to school
    const trip = await prisma.trip.findFirst({
      where: {
        id,
        bus: { schoolId },
      },
    });

    if (!trip) {
      return res.status(404).json({
        status: "error",
        message: "Trip not found",
      });
    }

    if (trip.status !== "IN_PROGRESS") {
      return res.status(400).json({
        status: "error",
        message: "Trip is not in progress",
      });
    }

    // Update trip location
    const updatedTrip = await prisma.trip.update({
      where: { id },
      data: {
        currentLatitude: latitude,
        currentLongitude: longitude,
        lastLocationUpdate: new Date(),
      },
    });

    // Save to location history
    await prisma.busLocationHistory.create({
      data: {
        tripId: id,
        latitude,
        longitude,
      },
    });

    // Broadcast to WebSocket clients
    broadcastBusLocation(
      id,
      latitude,
      longitude,
      updatedTrip.lastLocationUpdate.toISOString()
    );

    return res.json({
      status: "success",
      data: {
        latitude,
        longitude,
        timestamp: updatedTrip.lastLocationUpdate,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/principal/tracking/start-trip
 * Start a new trip for a bus
 */
router.post("/tracking/start-trip", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { busId, routeName, startLatitude, startLongitude } = req.body;

    if (!busId || !routeName) {
      return res.status(400).json({
        status: "error",
        message: "Bus ID and route name are required",
      });
    }

    // Validate bus belongs to school
    const bus = await prisma.bus.findFirst({
      where: { id: busId, schoolId },
    });

    if (!bus) {
      return res.status(404).json({
        status: "error",
        message: "Bus not found",
      });
    }

    // Check if bus already has an active trip
    const existingTrip = await prisma.trip.findFirst({
      where: {
        busId,
        status: "IN_PROGRESS",
      },
    });

    if (existingTrip) {
      return res.status(400).json({
        status: "error",
        message: "Bus already has an active trip",
      });
    }

    // Create new trip
    const trip = await prisma.trip.create({
      data: {
        busId,
        routeName,
        startTime: new Date(),
        status: "IN_PROGRESS",
        currentLatitude: startLatitude || null,
        currentLongitude: startLongitude || null,
        lastLocationUpdate: startLatitude ? new Date() : null,
      },
      include: {
        bus: {
          select: {
            id: true,
            busNumber: true,
            registrationNumber: true,
          },
        },
      },
    });

    // Save initial location if provided
    if (startLatitude && startLongitude) {
      await prisma.busLocationHistory.create({
        data: {
          tripId: trip.id,
          latitude: startLatitude,
          longitude: startLongitude,
        },
      });
    }

    return res.status(201).json({
      status: "success",
      data: {
        trip: {
          id: trip.id,
          busId: trip.busId,
          busNumber: trip.bus.busNumber,
          routeName: trip.routeName,
          status: trip.status,
          startTime: trip.startTime,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/principal/tracking/end-trip/:id
 * End an active trip
 */
router.post("/tracking/end-trip/:id", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;
    const { remarks } = req.body;

    // Validate trip exists and belongs to school
    const trip = await prisma.trip.findFirst({
      where: {
        id,
        bus: { schoolId },
      },
    });

    if (!trip) {
      return res.status(404).json({
        status: "error",
        message: "Trip not found",
      });
    }

    if (trip.status !== "IN_PROGRESS") {
      return res.status(400).json({
        status: "error",
        message: "Trip is not in progress",
      });
    }

    // Update trip
    const updatedTrip = await prisma.trip.update({
      where: { id },
      data: {
        status: "COMPLETED",
        endTime: new Date(),
        remarks: remarks || null,
      },
    });

    return res.json({
      status: "success",
      data: {
        trip: {
          id: updatedTrip.id,
          status: updatedTrip.status,
          endTime: updatedTrip.endTime,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/principal/tracking/stats
 * Get real-time tracking statistics
 */
router.get("/tracking/stats", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    const [activeTrips, totalBuses, todayTrips] = await Promise.all([
      prisma.trip.count({
        where: {
          bus: { schoolId },
          status: "IN_PROGRESS",
        },
      }),
      prisma.bus.count({
        where: { schoolId, isActive: true },
      }),
      prisma.trip.count({
        where: {
          bus: { schoolId },
          startTime: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

    return res.json({
      status: "success",
      data: {
        activeTrips,
        totalBuses,
        todayTrips,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;