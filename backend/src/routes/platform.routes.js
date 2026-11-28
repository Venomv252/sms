import { Router } from "express";
import bcrypt from "bcrypt";
import { randomBytes, randomInt } from "node:crypto";
import prisma from "../config/prisma.js";
import { auth, allowRoles } from "../middleware/auth.js";
import config from "../config/config.js";

const router = Router();
router.use(auth);

// ============================================================
// SUPER ADMIN: DASHBOARD STATS (OPTIMIZED)
// ============================================================

router.get(
  "/superadmin/dashboard/stats",
  allowRoles("SUPER_ADMIN"),
  async (req, res, next) => {
    try {
      // Run all counts in parallel for performance
      const [
        totalSchools,
        totalDirectors,
        totalStudents,
        totalTeachers,
        topSchools,
        recentSchools,
      ] = await Promise.all([
        // Total schools count
        prisma.school.count(),

        // Total directors count
        prisma.user.count({
          where: { role: "DIRECTOR" },
        }),

        // Total students across all schools
        prisma.student.count(),

        // Total teachers across all schools
        prisma.user.count({
          where: { role: "TEACHER" },
        }),

        // Top 3 schools by user count
        prisma.school.findMany({
          take: 3,
          select: {
            id: true,
            name: true,
            code: true,
            _count: {
              select: {
                users: true,
              },
            },
          },
          orderBy: {
            users: {
              _count: "desc",
            },
          },
        }),

        // 2 most recently created schools
        prisma.school.findMany({
          take: 2,
          select: {
            id: true,
            name: true,
            code: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

      // Get revenue stats only if there are payments (skip if zero)
      let revenue = {
        total: 0,
        collected: 0,
        pending: 0,
        overdue: 0,
      };

      const paymentCount = await prisma.feePayment.count();

      if (paymentCount > 0) {
        // Only fetch revenue if there are payments
        const [paidRev, pendingRev, overdueRev] = await Promise.all([
          prisma.feePayment.aggregate({
            _sum: { amount: true },
            where: { status: "PAID" },
          }),
          prisma.feePayment.aggregate({
            _sum: { amount: true },
            where: { status: { in: ["PENDING", "PARTIAL"] } },
          }),
          prisma.feePayment.aggregate({
            _sum: { amount: true },
            where: { status: "OVERDUE" },
          }),
        ]);

        revenue = {
          total: Number(paidRev._sum.amount || 0) + Number(pendingRev._sum.amount || 0) + Number(overdueRev._sum.amount || 0),
          collected: Number(paidRev._sum.amount || 0),
          pending: Number(pendingRev._sum.amount || 0),
          overdue: Number(overdueRev._sum.amount || 0),
        };
      }

      res.json({
        data: {
          overview: {
            totalSchools,
            totalDirectors,
            totalStudents,
            totalTeachers,
            totalUsers: totalStudents + totalTeachers + totalDirectors, // Calculate instead of querying
            totalPayments: paymentCount,
          },
          revenue,
          topSchools: topSchools.map((school) => ({
            id: school.id,
            name: school.name,
            code: school.code,
            userCount: school._count.users,
          })),
          recentSchools: recentSchools.map((school) => ({
            id: school.id,
            name: school.name,
            code: school.code,
            createdAt: school.createdAt,
          })),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: DASHBOARD STATS (OPTIMIZED)
// ============================================================

router.get(
  "/director/dashboard/stats",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const directorId = req.user.id;

      // Get assigned schools count
      const assignedSchools = await prisma.directorSchool.count({
        where: { directorId },
      });

      if (assignedSchools === 0) {
        return res.json({
          data: {
            overview: {
              totalSchools: 0,
              totalStudents: 0,
              totalTeachers: 0,
              totalStaff: 0,
              totalUsers: 0,
            },
            schools: [],
          },
        });
      }

      // Get school IDs for this director
      const schoolLinks = await prisma.directorSchool.findMany({
        where: { directorId },
        select: { schoolId: true },
      });

      const schoolIds = schoolLinks.map((link) => link.schoolId);

      // Run counts in parallel
      const [totalStudents, totalTeachers, totalPrincipals, totalUsers, schools] =
        await Promise.all([
          // Total students in assigned schools
          prisma.student.count({
            where: {
              user: {
                schoolId: { in: schoolIds },
              },
            },
          }),

          // Total teachers in assigned schools
          prisma.user.count({
            where: {
              schoolId: { in: schoolIds },
              role: "TEACHER",
            },
          }),

          // Total principals in assigned schools
          prisma.user.count({
            where: {
              schoolId: { in: schoolIds },
              role: "PRINCIPAL",
            },
          }),

          // Total users in assigned schools
          prisma.user.count({
            where: {
              schoolId: { in: schoolIds },
            },
          }),

          // Basic school info with counts
          prisma.school.findMany({
            where: {
              id: { in: schoolIds },
            },
            select: {
              id: true,
              name: true,
              code: true,
              address: true,
              createdAt: true,
              _count: {
                select: {
                  users: true,
                },
              },
            },
            orderBy: {
              name: "asc",
            },
          }),
        ]);

      // Get student counts per school
      const schoolsWithCounts = await Promise.all(
        schools.map(async (school) => {
          const [studentCount, teacherCount, staffCount, activeNotices] = await Promise.all([
            // Student count
            prisma.student.count({
              where: {
                user: {
                  schoolId: school.id,
                },
              },
            }),
            // Teacher count
            prisma.user.count({
              where: {
                schoolId: school.id,
                role: "TEACHER",
              },
            }),
            // Staff count (all non-student roles)
            prisma.user.count({
              where: {
                schoolId: school.id,
                role: { in: ["TEACHER", "PRINCIPAL", "MANAGEMENT", "ACCOUNTANT", "DRIVER"] },
              },
            }),
            // Active notices
            prisma.notice.count({
              where: {
                schoolId: school.id,
                isActive: true,
              },
            }),
          ]);

          return {
            id: school.id,
            name: school.name,
            code: school.code,
            address: school.address,
            createdAt: school.createdAt,
            userCount: school._count.users,
            studentCount,
            students: studentCount, // Alias for consistency
            staff: staffCount,
            staffCount, // Alias for consistency
            teachers: teacherCount,
            activeNotices,
            attendanceRate: null, // Set to null, can be calculated later if needed
          };
        })
      );

      const totalStaff = totalTeachers + totalPrincipals;

      res.json({
        data: {
          overview: {
            totalSchools: assignedSchools,
            totalStudents,
            totalTeachers,
            totalStaff,
            totalUsers,
          },
          schools: schoolsWithCounts,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Permanently removes a school's tenant-owned data.
 *
 * All operations run inside the caller's Prisma transaction.
 * Cross-school relationships are checked before deletion to prevent
 * accidentally deleting another school's records.
 */
async function deleteSchoolAndData(tx, schoolId) {
  const school = await tx.school.findUnique({
    where: { id: schoolId },
    select: { id: true, name: true },
  });

  if (!school) {
    const error = new Error("School not found");
    error.statusCode = 404;
    throw error;
  }

  const users = await tx.user.findMany({
    where: { schoolId },
    select: { id: true },
  });

  const userIds = users.map(({ id }) => id);

  const teachers = userIds.length
    ? await tx.teacher.findMany({
      where: { userId: { in: userIds } },
      select: { id: true },
    })
    : [];

  const teacherIds = teachers.map(({ id }) => id);

  const students = userIds.length
    ? await tx.student.findMany({
      where: { userId: { in: userIds } },
      select: { id: true },
    })
    : [];

  const studentIds = students.map(({ id }) => id);

  const subjects = teacherIds.length
    ? await tx.subject.findMany({
      where: { teacherId: { in: teacherIds } },
      select: { id: true },
    })
    : [];

  const subjectIds = subjects.map(({ id }) => id);

  const classes =
    teacherIds.length || subjectIds.length
      ? await tx.class.findMany({
        where: {
          OR: [
            ...(teacherIds.length
              ? [{ teacherId: { in: teacherIds } }]
              : []),
            ...(subjectIds.length
              ? [{ subjectId: { in: subjectIds } }]
              : []),
          ],
        },
        select: {
          id: true,
          teacherId: true,
          subjectId: true,
        },
      })
      : [];

  const classIds = classes.map(({ id }) => id);

  // Prevent deleting classes linked to another school's teacher or subject.
  const hasCrossSchoolClassLink = classes.some(
    (item) =>
      !teacherIds.includes(item.teacherId) ||
      !subjectIds.includes(item.subjectId)
  );

  if (hasCrossSchoolClassLink) {
    const error = new Error(
      "This school has class records linked to another school's teacher or subject. Correct those cross-school links before deleting the school."
    );
    error.statusCode = 409;
    throw error;
  }

  const homeworks =
    classIds.length || subjectIds.length
      ? await tx.homework.findMany({
        where: {
          OR: [
            ...(classIds.length
              ? [{ classId: { in: classIds } }]
              : []),
            ...(subjectIds.length
              ? [{ subjectId: { in: subjectIds } }]
              : []),
          ],
        },
        select: { id: true },
      })
      : [];

  const homeworkIds = homeworks.map(({ id }) => id);

  // Protect results belonging to students in other schools.
  if (subjectIds.length) {
    const foreignResult = await tx.result.findFirst({
      where: {
        subjectId: { in: subjectIds },
        student: {
          user: {
            schoolId: { not: schoolId },
          },
        },
      },
      select: { id: true },
    });

    if (foreignResult) {
      const error = new Error(
        "This school has subject results belonging to students in another school. Resolve those cross-school links before deletion."
      );
      error.statusCode = 409;
      throw error;
    }
  }

  // Protect homework submissions belonging to students in other schools.
  if (homeworkIds.length) {
    const foreignSubmission = await tx.homeworkSubmission.findFirst({
      where: {
        homeworkId: { in: homeworkIds },
        student: {
          user: {
            schoolId: { not: schoolId },
          },
        },
      },
      select: { id: true },
    });

    if (foreignSubmission) {
      const error = new Error(
        "This school has homework submissions belonging to students in another school. Resolve those cross-school links before deletion."
      );
      error.statusCode = 409;
      throw error;
    }
  }

  // Remove homework and results before deleting their related records.
  const resultConditions = [
    ...(studentIds.length
      ? [{ studentId: { in: studentIds } }]
      : []),
    ...(subjectIds.length
      ? [{ subjectId: { in: subjectIds } }]
      : []),
  ];

  const [deletedHomework, deletedResults] = await Promise.all([
    homeworkIds.length
      ? tx.homework.deleteMany({
        where: { id: { in: homeworkIds } },
      })
      : Promise.resolve({ count: 0 }),

    resultConditions.length
      ? tx.result.deleteMany({
        where: { OR: resultConditions },
      })
      : Promise.resolve({ count: 0 }),
  ]);

  // Class deletion cascades attendance and timetable rows.
  const deletedClasses = classIds.length
    ? await tx.class.deleteMany({
      where: { id: { in: classIds } },
    })
    : { count: 0 };

  // Delete subjects before teachers because Subject references Teacher.
  const deletedSubjects = subjectIds.length
    ? await tx.subject.deleteMany({
      where: { id: { in: subjectIds } },
    })
    : { count: 0 };

  const deletedTeachers = teacherIds.length
    ? await tx.teacher.deleteMany({
      where: { id: { in: teacherIds } },
    })
    : { count: 0 };

  // User deletion cascades student/profile data, parent links, notes,
  // doubts/comments, leave requests and other user-owned records.
  const deletedUsers = userIds.length
    ? await tx.user.deleteMany({
      where: { id: { in: userIds } },
    })
    : { count: 0 };

  // School deletion cascades notices and DirectorSchool assignments.
  await tx.school.delete({
    where: { id: schoolId },
  });

  return {
    schoolId,
    deleted: {
      users: deletedUsers.count,
      teachers: deletedTeachers.count,
      students: studentIds.length,
      subjects: deletedSubjects.count,
      classes: deletedClasses.count,
      homework: deletedHomework.count,
      results: deletedResults.count,
    },
  };
}

// ============================================================
// SUPER ADMIN: SCHOOLS
// ============================================================

router.get("/schools", allowRoles("SUPER_ADMIN"), async (req, res, next) => {
  try {
    const schools = await prisma.school.findMany({
      include: {
        directorLinks: {
          include: {
            director: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: { users: true },
        },
      },
      orderBy: { name: "asc" },
    });

    // Aggregate fee records only; no student-level records are returned.
    const payments = await prisma.feePayment.findMany({
      select: {
        amount: true,
        status: true,
        student: {
          select: {
            user: {
              select: { schoolId: true },
            },
          },
        },
      },
    });

    const revenueBySchool = new Map();

    for (const payment of payments) {
      const schoolId = payment.student?.user?.schoolId;
      if (!schoolId) continue;

      const current = revenueBySchool.get(schoolId) || {
        collected: 0,
        pending: 0,
        overdue: 0,
      };

      const amount = Number(payment.amount || 0);

      if (payment.status === "PAID") current.collected += amount;

      if (
        payment.status === "PENDING" ||
        payment.status === "PARTIAL"
      ) {
        current.pending += amount;
      }

      if (payment.status === "OVERDUE") {
        current.overdue += amount;
      }

      revenueBySchool.set(schoolId, current);
    }

    const data = await Promise.all(
      schools.map(async (school) => {
        const [students, paymentCount] = await Promise.all([
          prisma.student.count({
            where: {
              user: { schoolId: school.id },
            },
          }),

          prisma.feePayment.count({
            where: {
              student: {
                user: { schoolId: school.id },
              },
            },
          }),
        ]);

        const revenue = revenueBySchool.get(school.id) || {
          collected: 0,
          pending: 0,
          overdue: 0,
        };

        return {
          id: school.id,
          name: school.name,
          code: school.code,
          address: school.address,
          createdAt: school.createdAt,
          userCount: school._count.users,
          studentCount: students,
          paymentCount,
          revenue,
          directors: school.directorLinks.map(
            ({ director }) => director
          ),
        };
      })
    );

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// SUPER ADMIN: DIRECTORS
// ============================================================

router.get("/directors", allowRoles("SUPER_ADMIN"), async (req, res, next) => {
  try {
    const directors = await prisma.user.findMany({
      where: { role: "DIRECTOR" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        createdAt: true,
        ownedSchools: {
          include: {
            school: {
              select: {
                id: true,
                name: true,
                code: true,
                address: true,
                createdAt: true,
              },
            },
          },
        },
      },
      orderBy: [
        { firstName: "asc" },
        { lastName: "asc" },
      ],
    });

    res.json({ data: directors });
  } catch (error) {
    next(error);
  }
});

router.post("/directors", allowRoles("SUPER_ADMIN"), async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      schoolIds = [],
      username,
      temporaryPassword,
    } = req.body ?? {};

    if (
      ![email, firstName, lastName, username, temporaryPassword].every(
        (v) => typeof v === "string" && v.trim()
      )
    ) {
      return res.status(400).json({
        message:
          "First name, last name, email, username, and temporary password are required",
      });
    }

    if (temporaryPassword.length < 8 || temporaryPassword.length > 72) {
      return res.status(400).json({
        message: "Password must be between 8 and 72 characters",
      });
    }

    if (
      !Array.isArray(schoolIds) ||
      schoolIds.some((id) => typeof id !== "string")
    ) {
      return res.status(400).json({
        message: "schoolIds must be an array of school IDs",
      });
    }

    if (schoolIds.length === 0) {
      return res.status(400).json({
        message: "Assign at least one school to this Director",
      });
    }

    const uniqueSchoolIds = [...new Set(schoolIds)];
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: normalizedUsername }
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const tempPassword = temporaryPassword.trim();

    const director = await prisma.$transaction(async (tx) => {
      if (uniqueSchoolIds.length) {
        const count = await tx.school.count({
          where: {
            id: { in: uniqueSchoolIds },
          },
        });

        if (count !== uniqueSchoolIds.length) {
          const error = new Error(
            "One or more selected schools no longer exist. Refresh and try again."
          );
          error.statusCode = 400;
          throw error;
        }
      }

      const created = await tx.user.create({
        data: {
          email: normalizedEmail,
          username: normalizedUsername,
          password: await bcrypt.hash(
            tempPassword,
            config.bcrypt.saltRounds
          ),
          role: "DIRECTOR",
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        },
      });

      if (uniqueSchoolIds.length) {
        await tx.directorSchool.createMany({
          data: uniqueSchoolIds.map((schoolId) => ({
            directorId: created.id,
            schoolId,
          })),
        });
      }

      return created;
    });

    res.status(201).json({
      data: {
        director,
        credentials: {
          username: normalizedUsername,
          password: tempPassword,
          message: "⚠️ Store these credentials securely. The password will not be shown again."
        }
      }
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Email or username already exists",
      });
    }

    next(error);
  }
});

// ============================================================
// SUPER ADMIN: CREATE SCHOOL
// ============================================================

router.post("/schools", allowRoles("SUPER_ADMIN"), async (req, res, next) => {
  try {
    const { name, code, address = "" } = req.body ?? {};

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        message: "School name is required",
      });
    }

    if (
      typeof code !== "string" ||
      !/^[A-Za-z0-9_-]{3,24}$/.test(code.trim())
    ) {
      return res.status(400).json({
        message:
          "School code must be 3–24 characters (letters, numbers, _ or -)",
      });
    }

    if (typeof address !== "string") {
      return res.status(400).json({
        message: "Address must be a string",
      });
    }

    const school = await prisma.school.create({
      data: {
        name: name.trim(),
        code: code.trim().toUpperCase(),
        address: address.trim() || null,
      },
    });

    res.status(201).json({ data: school });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "A school with this code already exists",
      });
    }

    next(error);
  }
});

// ============================================================
// SUPER ADMIN: UPDATE SCHOOL
// ============================================================

router.patch(
  "/schools/:schoolId",
  allowRoles("SUPER_ADMIN"),
  async (req, res, next) => {
    try {
      const { name, code, address } = req.body ?? {};
      const data = {};

      if (typeof name === "string") {
        if (!name.trim()) {
          return res.status(400).json({
            message: "School name cannot be empty",
          });
        }

        data.name = name.trim();
      }

      if (typeof code === "string") {
        const value = code.trim().toUpperCase();

        if (!/^[A-Z0-9_-]{3,24}$/.test(value)) {
          return res.status(400).json({
            message: "Invalid school code",
          });
        }

        data.code = value;
      }

      if (typeof address === "string" || address === null) {
        data.address =
          typeof address === "string"
            ? address.trim() || null
            : null;
      }

      if (!Object.keys(data).length) {
        return res.status(400).json({
          message: "No valid school fields supplied",
        });
      }

      res.json({
        data: await prisma.school.update({
          where: { id: req.params.schoolId },
          data,
        }),
      });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "School code already exists",
        });
      }

      if (error.code === "P2025") {
        return res.status(404).json({
          message: "School not found",
        });
      }

      next(error);
    }
  }
);

// ============================================================
// SUPER ADMIN: DELETE SCHOOL AND ITS DATA
// ============================================================

router.delete(
  "/schools/:schoolId",
  allowRoles("SUPER_ADMIN"),
  async (req, res, next) => {
    try {
      const summary = await prisma.$transaction(
        (tx) => deleteSchoolAndData(tx, req.params.schoolId),
        { timeout: 30000 }
      );

      res.json({
        message:
          "School and all school-owned records deleted successfully",
        data: summary,
      });
    } catch (error) {
      if (
        error.statusCode === 404 ||
        error.statusCode === 409
      ) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }

      next(error);
    }
  }
);

// ============================================================
// SUPER ADMIN: UPDATE DIRECTOR
// ============================================================

router.patch(
  "/directors/:directorId",
  allowRoles("SUPER_ADMIN"),
  async (req, res, next) => {
    try {
      const existing = await prisma.user.findFirst({
        where: {
          id: req.params.directorId,
          role: "DIRECTOR",
        },
        select: { id: true },
      });

      if (!existing) {
        return res.status(404).json({
          message: "Director not found",
        });
      }

      const {
        firstName,
        lastName,
        username,
        email,
        schoolIds,
      } = req.body ?? {};

      const data = {};

      if (typeof firstName === "string") {
        if (!firstName.trim()) {
          return res.status(400).json({
            message: "First name cannot be empty",
          });
        }

        data.firstName = firstName.trim();
      }

      if (typeof lastName === "string") {
        if (!lastName.trim()) {
          return res.status(400).json({
            message: "Last name cannot be empty",
          });
        }

        data.lastName = lastName.trim();
      }

      if (typeof username === "string") {
        const value = username.trim().toLowerCase();

        if (!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(value)) {
          return res.status(400).json({
            message: "Invalid username",
          });
        }

        data.username = value;
      }

      if (typeof email === "string") {
        const value = email.trim().toLowerCase();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return res.status(400).json({
            message: "Invalid email",
          });
        }

        data.email = value;
      }

      if (
        schoolIds !== undefined &&
        (!Array.isArray(schoolIds) ||
          schoolIds.some((id) => typeof id !== "string"))
      ) {
        return res.status(400).json({
          message: "schoolIds must be an array of school IDs",
        });
      }

      if (!Object.keys(data).length && schoolIds === undefined) {
        return res.status(400).json({
          message: "No changes supplied",
        });
      }

      const director = await prisma.$transaction(async (tx) => {
        if (Object.keys(data).length) {
          await tx.user.update({
            where: { id: existing.id },
            data,
          });
        }

        if (schoolIds !== undefined) {
          const uniqueSchoolIds = [...new Set(schoolIds)];

          if (uniqueSchoolIds.length) {
            const count = await tx.school.count({
              where: {
                id: { in: uniqueSchoolIds },
              },
            });

            if (count !== uniqueSchoolIds.length) {
              const error = new Error(
                "One or more selected schools no longer exist. Refresh and try again."
              );
              error.statusCode = 400;
              throw error;
            }
          }

          await tx.directorSchool.deleteMany({
            where: { directorId: existing.id },
          });

          if (uniqueSchoolIds.length) {
            await tx.directorSchool.createMany({
              data: uniqueSchoolIds.map((schoolId) => ({
                directorId: existing.id,
                schoolId,
              })),
            });
          }
        }

        return tx.user.findUnique({
          where: { id: existing.id },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
            role: true,
          },
        });
      });

      res.json({ data: director });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Email or username already exists",
        });
      }

      next(error);
    }
  }
);

