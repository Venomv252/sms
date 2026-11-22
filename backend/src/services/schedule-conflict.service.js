/**
 * Schedule Conflict Detection Service
 * 
 * Implements robust conflict detection for school schedules with:
 * - Teacher time conflict detection
 * - Room booking conflict detection
 * - Class period duplicate detection
 * - Time interval overlap logic
 */

import prisma from "../config/prisma.js";

/**
 * Convert HH:mm time string to minutes since midnight
 * @param {string} time - Time in HH:mm format
 * @returns {number} Minutes since midnight
 */
export function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Check if two time intervals overlap
 * Two intervals overlap when: newStart < existingEnd && newEnd > existingStart
 * Adjacent intervals (end = start) do NOT overlap
 * 
 * @param {string} newStart - New schedule start time (HH:mm)
 * @param {string} newEnd - New schedule end time (HH:mm)
 * @param {string} existingStart - Existing schedule start time (HH:mm)
 * @param {string} existingEnd - Existing schedule end time (HH:mm)
 * @returns {boolean} True if intervals overlap
 */
export function timeIntervalsOverlap(newStart, newEnd, existingStart, existingEnd) {
  const newStartMin = timeToMinutes(newStart);
  const newEndMin = timeToMinutes(newEnd);
  const existingStartMin = timeToMinutes(existingStart);
  const existingEndMin = timeToMinutes(existingEnd);

  // Intervals overlap when: newStart < existingEnd && newEnd > existingStart
  return newStartMin < existingEndMin && newEndMin > existingStartMin;
}

/**
 * Check for teacher conflicts
 * A teacher cannot be assigned to multiple classes at overlapping times on the same day
 * 
 * @param {string} classId - Class ID for the new schedule
 * @param {string} dayOfWeek - Day of week
 * @param {string} startTime - Start time (HH:mm)
 * @param {string} endTime - End time (HH:mm)
 * @param {object} transaction - Prisma transaction client
 * @returns {Promise<Array>} Array of conflicting schedules
 */
