import { Router } from "express";
import prisma from "../config/prisma.js";
import { auth, allowRoles } from "../middleware/auth.js";
import { broadcastBusLocation } from "../services/websocket.js";

const router = Router();

// All driver routes require authentication and DRIVER role
router.use(auth, allowRoles("DRIVER"));

// ═══════════════════════════════════════════════════════════════════════════
// DRIVER PROFILE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/driver/profile
 * Get current driver's profile with assigned bus and route
 */
router.get("/profile", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
        assignedRoutes: {
          where: { isActive: true },
          include: {
            pickupPoints: {
              orderBy: { sequence: "asc" },
            },
            students: {
              where: { isActive: true },
              include: {
                student: {
                  include: {
                    user: {
                      select: {
                        firstName: true,
                        lastName: true,
                      },
                    },
                  },
                },
                pickupPoint: true,
              },
            },
          },
        },
      },
    });

    if (!driver) {
      return res.status(404).json({
        status: "error",
        message: "Driver profile not found. Please contact administration.",
      });
    }

    // Get assigned bus info
    const assignedRoute = driver.assignedRoutes[0]; // Assuming driver has one active route
    let busInfo = null;

    if (assignedRoute) {
      busInfo = await prisma.bus.findUnique({
        where: { id: assignedRoute.busId },
        select: {
          id: true,
          busNumber: true,
          registrationNumber: true,
          capacity: true,
          isActive: true,
          insuranceExpiry: true,
          fitnessExpiry: true,
        },
      });
    }

    return res.json({
      status: "success",
      data: {
        driver: {
          id: driver.id,
          userId: driver.userId,
          employeeId: driver.employeeId,
          name: `${driver.user.firstName} ${driver.user.lastName}`,
          email: driver.user.email,
          phoneNumber: driver.phoneNumber,
          licenseNumber: driver.licenseNumber,
          licenseExpiry: driver.licenseExpiry,
          bloodGroup: driver.bloodGroup,
          emergencyContact: driver.emergencyContact,
          emergencyPhone: driver.emergencyPhone,
          isActive: driver.isActive,
        },
        assignedBus: busInfo,
        assignedRoute: assignedRoute
          ? {
              id: assignedRoute.id,
              routeNumber: assignedRoute.routeNumber,
              routeName: assignedRoute.routeName,
              startPoint: assignedRoute.startPoint,
              endPoint: assignedRoute.endPoint,
              distance: assignedRoute.distance,
              duration: assignedRoute.duration,
              pickupPoints: assignedRoute.pickupPoints.map((pp) => ({
                id: pp.id,
                name: pp.name,
                address: pp.address,
                latitude: pp.latitude,
                longitude: pp.longitude,
                sequence: pp.sequence,
                estimatedTime: pp.estimatedTime,
              })),
              totalStudents: assignedRoute.students.length,
            }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD OVERVIEW
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/driver/dashboard
 * Get dashboard overview with today's stats and active trip
 */
router.get("/dashboard", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        assignedRoutes: {
          where: { isActive: true },
          select: { id: true, busId: true },
        },
      },
    });

    if (!driver || !driver.assignedRoutes.length) {
      return res.json({
        status: "success",
        data: {
          hasAssignment: false,
          message: "No route assigned. Please contact administration.",
        },
      });
    }

    const route = driver.assignedRoutes[0];

    // Get active trip
    const activeTrip = await prisma.trip.findFirst({
      where: {
        busId: route.busId,
        status: "IN_PROGRESS",
      },
      include: {
        bus: {
          select: {
            busNumber: true,
            registrationNumber: true,
          },
        },
      },
    });

    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayTrips = await prisma.trip.findMany({
      where: {
        busId: route.busId,
        startTime: {
          gte: today,
          lt: tomorrow,
        },
      },
      select: {
        id: true,
        status: true,
        startTime: true,
        endTime: true,
      },
    });

    // Get assigned students count
    const assignedStudents = await prisma.studentRouteAssignment.count({
      where: {
        routeId: route.id,
        isActive: true,
      },
    });

    // Get today's pickup logs if active trip exists
    let pickedUpCount = 0;
    let droppedOffCount = 0;

    if (activeTrip) {
      const pickupLogs = await prisma.studentPickupLog.findMany({
        where: { tripId: activeTrip.id },
        select: { eventType: true },
      });

      pickedUpCount = pickupLogs.filter((log) => log.eventType === "PICKUP").length;
      droppedOffCount = pickupLogs.filter((log) => log.eventType === "DROPOFF").length;
    }

    const completedTrips = todayTrips.filter((t) => t.status === "COMPLETED").length;
    const scheduledTrips = todayTrips.filter((t) => t.status === "SCHEDULED").length;

    return res.json({
      status: "success",
      data: {
        hasAssignment: true,
        activeTrip: activeTrip
          ? {
              id: activeTrip.id,
              status: activeTrip.status,
              routeName: activeTrip.routeName,
              startTime: activeTrip.startTime,
              currentLatitude: activeTrip.currentLatitude,
              currentLongitude: activeTrip.currentLongitude,
              lastLocationUpdate: activeTrip.lastLocationUpdate,
            }
          : null,
        todayStats: {
          assignedStudents,
          pickedUpStudents: pickedUpCount,
          droppedOffStudents: droppedOffCount,
          remainingStudents: assignedStudents - pickedUpCount,
          completedTrips,
          scheduledTrips,
          totalTrips: todayTrips.length,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// TRIP MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/driver/trips
 * Get trip history for the driver
 */
router.get("/trips", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, status } = req.query;

    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        assignedRoutes: {
          where: { isActive: true },
          select: { busId: true },
        },
      },
    });

    if (!driver || !driver.assignedRoutes.length) {
      return res.json({
        status: "success",
        data: { trips: [], pagination: { total: 0, page: 1, limit: 20, totalPages: 0 } },
      });
    }

    const busId = driver.assignedRoutes[0].busId;

    const where = {
      busId,
      ...(status && { status }),
    };

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: { startTime: "desc" },
        include: {
          bus: {
            select: {
              busNumber: true,
              registrationNumber: true,
            },
          },
        },
      }),
      prisma.trip.count({ where }),
    ]);

    return res.json({
      status: "success",
      data: {
        trips: trips.map((trip) => ({
          id: trip.id,
          routeName: trip.routeName,
          startTime: trip.startTime,
          endTime: trip.endTime,
          status: trip.status,
          delayMinutes: trip.delayMinutes,
          busNumber: trip.bus.busNumber,
          currentLatitude: trip.currentLatitude,
          currentLongitude: trip.currentLongitude,
          lastLocationUpdate: trip.lastLocationUpdate,
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
 * GET /api/driver/trips/active
 * Get currently active trip
 */
router.get("/trips/active", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        assignedRoutes: {
          where: { isActive: true },
          select: { busId: true, routeName: true },
        },
      },
    });

    if (!driver || !driver.assignedRoutes.length) {
      return res.json({
        status: "success",
        data: { activeTrip: null },
      });
    }

    const busId = driver.assignedRoutes[0].busId;

    const activeTrip = await prisma.trip.findFirst({
      where: {
        busId,
        status: "IN_PROGRESS",
      },
      include: {
        bus: {
          select: {
            busNumber: true,
            registrationNumber: true,
            capacity: true,
          },
        },
        pickupLogs: {
          select: {
            id: true,
            eventType: true,
            timestamp: true,
            studentId: true,
          },
        },
      },
    });

    if (!activeTrip) {
      return res.json({
        status: "success",
        data: { activeTrip: null },
      });
    }

    return res.json({
      status: "success",
      data: {
        activeTrip: {
          id: activeTrip.id,
          routeName: activeTrip.routeName,
          startTime: activeTrip.startTime,
          status: activeTrip.status,
          busNumber: activeTrip.bus.busNumber,
          registrationNumber: activeTrip.bus.registrationNumber,
          capacity: activeTrip.bus.capacity,
          currentLatitude: activeTrip.currentLatitude,
          currentLongitude: activeTrip.currentLongitude,
          lastLocationUpdate: activeTrip.lastLocationUpdate,
          pickedUpCount: activeTrip.pickupLogs.filter((log) => log.eventType === "PICKUP")
            .length,
          droppedOffCount: activeTrip.pickupLogs.filter((log) => log.eventType === "DROPOFF")
            .length,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/driver/trips/start
 * Start a new trip
 */
router.post("/trips/start", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { routeName, remarks } = req.body;

    if (!routeName) {
      return res.status(400).json({
        status: "error",
        message: "Route name is required",
      });
    }

    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        assignedRoutes: {
          where: { isActive: true },
          select: { id: true, busId: true, routeName: true },
        },
      },
    });

    if (!driver || !driver.assignedRoutes.length) {
      return res.status(400).json({
        status: "error",
        message: "No route assigned. Cannot start trip.",
      });
    }

    const route = driver.assignedRoutes[0];

    // Check for existing active trip
    const existingTrip = await prisma.trip.findFirst({
      where: {
        busId: route.busId,
        status: "IN_PROGRESS",
      },
    });

    if (existingTrip) {
      return res.status(400).json({
        status: "error",
        message: "An active trip already exists for this bus. Please end it first.",
        data: {
          existingTripId: existingTrip.id,
          startTime: existingTrip.startTime,
        },
      });
    }

    // Create new trip
    const trip = await prisma.trip.create({
      data: {
        busId: route.busId,
        routeName: routeName,
        startTime: new Date(),
        status: "IN_PROGRESS",
        remarks: remarks || null,
      },
      include: {
        bus: {
          select: {
            busNumber: true,
            registrationNumber: true,
          },
        },
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Trip started successfully",
      data: {
        trip: {
          id: trip.id,
          routeName: trip.routeName,
          startTime: trip.startTime,
          status: trip.status,
          busNumber: trip.bus.busNumber,
          registrationNumber: trip.bus.registrationNumber,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/driver/trips/:id/location
 * Update trip GPS location
 */
router.patch("/trips/:id/location", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        status: "error",
        message: "Latitude and longitude are required",
      });
    }

    // Verify trip belongs to driver's bus
    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        assignedRoutes: {
          where: { isActive: true },
          select: { busId: true },
        },
      },
    });

    if (!driver || !driver.assignedRoutes.length) {
      return res.status(403).json({
        status: "error",
        message: "No route assigned",
      });
    }

    const trip = await prisma.trip.findUnique({
      where: { id },
      select: { busId: true, status: true },
    });

    if (!trip) {
      return res.status(404).json({
        status: "error",
        message: "Trip not found",
      });
    }

    if (trip.busId !== driver.assignedRoutes[0].busId) {
      return res.status(403).json({
        status: "error",
        message: "This trip does not belong to your assigned bus",
      });
    }

    if (trip.status !== "IN_PROGRESS") {
      return res.status(400).json({
        status: "error",
        message: "Can only update location for active trips",
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
    broadcastBusLocation(id, latitude, longitude, updatedTrip.lastLocationUpdate.toISOString());

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
 * POST /api/driver/trips/:id/end
 * End an active trip
 */
router.post("/trips/:id/end", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { remarks } = req.body;

    // Verify trip belongs to driver
    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        assignedRoutes: {
          where: { isActive: true },
          select: { busId: true },
        },
      },
    });

    if (!driver || !driver.assignedRoutes.length) {
      return res.status(403).json({
        status: "error",
        message: "No route assigned",
      });
    }

    const trip = await prisma.trip.findUnique({
      where: { id },
    });

    if (!trip) {
      return res.status(404).json({
        status: "error",
        message: "Trip not found",
      });
    }

    if (trip.busId !== driver.assignedRoutes[0].busId) {
      return res.status(403).json({
        status: "error",
        message: "This trip does not belong to your assigned bus",
      });
    }

    if (trip.status !== "IN_PROGRESS") {
      return res.status(400).json({
        status: "error",
        message: "Trip is not active",
      });
    }

    // End trip
    const updatedTrip = await prisma.trip.update({
      where: { id },
      data: {
        endTime: new Date(),
        status: "COMPLETED",
        remarks: remarks || trip.remarks,
      },
    });

    return res.json({
      status: "success",
      message: "Trip ended successfully",
      data: {
        trip: {
          id: updatedTrip.id,
          routeName: updatedTrip.routeName,
          startTime: updatedTrip.startTime,
          endTime: updatedTrip.endTime,
          status: updatedTrip.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// STUDENT ROSTER & PICKUP/DROPOFF
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/driver/students
 * Get all students assigned to driver's route
 */
router.get("/students", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { search, pickupPointId } = req.query;

    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        assignedRoutes: {
          where: { isActive: true },
          select: { id: true },
        },
      },
    });

    if (!driver || !driver.assignedRoutes.length) {
      return res.json({
        status: "success",
        data: { students: [] },
      });
    }

    const routeId = driver.assignedRoutes[0].id;

    const where = {
      routeId,
      isActive: true,
      ...(pickupPointId && { pickupPointId }),
      ...(search && {
        OR: [
          {
            student: {
              user: {
                OR: [
                  { firstName: { contains: search, mode: "insensitive" } },
                  { lastName: { contains: search, mode: "insensitive" } },
                ],
              },
            },
          },
          {
            student: {
              rollNumber: { contains: search, mode: "insensitive" },
            },
          },
        ],
      }),
    };

    const studentAssignments = await prisma.studentRouteAssignment.findMany({
      where,
      include: {
        student: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        pickupPoint: {
          select: {
            id: true,
            name: true,
            address: true,
            sequence: true,
            estimatedTime: true,
          },
        },
      },
      orderBy: {
        pickupPoint: {
          sequence: "asc",
        },
      },
    });

    return res.json({
      status: "success",
      data: {
        students: studentAssignments.map((assignment) => ({
          id: assignment.student.id,
          name: `${assignment.student.user.firstName} ${assignment.student.user.lastName}`,
          rollNumber: assignment.student.rollNumber,
          grade: assignment.student.grade,
          section: assignment.student.section,
          admissionNumber: assignment.student.admissionNumber,
          phoneNumber: assignment.student.phoneNumber,
          parentName: assignment.student.parentName,
          parentPhone: assignment.student.parentPhone,
          parentEmail: assignment.student.parentEmail,
          pickupPoint: assignment.pickupPoint,
          assignmentId: assignment.id,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/driver/students/trip-status/:tripId
 * Get student pickup/dropoff status for a specific trip
 */
router.get("/students/trip-status/:tripId", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { tripId } = req.params;

    // Verify trip belongs to driver
    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        assignedRoutes: {
          where: { isActive: true },
          select: { id: true, busId: true },
        },
      },
    });

    if (!driver || !driver.assignedRoutes.length) {
      return res.status(403).json({
        status: "error",
        message: "No route assigned",
      });
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      select: { busId: true },
    });

    if (!trip || trip.busId !== driver.assignedRoutes[0].busId) {
      return res.status(403).json({
        status: "error",
        message: "Trip not found or does not belong to your bus",
      });
    }

    // Get all students on the route
    const students = await prisma.studentRouteAssignment.findMany({
      where: {
        routeId: driver.assignedRoutes[0].id,
        isActive: true,
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        pickupPoint: {
          select: {
            id: true,
            name: true,
            sequence: true,
          },
        },
      },
    });

    // Get pickup logs for this trip
    const pickupLogs = await prisma.studentPickupLog.findMany({
      where: { tripId },
      select: {
        studentId: true,
        eventType: true,
        timestamp: true,
      },
    });

    const logsMap = new Map();
    pickupLogs.forEach((log) => {
      if (!logsMap.has(log.studentId)) {
        logsMap.set(log.studentId, {});
      }
      logsMap.get(log.studentId)[log.eventType] = log.timestamp;
    });

    return res.json({
      status: "success",
      data: {
        students: students.map((assignment) => {
          const logs = logsMap.get(assignment.student.id) || {};
          return {
            id: assignment.student.id,
            name: `${assignment.student.user.firstName} ${assignment.student.user.lastName}`,
            rollNumber: assignment.student.rollNumber,
            grade: assignment.student.grade,
            section: assignment.student.section,
            pickupPoint: assignment.pickupPoint,
            pickedUp: !!logs.PICKUP,
            pickupTime: logs.PICKUP || null,
            droppedOff: !!logs.DROPOFF,
            dropoffTime: logs.DROPOFF || null,
          };
        }),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/driver/students/:studentId/pickup
 * Record student pickup
 */
router.post("/students/:studentId/pickup", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { studentId } = req.params;
    const { tripId, pickupPointId, latitude, longitude } = req.body;

    if (!tripId || !pickupPointId) {
      return res.status(400).json({
        status: "error",
        message: "Trip ID and pickup point ID are required",
      });
    }

    const driver = await prisma.driver.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!driver) {
      return res.status(403).json({
        status: "error",
        message: "Driver profile not found",
      });
    }

    // Check for existing pickup log
    const existingLog = await prisma.studentPickupLog.findUnique({
      where: {
        tripId_studentId_eventType: {
          tripId,
          studentId,
          eventType: "PICKUP",
        },
      },
    });

    if (existingLog) {
      return res.status(400).json({
        status: "error",
        message: "Student already marked as picked up",
        data: { timestamp: existingLog.timestamp },
      });
    }

    // Create pickup log
    const pickupLog = await prisma.studentPickupLog.create({
      data: {
        tripId,
        studentId,
        pickupPointId,
        driverId: driver.id,
        eventType: "PICKUP",
        latitude,
        longitude,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Student marked as picked up",
      data: {
        log: {
          id: pickupLog.id,
          timestamp: pickupLog.timestamp,
          eventType: pickupLog.eventType,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/driver/students/:studentId/dropoff
 * Record student dropoff
 */
router.post("/students/:studentId/dropoff", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { studentId } = req.params;
    const { tripId, pickupPointId, latitude, longitude } = req.body;

    if (!tripId || !pickupPointId) {
      return res.status(400).json({
        status: "error",
        message: "Trip ID and pickup point ID are required",
      });
    }

    const driver = await prisma.driver.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!driver) {
      return res.status(403).json({
        status: "error",
        message: "Driver profile not found",
      });
    }

    // Check for existing dropoff log
    const existingLog = await prisma.studentPickupLog.findUnique({
      where: {
        tripId_studentId_eventType: {
          tripId,
          studentId,
          eventType: "DROPOFF",
        },
      },
    });

    if (existingLog) {
      return res.status(400).json({
        status: "error",
        message: "Student already marked as dropped off",
        data: { timestamp: existingLog.timestamp },
      });
    }

    // Create dropoff log
    const dropoffLog = await prisma.studentPickupLog.create({
      data: {
        tripId,
        studentId,
        pickupPointId,
        driverId: driver.id,
        eventType: "DROPOFF",
        latitude,
        longitude,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Student marked as dropped off",
      data: {
        log: {
          id: dropoffLog.id,
          timestamp: dropoffLog.timestamp,
          eventType: dropoffLog.eventType,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// FUEL & EXPENSES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/driver/fuel-expenses
 * Get fuel expense history
 */
router.get("/fuel-expenses", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, status } = req.query;

    const driver = await prisma.driver.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!driver) {
      return res.status(404).json({
        status: "error",
        message: "Driver profile not found",
      });
    }

    const where = {
      driverId: driver.id,
      ...(status && { status }),
    };

    const [expenses, total] = await Promise.all([
      prisma.fuelExpense.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: { date: "desc" },
      }),
      prisma.fuelExpense.count({ where }),
    ]);

    return res.json({
      status: "success",
      data: {
        expenses: expenses.map((expense) => ({
          id: expense.id,
          date: expense.date,
          fuelQuantity: expense.fuelQuantity,
          amount: expense.amount.toString(),
          odometerReading: expense.odometerReading,
          fuelStation: expense.fuelStation,
          receiptUrl: expense.receiptUrl,
          status: expense.status,
          approvedAt: expense.approvedAt,
          remarks: expense.remarks,
          createdAt: expense.createdAt,
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
 * POST /api/driver/fuel-expenses
 * Submit a fuel expense
 */
router.post("/fuel-expenses", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      date,
      fuelQuantity,
      amount,
      odometerReading,
      fuelStation,
      receiptUrl,
      remarks,
    } = req.body;

    // Validation
    if (!date || !fuelQuantity || !amount) {
      return res.status(400).json({
        status: "error",
        message: "Date, fuel quantity, and amount are required",
      });
    }

    if (fuelQuantity <= 0 || amount <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Fuel quantity and amount must be positive numbers",
      });
    }

    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        assignedRoutes: {
          where: { isActive: true },
          select: { busId: true },
        },
      },
    });

    if (!driver || !driver.assignedRoutes.length) {
      return res.status(400).json({
        status: "error",
        message: "No bus assigned",
      });
    }

    const expense = await prisma.fuelExpense.create({
      data: {
        driverId: driver.id,
        busId: driver.assignedRoutes[0].busId,
        date: new Date(date),
        fuelQuantity: parseFloat(fuelQuantity),
        amount: parseFloat(amount),
        odometerReading: odometerReading ? parseInt(odometerReading) : null,
        fuelStation,
        receiptUrl,
        remarks,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Fuel expense submitted successfully",
      data: {
        expense: {
          id: expense.id,
          date: expense.date,
          fuelQuantity: expense.fuelQuantity,
          amount: expense.amount.toString(),
          status: expense.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// VEHICLE BREAKDOWNS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/driver/breakdowns
 * Get breakdown history
 */
router.get("/breakdowns", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, status } = req.query;

    const driver = await prisma.driver.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!driver) {
      return res.status(404).json({
        status: "error",
        message: "Driver profile not found",
      });
    }

    const where = {
      driverId: driver.id,
      ...(status && { status }),
    };

    const [breakdowns, total] = await Promise.all([
      prisma.vehicleBreakdown.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: { date: "desc" },
      }),
      prisma.vehicleBreakdown.count({ where }),
    ]);

    return res.json({
      status: "success",
      data: {
        breakdowns: breakdowns.map((breakdown) => ({
          id: breakdown.id,
          location: breakdown.location,
          date: breakdown.date,
          description: breakdown.description,
          severity: breakdown.severity,
          imageUrl: breakdown.imageUrl,
          status: breakdown.status,
          resolvedAt: breakdown.resolvedAt,
          repairCost: breakdown.repairCost?.toString(),
          remarks: breakdown.remarks,
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
 * POST /api/driver/breakdowns
 * Report a vehicle breakdown
 */
router.post("/breakdowns", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { location, description, severity, latitude, longitude, imageUrl } = req.body;

    if (!location || !description) {
      return res.status(400).json({
        status: "error",
        message: "Location and description are required",
      });
    }

    const validSeverities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    if (severity && !validSeverities.includes(severity)) {
      return res.status(400).json({
        status: "error",
        message: `Severity must be one of: ${validSeverities.join(", ")}`,
      });
    }

    const driver = await prisma.driver.findUnique({
      where: { userId },
      include: {
        assignedRoutes: {
          where: { isActive: true },
          select: { busId: true },
        },
      },
    });

    if (!driver || !driver.assignedRoutes.length) {
      return res.status(400).json({
        status: "error",
        message: "No bus assigned",
      });
    }

    const breakdown = await prisma.vehicleBreakdown.create({
      data: {
        driverId: driver.id,
        busId: driver.assignedRoutes[0].busId,
        location,
        description,
        severity: severity || "MEDIUM",
        latitude,
        longitude,
        imageUrl,
        status: "REPORTED",
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Breakdown reported successfully",
      data: {
        breakdown: {
          id: breakdown.id,
          location: breakdown.location,
          date: breakdown.date,
          description: breakdown.description,
          severity: breakdown.severity,
          status: breakdown.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// INCIDENTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/driver/incidents
 * Get incident history
 */
router.get("/incidents", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, status, incidentType } = req.query;

    const driver = await prisma.driver.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!driver) {
      return res.status(404).json({
        status: "error",
        message: "Driver profile not found",
      });
    }

    const where = {
      driverId: driver.id,
      ...(status && { status }),
      ...(incidentType && { incidentType }),
    };

    const [incidents, total] = await Promise.all([
      prisma.incident.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: { date: "desc" },
      }),
      prisma.incident.count({ where }),
    ]);

    return res.json({
      status: "success",
      data: {
        incidents: incidents.map((incident) => ({
          id: incident.id,
          incidentType: incident.incidentType,
          title: incident.title,
          description: incident.description,
          location: incident.location,
          date: incident.date,
          severity: incident.severity,
          imageUrl: incident.imageUrl,
          status: incident.status,
          reviewedAt: incident.reviewedAt,
          resolution: incident.resolution,
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
 * POST /api/driver/incidents
 * Report an incident
 */
router.post("/incidents", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      incidentType,
      title,
      description,
      location,
      severity,
      latitude,
      longitude,
      imageUrl,
      tripId,
    } = req.body;

    if (!incidentType || !title || !description) {
      return res.status(400).json({
        status: "error",
        message: "Incident type, title, and description are required",
      });
    }

    const validTypes = [
      "ACCIDENT",
      "STUDENT_SAFETY",
      "VEHICLE_DAMAGE",
      "ROUTE_DISRUPTION",
      "OTHER",
    ];
    if (!validTypes.includes(incidentType)) {
      return res.status(400).json({
        status: "error",
        message: `Incident type must be one of: ${validTypes.join(", ")}`,
      });
    }

    const validSeverities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    if (severity && !validSeverities.includes(severity)) {
      return res.status(400).json({
        status: "error",
        message: `Severity must be one of: ${validSeverities.join(", ")}`,
      });
    }

    const driver = await prisma.driver.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!driver) {
      return res.status(404).json({
        status: "error",
        message: "Driver profile not found",
      });
    }

    const incident = await prisma.incident.create({
      data: {
        driverId: driver.id,
        tripId,
        incidentType,
        title,
        description,
        location,
        severity: severity || "MEDIUM",
        latitude,
        longitude,
        imageUrl,
        status: "REPORTED",
      },
    });

    return res.status(201).json({
      status: "success",
      message: "Incident reported successfully",
      data: {
        incident: {
          id: incident.id,
          incidentType: incident.incidentType,
          title: incident.title,
          date: incident.date,
          severity: incident.severity,
          status: incident.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// EMERGENCY CONTACTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GET /api/driver/emergency-contacts
 * Get emergency contact list for the school
 */
router.get("/emergency-contacts", async (req, res, next) => {
  try {
    const schoolId = req.user.schoolId;

    if (!schoolId) {
      return res.json({
        status: "success",
        data: { contacts: [] },
      });
    }

    const contacts = await prisma.emergencyContact.findMany({
      where: {
        schoolId,
        isActive: true,
      },
      orderBy: { priority: "asc" },
    });

    return res.json({
      status: "success",
      data: {
        contacts: contacts.map((contact) => ({
          id: contact.id,
          name: contact.name,
          department: contact.department,
          phoneNumber: contact.phoneNumber,
          priority: contact.priority,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