// ============================================================
// SUPER ADMIN: DELETE DIRECTOR
// ============================================================

router.delete(
  "/directors/:directorId",
  allowRoles("SUPER_ADMIN"),
  async (req, res, next) => {
    try {
      const director = await prisma.user.findFirst({
        where: {
          id: req.params.directorId,
          role: "DIRECTOR",
        },
        select: { id: true },
      });

      if (!director) {
        return res.status(404).json({
          message: "Director not found",
        });
      }

      await prisma.user.delete({
        where: { id: director.id },
      });

      res.json({
        message:
          "Director deleted and school assignments removed",
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: GET ASSIGNED SCHOOLS
// ============================================================

router.get(
  "/director/schools",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const schools = await prisma.school.findMany({
        where: {
          directorLinks: {
            some: { directorId: req.user.id },
          },
        },
        include: {
          _count: {
            select: {
              users: true,
              notices: true,
            },
          },
        },
        orderBy: { name: "asc" },
      });

      res.json({ data: schools });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: CREATE SCHOOL
// ============================================================

router.post(
  "/director/schools",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { name, code, address } = req.body ?? {};

      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          message: "School name is required",
        });
      }

      if (
        typeof code !== "string" ||
        !/^[A-Z0-9_-]{3,24}$/.test(code.trim().toUpperCase())
      ) {
        return res.status(400).json({
          message:
            "School code must be 3–24 letters, numbers, hyphens or underscores",
        });
      }

      const school = await prisma.$transaction(async (tx) => {
        const created = await tx.school.create({
          data: {
            name: name.trim(),
            code: code.trim().toUpperCase(),
            address:
              typeof address === "string" && address.trim()
                ? address.trim()
                : null,
          },
        });

        await tx.directorSchool.create({
          data: {
            directorId: req.user.id,
            schoolId: created.id,
          },
        });

        return created;
      });

      res.status(201).json({ data: school });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "A school with this code already exists",
        });
      }

      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: UPDATE ASSIGNED SCHOOL
// ============================================================

router.patch(
  "/director/schools/:schoolId",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const link = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId: req.params.schoolId,
          },
        },
      });

      if (!link) {
        return res.status(404).json({
          message: "School not found in your portfolio",
        });
      }

      const { name, code, address } = req.body ?? {};
      const data = {};

      if (typeof name === "string") {
        if (!name.trim()) {
          return res.status(400).json({
            message: "School name cannot be empty",
          });
        }

        data.name = name.trim();
      }

      if (typeof code === "string") {
        const value = code.trim().toUpperCase();

        if (!/^[A-Z0-9_-]{3,24}$/.test(value)) {
          return res.status(400).json({
            message: "Invalid school code",
          });
        }

        data.code = value;
      }

      if (typeof address === "string" || address === null) {
        data.address =
          typeof address === "string"
            ? address.trim() || null
            : null;
      }

      if (!Object.keys(data).length) {
        return res.status(400).json({
          message: "No valid school fields supplied",
        });
      }

      res.json({
        data: await prisma.school.update({
          where: { id: req.params.schoolId },
          data,
        }),
      });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "School code already exists",
        });
      }

      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: DELETE ASSIGNED SCHOOL
