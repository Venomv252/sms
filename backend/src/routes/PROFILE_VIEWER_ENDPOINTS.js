/**
 * BACKEND API ENDPOINTS TO ADD
 * File: sms/backend/src/routes/accountant.routes.js
 * 
 * Add these endpoints to enable the Profile Viewer functionality
 * Place them AFTER the /employees endpoint and BEFORE the final export statement
 */

// ==================== STUDENT PROFILE ENDPOINTS ====================

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

// ==================== PARENT PROFILE ENDPOINTS ====================

/**
 * GET /api/accountant/parents
 * Get all parents with their children
 */
router.get("/parents", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    const parents = await prisma.parent.findMany({
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
            username: true,
            createdAt: true
          }
        },
        studentLinks: {
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
        }
      }
    });

    const formattedParents = parents.map(parent => ({
      id: parent.id,
      name: `${parent.user.firstName} ${parent.user.lastName}`,
      email: parent.user.email,
      phoneNumber: parent.phoneNumber,
      children: parent.studentLinks.map(link => ({
        firstName: link.student.user.firstName,
        lastName: link.student.user.lastName,
        grade: link.student.grade,
        section: link.student.section,
        rollNumber: link.student.rollNumber,
        admissionNumber: link.student.admissionNumber
      }))
    }));

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

    const parent = await prisma.parent.findFirst({
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
        },
        studentLinks: {
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
        }
      }
    });

    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "Parent not found"
      });
    }

    const formattedParent = {
      ...parent,
      children: parent.studentLinks.map(link => ({
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
      phoneNumber,
      address,
      occupation
    } = req.body;

    // Verify parent belongs to this school
    const parent = await prisma.parent.findFirst({
      where: {
        id,
        user: { schoolId }
      },
      include: {
        user: true
      }
    });

    if (!parent) {
      return res.status(404).json({
        status: "error",
        message: "Parent not found"
      });
    }

    // Update in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update user info
      if (firstName || lastName || email) {
        await tx.user.update({
          where: { id: parent.userId },
          data: {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email })
          }
        });
      }

      // Update parent info
      const updatedParent = await tx.parent.update({
        where: { id },
        data: {
          ...(phoneNumber !== undefined && { phoneNumber }),
          ...(address !== undefined && { address }),
          ...(occupation !== undefined && { occupation })
        }
      });

      return updatedParent;
    });

    return res.json({
      status: "success",
      message: "Parent profile updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// ==================== STAFF PROFILE ENDPOINTS ====================

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