export async function checkTeacherConflicts(
  classId,
  dayOfWeek,
  startTime,
  endTime,
  transaction = prisma
) {
  // Get the teacher for this class
  const classRecord = await transaction.class.findUnique({
    where: { id: classId },
    select: {
      teacherId: true,
      teacher: {
        select: {
          id: true,
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

  if (!classRecord) {
    return [];
  }

  const teacherId = classRecord.teacherId;

  // Find all schedules for this teacher on the same day
  const existingSchedules = await transaction.schedule.findMany({
    where: {
      dayOfWeek,
      class: {
        teacherId
      }
    },
    select: {
      id: true,
      dayOfWeek: true,
      startTime: true,
      endTime: true,
      room: true,
      period: true,
      class: {
        select: {
          id: true,
          name: true,
          grade: true,
          section: true
        }
      }
    }
  });

  // Check for time overlaps
  const conflicts = existingSchedules.filter((existing) => {
    return timeIntervalsOverlap(
      startTime,
      endTime,
      existing.startTime,
      existing.endTime
    );
  });

  return conflicts.map((conflict) => ({
    type: "TEACHER_CONFLICT",
    message: "Teacher is already assigned during this time",
    existingSchedule: {
      dayOfWeek: conflict.dayOfWeek,
      startTime: conflict.startTime,
      endTime: conflict.endTime,
      room: conflict.room,
      className: conflict.class.name,
      grade: conflict.class.grade,
      section: conflict.class.section
    }
  }));
}

/**
 * Check for room conflicts
 * A room cannot be assigned to multiple classes at overlapping times on the same day
 * within the same school
 * 
 * @param {string} room - Room identifier
 * @param {string} dayOfWeek - Day of week
 * @param {string} startTime - Start time (HH:mm)
 * @param {string} endTime - End time (HH:mm)
 * @param {string} classId - Class ID for determining school scope
 * @param {object} transaction - Prisma transaction client
 * @returns {Promise<Array>} Array of conflicting schedules
 */
export async function checkRoomConflicts(
  room,
  dayOfWeek,
  startTime,
  endTime,
  classId,
  transaction = prisma
) {
  // If no room specified, no conflict possible
  if (!room) {
    return [];
  }

  // Get the school ID for the class being scheduled
  const classRecord = await transaction.class.findUnique({
    where: { id: classId },
    select: {
      teacher: {
        select: {
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
    return [];
  }

  // Validate the relationship chain exists
  // Note: Schema enforces teacher and user exist, but schoolId can be null
  if (!classRecord.teacher) {
    const error = new Error("Cannot check room conflicts: class has no assigned teacher");
    error.statusCode = 400;
    throw error;
  }

  if (!classRecord.teacher.user) {
    const error = new Error("Cannot check room conflicts: teacher has no associated user account");
    error.statusCode = 400;
    throw error;
  }

  if (!classRecord.teacher.user.schoolId) {
    const error = new Error("Cannot check room conflicts: teacher's user account is not assigned to a school");
    error.statusCode = 400;
    throw error;
  }

  const schoolId = classRecord.teacher.user.schoolId;

  // Find all schedules for this room on the same day in the same school
  const existingSchedules = await transaction.schedule.findMany({
    where: {
      dayOfWeek,
      room,
      class: {
        teacher: {
          user: {
            schoolId
          }
        }
      }
    },
    select: {
      id: true,
      dayOfWeek: true,
      startTime: true,
      endTime: true,
      room: true,
      period: true,
      class: {
        select: {
          id: true,
          name: true,
          grade: true,
          section: true
        }
      }
    }
  });

  // Check for time overlaps
  const conflicts = existingSchedules.filter((existing) => {
    return timeIntervalsOverlap(
      startTime,
      endTime,
      existing.startTime,
      existing.endTime
    );
  });

  return conflicts.map((conflict) => ({
    type: "ROOM_CONFLICT",
    message: "Room is already booked during this time",
    existingSchedule: {
      dayOfWeek: conflict.dayOfWeek,
      startTime: conflict.startTime,
      endTime: conflict.endTime,
      room: conflict.room,
      className: conflict.class.name,
      grade: conflict.class.grade,
      section: conflict.class.section
    }
  }));
}

/**
 * Check for class period duplicates
 * A class cannot have multiple schedules for the same day and period
 * This applies even if time intervals don't overlap
 * 
 * @param {string} classId - Class ID
 * @param {string} dayOfWeek - Day of week
 * @param {number} period - Period number
 * @param {object} transaction - Prisma transaction client
 * @returns {Promise<Array>} Array of conflicting schedules
 */
export async function checkClassPeriodConflicts(
  classId,
  dayOfWeek,
  period,
  transaction = prisma
) {
  // Find existing schedule for this class, day, and period
  const existingSchedule = await transaction.schedule.findFirst({
    where: {
      classId,
      dayOfWeek,
      period
    },
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
          section: true
        }
      }
    }
  });

  if (existingSchedule) {
    return [
      {
        type: "CLASS_PERIOD_CONFLICT",
        message: "Class already has a schedule for this day and period",
        existingSchedule: {
          dayOfWeek: existingSchedule.dayOfWeek,
          period: existingSchedule.period,
          startTime: existingSchedule.startTime,
          endTime: existingSchedule.endTime,
          room: existingSchedule.room,
          className: existingSchedule.class.name,
          grade: existingSchedule.class.grade,
          section: existingSchedule.class.section
        }
      }
    ];
  }

  return [];
}

/**
 * Check all schedule conflicts (teacher, room, and class-period)
 * This function should be called within a transaction for concurrency safety
 * 
 * @param {object} scheduleData - Schedule data to check
 * @param {string} scheduleData.classId - Class ID
 * @param {string} scheduleData.dayOfWeek - Day of week
 * @param {number} scheduleData.period - Period number
 * @param {string} scheduleData.startTime - Start time (HH:mm)
 * @param {string} scheduleData.endTime - End time (HH:mm)
 * @param {string} [scheduleData.room] - Room identifier (optional)
 * @param {object} transaction - Prisma transaction client
 * @returns {Promise<Array>} Array of all conflicts
 */
export async function checkAllConflicts(scheduleData, transaction = prisma) {
  const { classId, dayOfWeek, period, startTime, endTime, room } = scheduleData;

  // Run all three conflict checks in parallel within the transaction
  const [teacherConflicts, roomConflicts, classPeriodConflicts] = await Promise.all([
    checkTeacherConflicts(classId, dayOfWeek, startTime, endTime, transaction),
    checkRoomConflicts(room, dayOfWeek, startTime, endTime, classId, transaction),
    checkClassPeriodConflicts(classId, dayOfWeek, period, transaction)
  ]);

  // Combine all conflicts
  return [...teacherConflicts, ...roomConflicts, ...classPeriodConflicts];
}

/**
 * Create a schedule with conflict detection
 * Uses a serializable transaction to ensure concurrency safety
 * 
 * @param {object} scheduleData - Schedule data
 * @returns {Promise<object>} Created schedule or throws error with conflicts
 */
export async function createScheduleWithConflictCheck(scheduleData) {
  try {
    // Use an interactive transaction with serializable isolation level
    // This ensures that concurrent requests cannot create conflicting schedules
    const result = await prisma.$transaction(
      async (tx) => {
        // Check for conflicts
        const conflicts = await checkAllConflicts(scheduleData, tx);

        if (conflicts.length > 0) {
          // Throw error with conflict details
          const error = new Error("Schedule conflict detected");
          error.statusCode = 409;
          error.conflicts = conflicts;
          throw error;
        }

        // No conflicts - create the schedule
        const schedule = await tx.schedule.create({
          data: {
            classId: scheduleData.classId,
            dayOfWeek: scheduleData.dayOfWeek,
            period: scheduleData.period,
            startTime: scheduleData.startTime,
            endTime: scheduleData.endTime,
            room: scheduleData.room || null
          },
          include: {
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
          }
        });

        return schedule;
      },
      {
        isolationLevel: "Serializable", // Highest isolation level for conflict prevention
        maxWait: 5000, // Maximum time to wait for transaction to start (5 seconds)
        timeout: 10000 // Maximum time for transaction to complete (10 seconds)
      }
    );

    return result;
  } catch (error) {
    // Re-throw errors with conflict information
    throw error;
  }
}