// ============================================================

router.delete(
  "/director/schools/:schoolId",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const summary = await prisma.$transaction(
        async (tx) => {
          const assignment = await tx.directorSchool.findUnique({
            where: {
              directorId_schoolId: {
                directorId: req.user.id,
                schoolId: req.params.schoolId,
              },
            },
            select: { schoolId: true },
          });

          if (!assignment) {
            const error = new Error(
              "School not found in your portfolio"
            );
            error.statusCode = 404;
            throw error;
          }

          return deleteSchoolAndData(tx, assignment.schoolId);
        },
        { timeout: 30000 }
      );

      res.json({
        message:
          "School and all school-owned records deleted successfully",
        data: summary,
      });
    } catch (error) {
      if (
        error.statusCode === 404 ||
        error.statusCode === 409
      ) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }

      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: OVERVIEW
// ============================================================

router.get(
  "/director/overview",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const links = await prisma.directorSchool.findMany({
        where: { directorId: req.user.id },
        include: {
          school: {
            select: {
              id: true,
              name: true,
              code: true,
              address: true,
              createdAt: true,
            },
          },
        },
      });

      const schools = await Promise.all(
        links.map(async ({ school }) => {
          const schoolUser = { schoolId: school.id };

          const [
            users,
            students,
            teachers,
            principals,
            management,
            accountants,
            drivers,
            activeNotices,
            attendanceTotal,
            attendancePresent,
          ] = await Promise.all([
            prisma.user.count({
              where: schoolUser,
            }),

            prisma.student.count({
              where: { user: schoolUser },
            }),

            prisma.user.count({
              where: {
                ...schoolUser,
                role: "TEACHER",
              },
            }),

            prisma.user.count({
              where: {
                ...schoolUser,
                role: "PRINCIPAL",
              },
            }),

            prisma.user.count({
              where: {
                ...schoolUser,
                role: "MANAGEMENT",
              },
            }),

            prisma.user.count({
              where: {
                ...schoolUser,
                role: "ACCOUNTANT",
              },
            }),

            prisma.user.count({
              where: {
                ...schoolUser,
                role: "DRIVER",
              },
            }),

            prisma.notice.count({
              where: {
                schoolId: school.id,
                isActive: true,
              },
            }),

            prisma.attendance.count({
              where: {
                student: { user: schoolUser },
              },
            }),

            prisma.attendance.count({
              where: {
                student: { user: schoolUser },
                status: "PRESENT",
              },
            }),
          ]);

          const staffCount =
            teachers +
            principals +
            management +
            accountants +
            drivers;

          const attendanceRate = attendanceTotal
            ? Number(
              (
                (attendancePresent / attendanceTotal) *
                100
              ).toFixed(1)
            )
            : null;

          return {
            ...school,
            users,
            students,
            teachers,
            principals,
            management,
            accountants,
            drivers,
            staffCount,
            activeNotices,
            attendanceRate,
          };
        })
      );

      res.json({
        data: {
          schoolCount: schools.length,
          schools,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);


// ============================================================
// DIRECTOR: SCHOOL WORKSPACE DATA
// ============================================================

router.get(
  "/director/schools/:schoolId/workspace",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId } = req.params;

      // Always verify ownership here; never trust a school ID from the client.
      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
        select: {
          school: {
            select: {
              id: true,
              name: true,
              code: true,
              address: true,
              createdAt: true,
            },
          },
        },
      });

      if (!assignment) {
        return res.status(404).json({
          message: "School not found in your assigned portfolio",
        });
      }

      const school = assignment.school;
      const schoolUserWhere = { user: { schoolId } };
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const [
        studentCount,
        teacherCount,
        staffCount,
        classCount,
        subjectCount,
        attendanceToday,
        attendancePresentToday,
        feeSummary,
        pendingFees,
        resultCount,
        students,
        teachers,
        principals,
        notices,
        homework,
        schedules,
      ] = await Promise.all([
        prisma.student.count({ where: schoolUserWhere }),
        prisma.teacher.count({ where: { user: { schoolId } } }),
        prisma.user.count({
          where: {
            schoolId,
            role: { in: ["PRINCIPAL", "MANAGEMENT", "ACCOUNTANT", "DRIVER"] },
          },
        }),
        prisma.class.count({
          where: { teacher: { user: { schoolId } } },
        }),
        prisma.subject.count({
          where: { teacher: { user: { schoolId } } },
        }),
        prisma.attendance.count({
          where: {
            student: schoolUserWhere,
            date: { gte: today, lt: tomorrow },
          },
        }),
        prisma.attendance.count({
          where: {
            student: schoolUserWhere,
            date: { gte: today, lt: tomorrow },
            status: "PRESENT",
          },
        }),
        prisma.feePayment.aggregate({
          where: { student: schoolUserWhere, status: "PAID" },
          _sum: { amount: true },
        }),
        prisma.feePayment.count({
          where: {
            student: schoolUserWhere,
            status: { in: ["PENDING", "OVERDUE", "PARTIAL"] },
          },
        }),
        prisma.result.count({
          where: { student: schoolUserWhere },
        }),
        prisma.student.findMany({
          where: schoolUserWhere,
          take: 8,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            rollNumber: true,
            grade: true,
            section: true,
            createdAt: true,
            user: { select: { firstName: true, lastName: true, email: true } },
          },
        }),
        prisma.teacher.findMany({
          where: { user: { schoolId } },
          take: 8,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            employeeId: true,
            department: true,
            designation: true,
            user: { select: { firstName: true, lastName: true, email: true } },
          },
        }),
        prisma.user.findMany({
          where: { schoolId, role: "PRINCIPAL" },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            username: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          },
        }),
        prisma.notice.findMany({
          where: { schoolId, isActive: true },
          take: 6,
          orderBy: { publishDate: "desc" },
          select: {
            id: true,
            title: true,
            content: true,
            category: true,
            priority: true,
            publishDate: true,
            expiryDate: true,
          },
        }),
        prisma.homework.findMany({
          where: { class: { teacher: { user: { schoolId } } } },
          take: 6,
          orderBy: { dueDate: "asc" },
          select: {
            id: true,
            title: true,
            dueDate: true,
            totalMarks: true,
            subject: { select: { name: true } },
            class: { select: { name: true, grade: true, section: true } },
            _count: { select: { submissions: true } },
          },
        }),
        prisma.schedule.findMany({
          where: { class: { teacher: { user: { schoolId } } } },
          take: 8,
          orderBy: [{ dayOfWeek: "asc" }, { period: "asc" }],
          select: {
            id: true,
            dayOfWeek: true,
            period: true,
            startTime: true,
            endTime: true,
            room: true,
            class: {
              select: {
                name: true,
                grade: true,
                section: true,
                subject: { select: { name: true } },
                teacher: {
                  select: {
                    user: { select: { firstName: true, lastName: true } },
                  },
                },
              },
            },
          },
        }),
      ]);

      const feeCollected = Number(feeSummary._sum.amount || 0);
      const attendanceRate = attendanceToday
        ? Number(((attendancePresentToday / attendanceToday) * 100).toFixed(1))
        : null;

      res.json({
        data: {
          school,
          stats: {
            students: studentCount,
            teachers: teacherCount,
            otherStaff: staffCount,
            classes: classCount,
            subjects: subjectCount,
            attendanceToday: attendanceToday
              ? attendanceRate
              : null,
            attendanceRecordsToday: attendanceToday,
            presentToday: attendancePresentToday,
            feeCollected,
            pendingFeeRecords: pendingFees,
            resultsPublished: resultCount,
          },
          students,
          teachers,
          principals: principals.map(p => ({
            id: p.id,
            name: `${p.firstName} ${p.lastName}`,
            email: p.email,
            username: p.username,
            createdAt: p.createdAt,
          })),
          notices,
          homework,
          schedules,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);


// ============================================================
// DIRECTOR: SCHOOL OVERVIEW (Dashboard Stats Only)
// ============================================================

router.get(
  "/director/schools/:schoolId/overview",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId } = req.params;

      // Verify ownership
      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
        select: {
          school: {
            select: {
              id: true,
              name: true,
              code: true,
              address: true,
              createdAt: true,
            },
          },
        },
      });

      if (!assignment) {
        return res.status(404).json({
          message: "School not found in your assigned portfolio",
        });
      }

      const school = assignment.school;
      const schoolUserWhere = { user: { schoolId } };
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const [
        studentCount,
        teacherCount,
        staffCount,
        classCount,
        subjectCount,
        attendanceToday,
        attendancePresentToday,
        feeSummary,
        pendingFees,
        resultCount,
      ] = await Promise.all([
        prisma.student.count({ where: schoolUserWhere }),
        prisma.teacher.count({ where: { user: { schoolId } } }),
        prisma.user.count({
          where: {
            schoolId,
            role: { in: ["PRINCIPAL", "MANAGEMENT", "ACCOUNTANT", "DRIVER"] },
          },
        }),
        prisma.class.count({
          where: { teacher: { user: { schoolId } } },
        }),
        prisma.subject.count({
          where: { teacher: { user: { schoolId } } },
        }),
        prisma.attendance.count({
          where: {
            student: schoolUserWhere,
            date: { gte: today, lt: tomorrow },
          },
        }),
        prisma.attendance.count({
          where: {
            student: schoolUserWhere,
            date: { gte: today, lt: tomorrow },
            status: "PRESENT",
          },
        }),
        prisma.feePayment.aggregate({
          where: { student: schoolUserWhere, status: "PAID" },
          _sum: { amount: true },
        }),
        prisma.feePayment.count({
          where: {
            student: schoolUserWhere,
            status: { in: ["PENDING", "OVERDUE", "PARTIAL"] },
          },
        }),
        prisma.result.count({
          where: { student: schoolUserWhere },
        }),
      ]);

      const feeCollected = Number(feeSummary._sum.amount || 0);
      const attendanceRate = attendanceToday
        ? Number(((attendancePresentToday / attendanceToday) * 100).toFixed(1))
        : null;

      res.json({
        data: {
          school,
          stats: {
            students: studentCount,
            teachers: teacherCount,
            otherStaff: staffCount,
            classes: classCount,
            subjects: subjectCount,
            attendanceToday: attendanceToday ? attendanceRate : null,
            attendanceRecordsToday: attendanceToday,
            presentToday: attendancePresentToday,
            feeCollected,
            pendingFeeRecords: pendingFees,
            resultsPublished: resultCount,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: STUDENTS LIST
// ============================================================

router.get(
  "/director/schools/:schoolId/students",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId } = req.params;
      const { page = 1, limit = 20, search = "" } = req.query;

      // Verify ownership
      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
      });

      if (!assignment) {
        return res.status(404).json({
          message: "School not found in your assigned portfolio",
        });
      }

      const schoolUserWhere = { user: { schoolId } };
      const whereClause = {
        ...schoolUserWhere,
        ...(search && {
          OR: [
            { rollNumber: { contains: search, mode: "insensitive" } },
            { user: { firstName: { contains: search, mode: "insensitive" } } },
            { user: { lastName: { contains: search, mode: "insensitive" } } },
            { user: { email: { contains: search, mode: "insensitive" } } },
          ],
        }),
      };

      const [students, total] = await Promise.all([
        prisma.student.findMany({
          where: whereClause,
          skip: (parseInt(page) - 1) * parseInt(limit),
          take: parseInt(limit),
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            rollNumber: true,
            grade: true,
            section: true,
            createdAt: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        }),
        prisma.student.count({ where: whereClause }),
      ]);

      res.json({
        data: students,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: TEACHERS LIST
// ============================================================

router.get(
  "/director/schools/:schoolId/teachers",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId } = req.params;
      const { page = 1, limit = 20, search = "" } = req.query;

      // Verify ownership
      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
      });

      if (!assignment) {
        return res.status(404).json({
          message: "School not found in your assigned portfolio",
        });
      }

      const whereClause = {
        user: {
          schoolId,
          ...(search && {
            OR: [
              { firstName: { contains: search, mode: "insensitive" } },
              { lastName: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }),
        },
        ...(search && {
          OR: [
            { employeeId: { contains: search, mode: "insensitive" } },
            { department: { contains: search, mode: "insensitive" } },
          ],
        }),
      };

      const [teachers, total] = await Promise.all([
        prisma.teacher.findMany({
          where: whereClause,
          skip: (parseInt(page) - 1) * parseInt(limit),
          take: parseInt(limit),
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            employeeId: true,
            department: true,
            designation: true,
            createdAt: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        }),
        prisma.teacher.count({ where: whereClause }),
      ]);

      res.json({
        data: teachers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: PRINCIPALS LIST
// ============================================================

router.get(
  "/director/schools/:schoolId/principals",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId } = req.params;

      // Verify ownership
      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
      });

      if (!assignment) {
        return res.status(404).json({
          message: "School not found in your assigned portfolio",
        });
      }

      const principals = await prisma.user.findMany({
        where: { schoolId, role: "PRINCIPAL" },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        },
      });

      res.json({
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
  }
);

// ============================================================
// DIRECTOR: ACADEMICS (Classes, Subjects, Schedules)
// ============================================================

router.get(
  "/director/schools/:schoolId/academics",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId } = req.params;

      // Verify ownership
      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
      });

      if (!assignment) {
        return res.status(404).json({
          message: "School not found in your assigned portfolio",
        });
      }

      const [classes, subjects, schedules] = await Promise.all([
        prisma.class.findMany({
          where: { teacher: { user: { schoolId } } },
          orderBy: { name: "asc" },
          select: {
            id: true,
            name: true,
            grade: true,
            section: true,
            teacher: {
              select: {
                user: { select: { firstName: true, lastName: true } },
              },
            },
            subject: { select: { name: true, code: true } },
            _count: { select: { attendance: true } },
          },
        }),
        prisma.subject.findMany({
          where: { teacher: { user: { schoolId } } },
          orderBy: { name: "asc" },
          select: {
            id: true,
            name: true,
            code: true,
            description: true,
            teacher: {
              select: {
                user: { select: { firstName: true, lastName: true } },
              },
            },
            _count: { select: { classes: true } },
          },
        }),
        prisma.schedule.findMany({
          where: { class: { teacher: { user: { schoolId } } } },
          orderBy: [{ dayOfWeek: "asc" }, { period: "asc" }],
          select: {
            id: true,
            dayOfWeek: true,
            period: true,
            startTime: true,
            endTime: true,
            room: true,
            class: {
              select: {
                name: true,
                grade: true,
                section: true,
                subject: { select: { name: true } },
                teacher: {
                  select: {
                    user: { select: { firstName: true, lastName: true } },
                  },
                },
              },
            },
          },
        }),
      ]);

      res.json({
        data: {
          classes,
          subjects,
          schedules,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: NOTICES
// ============================================================

router.get(
  "/director/schools/:schoolId/notices",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId } = req.params;
      const { page = 1, limit = 20 } = req.query;

      // Verify ownership
      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
      });

      if (!assignment) {
        return res.status(404).json({
          message: "School not found in your assigned portfolio",
        });
      }

      const [notices, total] = await Promise.all([
        prisma.notice.findMany({
          where: { schoolId, isActive: true },
          skip: (parseInt(page) - 1) * parseInt(limit),
          take: parseInt(limit),
          orderBy: { publishDate: "desc" },
          select: {
            id: true,
            title: true,
            content: true,
            category: true,
            priority: true,
            publishDate: true,
            expiryDate: true,

          },
        }),
        prisma.notice.count({ where: { schoolId, isActive: true } }),
      ]);

      res.json({
        data: notices,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: HOMEWORK
// ============================================================

router.get(
  "/director/schools/:schoolId/homework",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId } = req.params;
      const { page = 1, limit = 20 } = req.query;

      // Verify ownership
      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
      });

      if (!assignment) {
        return res.status(404).json({
          message: "School not found in your assigned portfolio",
        });
      }

      const [homework, total] = await Promise.all([
        prisma.homework.findMany({
          where: { class: { teacher: { user: { schoolId } } } },
          skip: (parseInt(page) - 1) * parseInt(limit),
          take: parseInt(limit),
          orderBy: { dueDate: "asc" },
          select: {
            id: true,
            title: true,
            description: true,
            dueDate: true,
            totalMarks: true,
            subject: { select: { name: true, code: true } },
            class: {
              select: {
                name: true,
                grade: true,
                section: true,
                teacher: {
                  select: {
                    user: { select: { firstName: true, lastName: true } },
                  },
                },
              }
            },
            _count: { select: { submissions: true } },
          },
        }),
        prisma.homework.count({
          where: { class: { teacher: { user: { schoolId } } } },
        }),
      ]);

      res.json({
        data: homework,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================================
// DIRECTOR: CREATE PRINCIPAL WITH ONE-TIME TEMPORARY CREDENTIALS
// ============================================================

router.post(
  "/director/schools/:schoolId/principal",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId } = req.params;
      const { firstName, lastName, email, username, temporaryPassword } = req.body ?? {};

      if (
        typeof firstName !== "string" || !firstName.trim() ||
        typeof lastName !== "string" || !lastName.trim() ||
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        typeof username !== "string" || !username.trim() || username.trim().length < 3 ||
        typeof temporaryPassword !== "string" || !temporaryPassword.trim() || temporaryPassword.trim().length < 8
      ) {
        return res.status(400).json({
          status: "error",
          message: "Valid first name, last name, email, username (min 3 chars), and temporary password (min 8 chars) are required",
        });
      }

      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
        select: { school: { select: { id: true, name: true } } },
      });

      if (!assignment) {
        return res.status(403).json({
          status: "error",
          message: "You are not assigned to this school",
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const normalizedUsername = username.trim().toLowerCase();
      const passwordHash = await bcrypt.hash(temporaryPassword.trim(), config.bcrypt.saltRounds);

      const principal = await prisma.$transaction(
        async (tx) => {
          const existingPrincipal = await tx.user.findFirst({
            where: { schoolId, role: "PRINCIPAL" },
            select: { id: true },
          });
          if (existingPrincipal) {
            const error = new Error("This school already has a principal assigned");
            error.statusCode = 409;
            throw error;
          }

          // Check if username is taken
          const usernameTaken = await tx.user.findUnique({
            where: { username: normalizedUsername },
          });
          if (usernameTaken) {
            const error = new Error("This username is already taken");
            error.statusCode = 409;
            throw error;
          }

          // Check if email is taken
          const emailTaken = await tx.user.findUnique({
            where: { email: normalizedEmail },
          });
          if (emailTaken) {
            const error = new Error("This email is already taken");
            error.statusCode = 409;
            throw error;
          }

          return tx.user.create({
            data: {
              email: normalizedEmail,
              username: normalizedUsername,
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
              school: { select: { name: true } },
            },
          });
        },
        { isolationLevel: "Serializable" },
      );

      return res.status(201).json({
        status: "success",
        message: "Principal account created. Copy these credentials now; the password cannot be retrieved later.",
        data: {
          principal: {
            id: principal.id,
            name: `${principal.firstName} ${principal.lastName}`,
            email: principal.email,
            role: principal.role,
            schoolName: principal.school.name,
          },
          credentials: { username: normalizedUsername, temporaryPassword: temporaryPassword.trim() },
        },
      });
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }
      if (error.code === "P2002") {
        return res.status(409).json({
          status: "error",
          message: "An account with this email or username already exists.",
        });
      }
      if (error.code === "P2034") {
        return res.status(409).json({
          status: "error",
          message: "A concurrent account change occurred. Please retry.",
        });
      }
      next(error);
    }
  },
);

// ============================================================
// DIRECTOR: UPDATE PRINCIPAL
// ============================================================

router.patch(
  "/director/schools/:schoolId/principal/:principalId",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId, principalId } = req.params;
      const { firstName, lastName, email } = req.body ?? {};

      if (
        typeof firstName !== "string" || !firstName.trim() ||
        typeof lastName !== "string" || !lastName.trim() ||
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ) {
        return res.status(400).json({
          status: "error",
          message: "Valid first name, last name, and email are required",
        });
      }

      // Verify director has access to this school
      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
      });

      if (!assignment) {
        return res.status(403).json({
          status: "error",
          message: "You are not assigned to this school",
        });
      }

      // Verify principal belongs to this school
      const existingPrincipal = await prisma.user.findFirst({
        where: {
          id: principalId,
          schoolId,
          role: "PRINCIPAL",
        },
      });

      if (!existingPrincipal) {
        return res.status(404).json({
          status: "error",
          message: "Principal not found in this school",
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Check if email is taken by another user
      if (normalizedEmail !== existingPrincipal.email) {
        const emailTaken = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (emailTaken) {
          return res.status(409).json({
            status: "error",
            message: "This email is already taken by another user",
          });
        }
      }

      // Update principal
      const updatedPrincipal = await prisma.user.update({
        where: { id: principalId },
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: normalizedEmail,
        },
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
        },
      });

      return res.json({
        status: "success",
        message: "Principal account updated successfully",
        data: {
          principal: {
            id: updatedPrincipal.id,
            name: `${updatedPrincipal.firstName} ${updatedPrincipal.lastName}`,
            email: updatedPrincipal.email,
            username: updatedPrincipal.username,
          },
        },
      });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(409).json({
          status: "error",
          message: "This email is already taken",
        });
      }
      next(error);
    }
  },
);

// ============================================================
// DIRECTOR: DELETE PRINCIPAL
// ============================================================

router.delete(
  "/director/schools/:schoolId/principal/:principalId",
  allowRoles("DIRECTOR"),
  async (req, res, next) => {
    try {
      const { schoolId, principalId } = req.params;

      // Verify director has access to this school
      const assignment = await prisma.directorSchool.findUnique({
        where: {
          directorId_schoolId: {
            directorId: req.user.id,
            schoolId,
          },
        },
      });

      if (!assignment) {
        return res.status(403).json({
          status: "error",
          message: "You are not assigned to this school",
        });
      }

      // Verify principal belongs to this school
      const existingPrincipal = await prisma.user.findFirst({
        where: {
          id: principalId,
          schoolId,
          role: "PRINCIPAL",
        },
      });

      if (!existingPrincipal) {
        return res.status(404).json({
          status: "error",
          message: "Principal not found in this school",
        });
      }

      // Delete the principal
      await prisma.user.delete({
        where: { id: principalId },
      });

      return res.json({
        status: "success",
        message: "Principal account deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;