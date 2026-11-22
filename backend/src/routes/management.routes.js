import express from "express";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import { auth, allowRoles } from "../middleware/auth.js";
import { requireSchoolScope } from "../middleware/schoolScope.js";

const router = express.Router();

// All routes require MANAGEMENT role and school assignment
router.use(auth, allowRoles("MANAGEMENT"), requireSchoolScope);

/**
 * GET /api/management/dashboard/statistics
 * Get comprehensive dashboard statistics for the assigned school
 */
router.get("/dashboard/statistics", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    // Get school details
    const school = await prisma.school.findUnique({
      where: { id: schoolId },
      select: {
        id: true,
        name: true,
        code: true,
        address: true,
      },
    });

    if (!school) {
      return res.status(404).json({ status: "error", message: "School not found" });
    }

    // Enrollment statistics
    const totalStudents = await prisma.student.count({
      where: { user: { schoolId } },
    });

    // Staff statistics
    const totalTeachers = await prisma.teacher.count({
      where: { user: { schoolId } },
    });

    const totalStaff = await prisma.user.count({
      where: {
        schoolId,
        role: { in: ["TEACHER", "PRINCIPAL", "MANAGEMENT", "ACCOUNTANT", "DRIVER"] },
      },
    });

    // Academic statistics
    const totalClasses = await prisma.class.count({
      where: { teacher: { user: { schoolId } } },
    });

    const totalSubjects = await prisma.subject.count({
      where: { teacher: { user: { schoolId } } },
    });

    // Fee statistics
    const feeStats = await prisma.feePayment.aggregate({
      where: { student: { user: { schoolId } } },
      _sum: { amount: true },
    });

    const paidFees = await prisma.feePayment.aggregate({
      where: {
        student: { user: { schoolId } },
        status: "PAID",
      },
      _sum: { amount: true },
    });

    const pendingFees = await prisma.feePayment.aggregate({
      where: {
        student: { user: { schoolId } },
        status: { in: ["PENDING", "OVERDUE"] },
      },
      _sum: { amount: true },
    });

    const totalFees = Number(feeStats._sum.amount || 0);
    const collectedFees = Number(paidFees._sum.amount || 0);
    const pendingFeesAmount = Number(pendingFees._sum.amount || 0);

    // Attendance statistics for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAttendance = await prisma.attendance.groupBy({
      by: ["status"],
      where: {
        student: { user: { schoolId } },
        date: { gte: today, lt: tomorrow },
      },
      _count: { status: true },
    });

    const presentCount = todayAttendance.find((a) => a.status === "PRESENT")?._count.status || 0;
    const totalAttendanceRecords = todayAttendance.reduce((sum, a) => sum + a._count.status, 0);

    // Recent students (last 10)
    const recentStudents = await prisma.student.findMany({
      where: { user: { schoolId } },
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        rollNumber: true,
        grade: true,
        section: true,
        admissionNumber: true,
        createdAt: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Recent notices
    const recentNotices = await prisma.notice.findMany({
      where: {
        schoolId,
        isActive: true,
      },
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

    // Recent homework
    const recentHomework = await prisma.homework.findMany({
      where: {
        class: { teacher: { user: { schoolId } } },
      },
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        dueDate: true,
        subject: {
          select: { name: true },
        },
        class: {
          select: { name: true, grade: true, section: true },
        },
      },
    });

    // Fee collection by status
    const feeByStatus = await prisma.feePayment.groupBy({
      by: ["status"],
      where: { student: { user: { schoolId } } },
      _sum: { amount: true },
      _count: { status: true },
    });

    return res.json({
      status: "success",
      data: {
        school,
        enrollment: {
          total: totalStudents,
          capacity: 2500, // Could be configured per school in future
          percentage: totalStudents > 0 ? Math.round((totalStudents / 2500) * 100) : 0,
        },
        staffing: {
          totalStaff,
          totalTeachers,
          totalSupportStaff: totalStaff - totalTeachers,
        },
        academic: {
          totalClasses,
          totalSubjects,
          academicYear: "2024-25", // Could be dynamically determined
        },
        fees: {
          total: totalFees,
          collected: collectedFees,
          pending: pendingFeesAmount,
          collectionPercentage: totalFees > 0 ? Math.round((collectedFees / totalFees) * 100) : 0,
          byStatus: feeByStatus.map((f) => ({
            status: f.status,
            amount: Number(f._sum.amount || 0),
            count: f._count.status,
          })),
        },
        attendance: {
          today: {
            present: presentCount,
            total: totalAttendanceRecords,
            percentage: totalAttendanceRecords > 0 ? Math.round((presentCount / totalAttendanceRecords) * 100) : 0,
          },
        },
        recent: {
          students: recentStudents.map((s) => ({
            id: s.id,
            name: `${s.user.firstName} ${s.user.lastName}`,
            rollNumber: s.rollNumber,
            admissionNumber: s.admissionNumber,
            grade: s.grade,
            section: s.section,
            email: s.user.email,
            registeredAt: s.createdAt,
          })),
          notices: recentNotices,
          homework: recentHomework.map((h) => ({
            id: h.id,
            title: h.title,
            subject: h.subject.name,
            class: `${h.class.grade}-${h.class.section}`,
            dueDate: h.dueDate,
          })),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/management/principal/create
 * Create a Principal account for the current school
 */
router.post("/principal/create", async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const schoolId = req.user.schoolId;

    // Validate required fields
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return res.status(400).json({
        status: "error",
        message: "First name, last name, and email are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email format",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

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

    // Check if school already has a principal
    const existingPrincipal = await prisma.user.findFirst({
      where: {
        schoolId,
        role: "PRINCIPAL",
      },
    });

    if (existingPrincipal) {
      return res.status(409).json({
        status: "error",
        message: "This school already has a principal assigned",
      });
    }

    // Generate username from email (before @)
    let baseUsername = normalizedEmail.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
    if (baseUsername.length < 3) baseUsername = `principal${baseUsername}`;
    
    // Ensure username is unique
    let username = baseUsername;
    let counter = 1;
    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // Generate secure temporary password (12 characters)
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*";
    let tempPassword = "";
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      tempPassword += chars[randomIndex];
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(tempPassword, config.bcrypt.saltRounds);

    // Create principal user in transaction
    const principal = await prisma.user.create({
      data: {
        email: normalizedEmail,
        username,
        password: passwordHash,
        role: "PRINCIPAL",
        schoolId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        schoolId: true,
        school: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });

    // Return credentials ONLY ONCE
    return res.status(201).json({
      status: "success",
      message: "Principal account created successfully",
      data: {
        principal: {
          id: principal.id,
          name: `${principal.firstName} ${principal.lastName}`,
          email: principal.email,
          schoolName: principal.school?.name,
        },
        credentials: {
          username,
          temporaryPassword: tempPassword,
          // These credentials are shown only once
          warning: "Store these credentials securely. They will not be shown again.",
        },
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        status: "error",
        message: "Username or email already exists",
      });
    }
    next(error);
  }
});

/**
 * GET /api/management/principals
 * Get list of principals for the current school
 */
router.get("/principals", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    const principals = await prisma.user.findMany({
      where: {
        schoolId,
        role: "PRINCIPAL",
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      status: "success",
      data: principals.map((p) => ({
        id: p.id,
        name: `${p.firstName} ${p.lastName}`,
        email: p.email,
        username: p.username,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
