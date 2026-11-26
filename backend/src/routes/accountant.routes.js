import { Router } from "express";
import { auth, allowRoles } from "../middleware/auth.js";
import prisma from "../config/prisma.js";

const router = Router();

// All routes require authentication and ACCOUNTANT role
router.use(auth);
router.use(allowRoles("ACCOUNTANT"));

/**
 * GET /api/accountant/overview
 * Get financial overview statistics
 */
router.get("/overview", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    // Get financial summary
    const [
      totalCollected,
      totalPending,
      totalOverdue,
      defaultersCount,
      recentTransactions,
      topDefaulters
    ] = await Promise.all([
      // Total collected
      prisma.feePayment.aggregate({
        where: {
          student: { user: { schoolId } },
          status: "PAID"
        },
        _sum: { amount: true }
      }),
      
      // Total pending
      prisma.feePayment.aggregate({
        where: {
          student: { user: { schoolId } },
          status: { in: ["PENDING", "PARTIAL"] }
        },
        _sum: { amount: true }
      }),
      
      // Total overdue
      prisma.feePayment.aggregate({
        where: {
          student: { user: { schoolId } },
          status: "OVERDUE"
        },
        _sum: { amount: true }
      }),
      
      // Count of students with pending fees
      prisma.student.count({
        where: {
          user: { schoolId },
          fees: {
            some: {
              status: { in: ["PENDING", "PARTIAL", "OVERDUE"] }
            }
          }
        }
      }),
      
      // Recent transactions
      prisma.feePayment.findMany({
        where: {
          student: { user: { schoolId } },
          status: "PAID"
        },
        take: 5,
        orderBy: { paymentDate: "desc" },
        include: {
          student: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        }
      }),
      
      // Top defaulters
      prisma.student.findMany({
        where: {
          user: { schoolId },
          fees: {
            some: {
              status: "OVERDUE"
            }
          }
        },
        take: 5,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          fees: {
            where: {
              status: { in: ["PENDING", "PARTIAL", "OVERDUE"] }
            }
          }
        }
      })
    ]);

    return res.json({
      status: "success",
      data: {
        totalCollected: Number(totalCollected._sum.amount || 0),
        totalPending: Number(totalPending._sum.amount || 0),
        totalOverdue: Number(totalOverdue._sum.amount || 0),
        defaultersCount,
        recentTransactions: recentTransactions.map(txn => ({
          id: txn.id,
          studentName: `${txn.student.user.firstName} ${txn.student.user.lastName}`,
          amount: Number(txn.amount),
          paymentDate: txn.paymentDate
        })),
        topDefaulters: topDefaulters.map(student => {
          const totalPending = student.fees.reduce((sum, payment) => 
            sum + Number(payment.amount), 0
          );
          const oldestPayment = student.fees.sort((a, b) => 
            new Date(a.dueDate) - new Date(b.dueDate)
          )[0];
          const daysOverdue = oldestPayment 
            ? Math.floor((Date.now() - new Date(oldestPayment.dueDate)) / (1000 * 60 * 60 * 24))
            : 0;
            
          return {
            id: student.id,
            studentName: `${student.user.firstName} ${student.user.lastName}`,
            pending: totalPending,
            daysOverdue
          };
        }).sort((a, b) => b.pending - a.pending)
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/accountant/students
 * Get students with fee status
 */
router.get("/students", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { status = "all" } = req.query;

    const where = { user: { schoolId } };
    
    if (status === "pending") {
      where.fees = {
        some: {
          status: { in: ["PENDING", "PARTIAL", "OVERDUE"] }
        }
      };
    } else if (status === "paid") {
      where.fees = {
        every: {
          status: "PAID"
        }
      };
    }

    const students = await prisma.student.findMany({
      where,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        fees: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json({
      status: "success",
      data: students.map(student => {
        const totalFee = student.fees.reduce((sum, p) => sum + Number(p.amount), 0);
        const paidAmount = student.fees
          .filter(p => p.status === "PAID")
          .reduce((sum, p) => sum + Number(p.amount), 0);
        const pendingAmount = totalFee - paidAmount;
        const isOverdue = student.fees.some(p => 
          p.status === "OVERDUE" || (p.dueDate && new Date(p.dueDate) < new Date())
        );

        return {
          id: student.id,
          name: `${student.user.firstName} ${student.user.lastName}`,
          rollNumber: student.rollNumber,
          class: `${student.grade}-${student.section}`,
          totalFee,
          paidAmount,
          pendingAmount,
          isOverdue
        };
      })
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/accountant/defaulters
 * Get fee defaulters
 */
router.get("/defaulters", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    const defaulters = await prisma.student.findMany({
      where: {
        user: { schoolId },
        fees: {
          some: {
            status: { in: ["OVERDUE", "PENDING", "PARTIAL"] },
            dueDate: {
              lt: new Date()
            }
          }
        }
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        fees: {
          where: {
            status: { in: ["OVERDUE", "PENDING", "PARTIAL"] }
          }
        },
        parentLinks: {
          include: {
            parent: {
              include: {
                user: {
                  select: {
                    email: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return res.json({
      status: "success",
      data: defaulters.map(student => {
        const totalPending = student.fees.reduce((sum, p) => sum + Number(p.amount), 0);
        const oldestPayment = student.fees.sort((a, b) => 
          new Date(a.dueDate) - new Date(b.dueDate)
        )[0];
        const daysOverdue = oldestPayment 
          ? Math.floor((Date.now() - new Date(oldestPayment.dueDate)) / (1000 * 60 * 60 * 24))
          : 0;

        return {
          id: student.id,
          studentName: `${student.user.firstName} ${student.user.lastName}`,
          rollNumber: student.rollNumber,
          class: `${student.grade}-${student.section}`,
          pendingAmount: totalPending,
          daysOverdue,
          parentPhone: student.parentLinks[0]?.parent?.phoneNumber || null
        };
      }).sort((a, b) => b.pendingAmount - a.pendingAmount)
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/accountant/students
 * Create a new student account
 */
router.post("/students", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const {
      firstName,
      lastName,
      email,
      username,
      temporaryPassword,
      rollNumber,
      grade,
      section,
      admissionNumber,
      dateOfBirth,
      address,
      phoneNumber,
      parentName,
      parentEmail,
      parentPhone,
      bloodGroup
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !username || !temporaryPassword || !rollNumber || !grade || !section || !admissionNumber || !dateOfBirth) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields"
      });
    }

    // Check if username exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Username already exists"
      });
    }

    // Check if roll number exists in this school
    const existingRoll = await prisma.student.findFirst({
      where: {
        rollNumber,
        user: { schoolId }
      }
    });

    if (existingRoll) {
      return res.status(400).json({
        status: "error",
        message: "Roll number already exists in this school"
      });
    }

    // Check if admission number exists
    const existingAdmission = await prisma.student.findUnique({
      where: { admissionNumber }
    });

    if (existingAdmission) {
      return res.status(400).json({
        status: "error",
        message: "Admission number already exists"
      });
    }

    // Hash password
    const bcrypt = await import("bcrypt");
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Create user and student in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email: email || null,
          username,
          password: hashedPassword,
          role: "STUDENT",
          schoolId
        }
      });

      // Create student
      const student = await tx.student.create({
        data: {
          userId: user.id,
          rollNumber,
          grade,
          section,
          admissionNumber,
          dateOfBirth: new Date(dateOfBirth),
          address: address || null,
          phoneNumber: phoneNumber || null,
          parentName: parentName || null,
          parentEmail: parentEmail || null,
          parentPhone: parentPhone || null,
          bloodGroup: bloodGroup || null
        }
      });

      return { user, student };
    });

    return res.status(201).json({
      status: "success",
      message: "Student account created successfully",
      data: {
        credentials: {
          username,
          password: temporaryPassword
        },
        student: {
          id: result.student.id,
          name: `${firstName} ${lastName}`,
          rollNumber,
          admissionNumber
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/accountant/parents
 * Create a new parent account and link to student
 */
router.post("/parents", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const {
      firstName,
      lastName,
      email,
      username,
      temporaryPassword,
      phoneNumber,
      address,
      occupation,
      studentId
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !username || !temporaryPassword || !studentId) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields"
      });
    }

    // Check if username exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Username already exists"
      });
    }

    // Verify student exists and belongs to this school
    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        user: { schoolId }
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found in your school"
      });
    }

    // Hash password
    const bcrypt = await import("bcrypt");
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Create parent user and link to student
    const result = await prisma.$transaction(async (tx) => {
      // Create parent user
      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email: email || null,
          username,
          password: hashedPassword,
          role: "PARENT",
          schoolId,
          phoneNumber: phoneNumber || null
        }
      });

      // Link parent to student
      const parentStudentLink = await tx.parentStudent.create({
        data: {
          parentUserId: user.id,
          studentId: student.id
        }
      });

      return { user, parentStudentLink };
    });

    return res.status(201).json({
      status: "success",
      message: "Parent account created and linked to student successfully",
      data: {
        credentials: {
          username,
          password: temporaryPassword
        },
        parent: {
          id: result.user.id,
          name: `${firstName} ${lastName}`,
          phoneNumber
        },
        linkedStudent: {
          name: `${student.user.firstName} ${student.user.lastName}`,
          rollNumber: student.rollNumber
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/accountant/students/:studentId/fees
 * Get detailed fee information for a student
 */
router.get("/students/:studentId/fees", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { studentId } = req.params;

    // Verify student belongs to this school
    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        user: { schoolId }
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        fees: {
          orderBy: { createdAt: "desc" }
        }
      }
    });

    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found"
      });
    }

    return res.json({
      status: "success",
      data: {
        student: {
          id: student.id,
          name: `${student.user.firstName} ${student.user.lastName}`,
          email: student.user.email,
          rollNumber: student.rollNumber,
          admissionNumber: student.admissionNumber,
          grade: student.grade,
          section: student.section
        },
        fees: student.fees.map(fee => ({
          id: fee.id,
          feeType: fee.feeType,
          amount: Number(fee.amount),
          dueDate: fee.dueDate,
          status: fee.status,
          paymentDate: fee.paymentDate,
          paymentMethod: fee.paymentMethod,
          transactionId: fee.transactionId,
          remarks: fee.remarks,
          createdAt: fee.createdAt
        }))
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/accountant/students/:studentId/fees
 * Add a fee entry for a student
 */
router.post("/students/:studentId/fees", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { studentId } = req.params;
    const { feeType, amount, dueDate, remarks } = req.body;

    // Validate required fields
    if (!feeType || !amount || !dueDate) {
      return res.status(400).json({
        status: "error",
        message: "Fee type, amount, and due date are required"
      });
    }

    // Verify student belongs to this school
    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        user: { schoolId }
      }
    });

    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found"
      });
    }

    // Create fee payment entry
    const fee = await prisma.feePayment.create({
      data: {
        studentId,
        feeType,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
        status: "PENDING",
        remarks: remarks || null
      }
    });

    return res.status(201).json({
      status: "success",
      message: "Fee added successfully",
      data: {
        id: fee.id,
        feeType: fee.feeType,
        amount: Number(fee.amount),
        dueDate: fee.dueDate,
        status: fee.status
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/accountant/fees/:feeId
 * Update fee status (mark as paid)
 */
router.patch("/fees/:feeId", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { feeId } = req.params;
    const { status, paymentDate, paymentMethod, transactionId, remarks } = req.body;

    // Verify fee belongs to a student in this school
    const fee = await prisma.feePayment.findFirst({
      where: {
        id: feeId,
        student: {
          user: { schoolId }
        }
      }
    });

    if (!fee) {
      return res.status(404).json({
        status: "error",
        message: "Fee record not found"
      });
    }

    // Update fee
    const updatedFee = await prisma.feePayment.update({
      where: { id: feeId },
      data: {
        status: status || fee.status,
        paymentDate: paymentDate ? new Date(paymentDate) : fee.paymentDate,
        paymentMethod: paymentMethod || fee.paymentMethod,
        transactionId: transactionId || fee.transactionId,
        remarks: remarks !== undefined ? remarks : fee.remarks
      }
    });

    return res.json({
      status: "success",
      message: "Fee updated successfully",
      data: {
        id: updatedFee.id,
        status: updatedFee.status,
        paymentDate: updatedFee.paymentDate,
        paymentMethod: updatedFee.paymentMethod,
        transactionId: updatedFee.transactionId
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/accountant/fees/:feeId/invoice
 * Get invoice data for a paid fee
 */
router.get("/fees/:feeId/invoice", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { feeId } = req.params;

    // Get fee with student and school details
    const fee = await prisma.feePayment.findFirst({
      where: {
        id: feeId,
        student: {
          user: { schoolId }
        }
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                school: {
                  select: {
                    name: true,
                    code: true,
                    address: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!fee) {
      return res.status(404).json({
        status: "error",
        message: "Fee record not found"
      });
    }

    return res.json({
      status: "success",
      data: {
        invoice: {
          invoiceNumber: `INV-${fee.id.slice(0, 8).toUpperCase()}`,
          invoiceDate: fee.paymentDate || fee.createdAt,
          dueDate: fee.dueDate,
          status: fee.status
        },
        school: {
          name: fee.student.user.school.name,
          code: fee.student.user.school.code,
          address: fee.student.user.school.address
        },
        student: {
          name: `${fee.student.user.firstName} ${fee.student.user.lastName}`,
          rollNumber: fee.student.rollNumber,
          admissionNumber: fee.student.admissionNumber,
          grade: fee.student.grade,
          section: fee.student.section,
          email: fee.student.user.email
        },
        payment: {
          feeType: fee.feeType,
          amount: Number(fee.amount),
          paymentDate: fee.paymentDate,
          paymentMethod: fee.paymentMethod,
          transactionId: fee.transactionId,
          remarks: fee.remarks
        }
      }
    });
  } catch (error) {
    next(error);
  }
});


/**
 * GET /api/accountant/employees
 * Get all employees (teachers and staff) with salary information
 */
router.get("/employees", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    // Get all teachers
    const teachers = await prisma.teacher.findMany({
      where: {
        user: { schoolId }
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            createdAt: true
          }
        }
      }
    });

    // Get all staff (users with STAFF role or other staff roles)
    const staff = await prisma.user.findMany({
      where: {
        schoolId,
        role: { in: ["STAFF", "DRIVER", "ACCOUNTANT", "MANAGEMENT"] }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true
      }
    });

    // Combine and format employee data
    const employees = [
      ...teachers.map(teacher => ({
        id: teacher.user.id,
        name: `${teacher.user.firstName} ${teacher.user.lastName}`,
        email: teacher.user.email,
        phoneNumber: teacher.user.phoneNumber,
        role: "TEACHER",
        employeeType: "Teaching Staff",
        department: teacher.department || "Academic",
        joiningDate: teacher.joiningDate || teacher.user.createdAt,
        salary: teacher.salary ? Number(teacher.salary) : null,
        status: "ACTIVE"
      })),
      ...staff.map(user => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        employeeType: user.role === "DRIVER" ? "Support Staff" : 
                     user.role === "ACCOUNTANT" ? "Administrative" :
                     user.role === "MANAGEMENT" ? "Management" : "Staff",
        department: user.role === "DRIVER" ? "Transport" :
                   user.role === "ACCOUNTANT" ? "Accounts" :
                   user.role === "MANAGEMENT" ? "Administration" : "General",
        joiningDate: user.createdAt,
        salary: null,
        status: "ACTIVE"
      }))
    ];

    return res.json({
      status: "success",
      data: employees.sort((a, b) => a.name.localeCompare(b.name))
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/accountant/salary-records
 * Get salary records for employees
 */
router.get("/salary-records", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    // Get teachers with salary info
    const teachers = await prisma.teacher.findMany({
      where: {
        user: { schoolId }
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    const records = teachers.map(teacher => ({
      id: teacher.id,
      employeeId: teacher.user.id,
      employeeName: `${teacher.user.firstName} ${teacher.user.lastName}`,
      role: "TEACHER",
      department: teacher.department || "Academic",
      monthlySalary: teacher.salary ? Number(teacher.salary) : 0,
      status: "ACTIVE"
    }));

    return res.json({
      status: "success",
      data: records
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/accountant/students/:id
 * Get single student details with full profile
 */
router.get("/students/:id", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;

    const student = await prisma.student.findFirst({
      where: {
        id,
        user: { schoolId }
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            username: true,
            createdAt: true
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found"
      });
    }

    return res.json({
      status: "success",
      ...student
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/accountant/students/:id
 * Update student profile (not credentials)
 */
router.patch("/students/:id", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      bloodGroup,
      parentName,
      parentEmail,
      parentPhone
    } = req.body;

    // Verify student belongs to this school
    const student = await prisma.student.findFirst({
      where: {
        id,
        user: { schoolId }
      },
      include: {
        user: true
      }
    });

    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found"
      });
    }

    // Update in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update user info
      if (firstName || lastName || email) {
        await tx.user.update({
          where: { id: student.userId },
          data: {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email })
          }
        });
      }

      // Update student info
      const updatedStudent = await tx.student.update({
        where: { id },
        data: {
          ...(phoneNumber !== undefined && { phoneNumber }),
          ...(address !== undefined && { address }),
          ...(bloodGroup !== undefined && { bloodGroup }),
          ...(parentName !== undefined && { parentName }),
          ...(parentEmail !== undefined && { parentEmail }),
          ...(parentPhone !== undefined && { parentPhone })
        }
      });

      return updatedStudent;
    });

    return res.json({
      status: "success",
      message: "Student profile updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/accountant/parents
 * Get all parents with their children
 */
router.get("/parents", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    // Get all users with PARENT role
    const parentUsers = await prisma.user.findMany({
      where: {
        schoolId,
        role: "PARENT"
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phoneNumber: true,
        createdAt: true
      }
    });

    // Get parent-student links
    const parentLinks = await prisma.parentStudent.findMany({
      where: {
        parentUserId: { in: parentUsers.map(p => p.id) }
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    // Map parents to their children
    const formattedParents = parentUsers.map(parent => {
      const links = parentLinks.filter(link => link.parentUserId === parent.id);
      return {
        id: parent.id,
        name: `${parent.firstName} ${parent.lastName}`,
        email: parent.email,
        phoneNumber: parent.phoneNumber,
        children: links.map(link => ({
          firstName: link.student.user.firstName,
          lastName: link.student.user.lastName,
          grade: link.student.grade,
          section: link.student.section,
          rollNumber: link.student.rollNumber,
          admissionNumber: link.student.admissionNumber
        }))
      };
    });

    return res.json({
      status: "success",
      data: formattedParents
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/accountant/parents/:id
 * Get single parent details with children
 */
router.get("/parents/:id", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;

    // Get parent user
    const parent = await prisma.user.findFirst({
      where: {
        id,
        schoolId,
        role: "PARENT"
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phoneNumber: true,
        createdAt: true
      }
    });

    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "Parent not found"
      });
    }

    // Get parent-student links
    const parentLinks = await prisma.parentStudent.findMany({
      where: {
        parentUserId: id
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    const formattedParent = {
      id: parent.id,
      user: parent,
      phoneNumber: parent.phoneNumber,
      children: parentLinks.map(link => ({
        firstName: link.student.user.firstName,
        lastName: link.student.user.lastName,
        grade: link.student.grade,
        section: link.student.section,
        rollNumber: link.student.rollNumber,
        admissionNumber: link.student.admissionNumber
      }))
    };

    return res.json({
      status: "success",
      ...formattedParent
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/accountant/parents/:id
 * Update parent profile (not credentials)
 */
router.patch("/parents/:id", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phoneNumber
    } = req.body;

    // Verify parent belongs to this school
    const parent = await prisma.user.findFirst({
      where: {
        id,
        schoolId,
        role: "PARENT"
      }
    });

    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "Parent not found"
      });
    }

    // Update user info
    const updatedParent = await prisma.user.update({
      where: { id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email }),
        ...(phoneNumber !== undefined && { phoneNumber })
      }
    });

    return res.json({
      status: "success",
      message: "Parent profile updated successfully",
      data: updatedParent
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/accountant/staff/:id
 * Get single staff member details
 */
router.get("/staff/:id", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;

    // Try to find as teacher first
    let staffMember = await prisma.teacher.findFirst({
      where: {
        userId: id,
        user: { schoolId }
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            username: true,
            role: true,
            createdAt: true
          }
        }
      }
    });

    if (staffMember) {
      return res.json({
        status: "success",
        id: staffMember.user.id,
        user: staffMember.user,
        role: "TEACHER",
        department: staffMember.department,
        salary: staffMember.salary ? Number(staffMember.salary) : null,
        joiningDate: staffMember.joiningDate || staffMember.user.createdAt,
        phoneNumber: staffMember.user.phoneNumber,
        status: "ACTIVE"
      });
    }

    // Otherwise find as general user (staff, driver, etc.)
    const user = await prisma.user.findFirst({
      where: {
        id,
        schoolId,
        role: { in: ["STAFF", "DRIVER", "ACCOUNTANT", "MANAGEMENT"] }
      }
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Staff member not found"
      });
    }

    return res.json({
      status: "success",
      id: user.id,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt
      },
      role: user.role,
      department: user.role === "DRIVER" ? "Transport" :
                 user.role === "ACCOUNTANT" ? "Accounts" :
                 user.role === "MANAGEMENT" ? "Administration" : "General",
      salary: null,
      joiningDate: user.createdAt,
      phoneNumber: user.phoneNumber,
      status: "ACTIVE"
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/accountant/staff/:id
 * Update staff profile (not credentials)
 */
router.patch("/staff/:id", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      department,
      salary
    } = req.body;

    // Check if teacher
    const teacher = await prisma.teacher.findFirst({
      where: {
        userId: id,
        user: { schoolId }
      }
    });

    if (teacher) {
      // Update teacher
      const result = await prisma.$transaction(async (tx) => {
        // Update user
        if (firstName || lastName || email || phoneNumber) {
          await tx.user.update({
            where: { id },
            data: {
              ...(firstName && { firstName }),
              ...(lastName && { lastName }),
              ...(email && { email }),
              ...(phoneNumber !== undefined && { phoneNumber })
            }
          });
        }

        // Update teacher
        const updatedTeacher = await tx.teacher.update({
          where: { id: teacher.id },
          data: {
            ...(department !== undefined && { department }),
            ...(salary !== undefined && { salary: parseFloat(salary) || null })
          }
        });

        return updatedTeacher;
      });

      return res.json({
        status: "success",
        message: "Staff profile updated successfully",
        data: result
      });
    }

    // Otherwise update as regular user
    const user = await prisma.user.findFirst({
      where: {
        id,
        schoolId,
        role: { in: ["STAFF", "DRIVER", "ACCOUNTANT", "MANAGEMENT"] }
      }
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Staff member not found"
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email }),
        ...(phoneNumber !== undefined && { phoneNumber })
      }
    });

    return res.json({
      status: "success",
      message: "Staff profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
});

export default router;
