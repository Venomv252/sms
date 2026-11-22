/**
 * Comprehensive Conflict Detection Tests
 * Tests all three types of conflicts with various scenarios
 */

import "dotenv/config";
import axios from "axios";

const baseUrl = "http://localhost:5000/api";
const testResults = [];

// Helper to login and get token
async function getToken(email, password = "ChangeMe123!") {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password
    });
    return response.data.data.token;
  } catch (error) {
    console.error(`Login failed for ${email}`);
    throw error;
  }
}

// Helper to create schedule
async function createSchedule(token, scheduleData) {
  try {
    const response = await axios.post(`${baseUrl}/schedules`, scheduleData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, status: response.status, data: response.data };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      data: error.response?.data
    };
  }
}

// Helper to delete schedule (for cleanup)
async function deleteSchedule(scheduleId) {
  try {
    await axios.delete(`${baseUrl}/schedules/${scheduleId}`);
  } catch (error) {
    // Ignore errors during cleanup
  }
}

function recordTest(testNumber, testName, expected, actual, status, result) {
  testResults.push({
    testNumber,
    testName,
    expected,
    actual,
    status,
    result
  });
}

async function runTests() {
  console.log("=".repeat(60));
  console.log("SCHEDULE CONFLICT DETECTION TESTS");
  console.log("=".repeat(60));
  console.log("");

  // Get tokens
  const adminToken = await getToken("admin@example.com");
  const principalToken = await getToken("principal@example.com");

  let createdScheduleIds = [];

  try {
    // ====================================================================
    // TEST 1: Create base schedule (should succeed)
    // ====================================================================
    console.log("TEST 1: Create base schedule");
    const baseSchedule = {
      classId: "demo-class-10a",
      dayOfWeek: "FRIDAY",
      period: 1,
      startTime: "09:00",
      endTime: "09:45",
      room: "Room 101"
    };

    const test1 = await createSchedule(adminToken, baseSchedule);
    recordTest(
      "1",
      "Create base schedule",
      "201 Created",
      test1.success ? `201 Created` : `${test1.status} ${test1.data?.message}`,
      test1.status,
      test1.success && test1.status === 201 ? "PASS" : "FAIL"
    );

    if (test1.success) {
      createdScheduleIds.push(test1.data.data.id);
    }

    // ====================================================================
    // TEST 2: Teacher Overlapping Schedule (should fail - 409)
    // ====================================================================
    console.log("TEST 2: Teacher overlap conflict");
    const teacherOverlap = {
      classId: "demo-class-10a", // Same teacher
      dayOfWeek: "FRIDAY",
      period: 2,
      startTime: "09:30", // Overlaps with 09:00-09:45
      endTime: "10:15",
      room: "Room 102"
    };

    const test2 = await createSchedule(adminToken, teacherOverlap);
    const hasTeacherConflict =
      test2.data?.conflicts?.some((c) => c.type === "TEACHER_CONFLICT") || false;
    recordTest(
      "2",
      "Teacher time overlap",
      "409 Conflict (TEACHER_CONFLICT)",
      test2.success
        ? `${test2.status} Allowed (FAIL)`
        : `${test2.status} ${hasTeacherConflict ? "TEACHER_CONFLICT" : test2.data?.message}`,
      test2.status,
      !test2.success && test2.status === 409 && hasTeacherConflict ? "PASS" : "FAIL"
    );

    // ====================================================================
    // TEST 3: Room Overlapping Schedule (should fail - 409)
    // ====================================================================
    console.log("TEST 3: Room overlap conflict");
    const roomOverlap = {
      classId: "demo-class-10b", // Different class
      dayOfWeek: "FRIDAY",
      period: 3,
      startTime: "09:15", // Overlaps with Room 101: 09:00-09:45
      endTime: "10:00",
      room: "Room 101" // Same room
    };

    const test3 = await createSchedule(adminToken, roomOverlap);
    const hasRoomConflict =
      test3.data?.conflicts?.some((c) => c.type === "ROOM_CONFLICT") || false;
    recordTest(
      "3",
      "Room booking overlap",
      "409 Conflict (ROOM_CONFLICT)",
      test3.success
        ? `${test3.status} Allowed (FAIL)`
        : `${test3.status} ${hasRoomConflict ? "ROOM_CONFLICT" : test3.data?.message}`,
      test3.status,
      !test3.success && test3.status === 409 && hasRoomConflict ? "PASS" : "FAIL"
    );

    // ====================================================================
    // TEST 4: Class Period Duplicate (should fail - 409)
    // ====================================================================
    console.log("TEST 4: Class period duplicate");
    const periodDuplicate = {
      classId: "demo-class-10a", // Same class
      dayOfWeek: "FRIDAY", // Same day
      period: 1, // Same period
      startTime: "14:00", // Different time (shouldn't matter)
      endTime: "14:45",
      room: "Room 103"
    };

    const test4 = await createSchedule(adminToken, periodDuplicate);
    const hasPeriodConflict =
      test4.data?.conflicts?.some((c) => c.type === "CLASS_PERIOD_CONFLICT") ||
      false;
    recordTest(
      "4",
      "Class period duplicate",
      "409 Conflict (CLASS_PERIOD_CONFLICT)",
      test4.success
        ? `${test4.status} Allowed (FAIL)`
        : `${test4.status} ${hasPeriodConflict ? "CLASS_PERIOD_CONFLICT" : test4.data?.message}`,
      test4.status,
      !test4.success && test4.status === 409 && hasPeriodConflict ? "PASS" : "FAIL"
    );

    // ====================================================================
    // TEST 5: Adjacent schedule (should succeed)
    // ====================================================================
    console.log("TEST 5: Adjacent schedule (non-overlapping)");
    const adjacentSchedule = {
      classId: "demo-class-10a",
      dayOfWeek: "FRIDAY",
      period: 2,
      startTime: "09:45", // Starts exactly when previous ends
      endTime: "10:30",
      room: "Room 101"
    };

    const test5 = await createSchedule(adminToken, adjacentSchedule);
    recordTest(
      "5",
      "Adjacent schedule allowed",
      "201 Created",
      test5.success ? `201 Created` : `${test5.status} ${test5.data?.message}`,
      test5.status,
      test5.success && test5.status === 201 ? "PASS" : "FAIL"
    );

    if (test5.success) {
      createdScheduleIds.push(test5.data.data.id);
    }

    // ====================================================================
    // TEST 6: Non-overlapping schedule (should succeed)
    // ====================================================================
    console.log("TEST 6: Non-overlapping schedule");
    const nonOverlapping = {
      classId: "demo-class-10a",
      dayOfWeek: "FRIDAY",
      period: 3,
      startTime: "11:00",
      endTime: "11:45",
      room: "Room 101"
    };

    const test6 = await createSchedule(adminToken, nonOverlapping);
    recordTest(
      "6",
      "Non-overlapping schedule",
      "201 Created",
      test6.success ? `201 Created` : `${test6.status} ${test6.data?.message}`,
      test6.status,
      test6.success && test6.status === 201 ? "PASS" : "FAIL"
    );

    if (test6.success) {
      createdScheduleIds.push(test6.data.data.id);
    }

    // ====================================================================
    // TEST 7: Different teachers same time (should succeed)
    // ====================================================================
    console.log("TEST 7: Different teachers, same time, different rooms");
    const differentTeacher = {
      classId: "demo-class-10a-eng", // Different class/teacher
      dayOfWeek: "FRIDAY",
      period: 4,
      startTime: "09:00", // Same time as test 1
      endTime: "09:45",
      room: "Room 201" // Different room
    };

    const test7 = await createSchedule(adminToken, differentTeacher);
    recordTest(
      "7",
      "Different teachers simultaneous",
      "201 Created",
      test7.success ? `201 Created` : `${test7.status} ${test7.data?.message}`,
      test7.status,
      test7.success && test7.status === 201 ? "PASS" : "FAIL"
    );

    if (test7.success) {
      createdScheduleIds.push(test7.data.data.id);
    }

    // ====================================================================
    // TEST 8: Different rooms same time (should succeed)
    // ====================================================================
    console.log("TEST 8: Different rooms, same time");
    const differentRoom = {
      classId: "school2-class-9b", // Use School 2 class (completely different teacher/school)
      dayOfWeek: "FRIDAY",
      period: 5,
      startTime: "09:00", // Same time as test 1
      endTime: "09:45",
      room: "Room 301" // Different room
    };

    const test8 = await createSchedule(adminToken, differentRoom);
    recordTest(
      "8",
      "Different rooms simultaneous",
      "201 Created",
      test8.success ? `201 Created` : `${test8.status} ${test8.data?.message}`,
      test8.status,
      test8.success && test8.status === 201 ? "PASS" : "FAIL"
    );

    if (test8.success) {
      createdScheduleIds.push(test8.data.data.id);
    }

    // ====================================================================
    // TEST 9: Same teacher two classes simultaneously (should fail)
    // ====================================================================
    console.log("TEST 9: Same teacher, two classes, same time");
    const sameTeacherConflict = {
      classId: "demo-class-10a-eng", // Different class, SAME teacher as demo-class-10a
      dayOfWeek: "FRIDAY",
      period: 6,
      startTime: "09:00", // Conflicts with base schedule
      endTime: "09:45",
      room: "Room 401"
    };

    const test9 = await createSchedule(adminToken, sameTeacherConflict);
    const hasTest9Conflict =
      test9.data?.conflicts?.some((c) => c.type === "TEACHER_CONFLICT") || false;
    recordTest(
      "9",
      "Same teacher double-booked",
      "409 Conflict (TEACHER_CONFLICT)",
      test9.success
        ? `${test9.status} Allowed (FAIL)`
        : `${test9.status} ${hasTest9Conflict ? "TEACHER_CONFLICT" : test9.data?.message}`,
      test9.status,
      !test9.success && test9.status === 409 && hasTest9Conflict ? "PASS" : "FAIL"
    );

    // ====================================================================
    // TEST 10: Multiple conflicts in one request
    // ====================================================================
    console.log("TEST 10: Multiple conflicts (teacher + room + period)");
    const multipleConflicts = {
      classId: "demo-class-10a", // Same class (period conflict)
      dayOfWeek: "FRIDAY",
      period: 1, // Period conflict
      startTime: "09:15", // Time overlap (teacher conflict)
      endTime: "10:00",
      room: "Room 101" // Room conflict
    };

    const test10 = await createSchedule(adminToken, multipleConflicts);
    const conflictCount = test10.data?.conflicts?.length || 0;
    recordTest(
      "10",
      "Multiple conflicts reported",
      "409 with multiple conflict types",
      test10.success
        ? `${test10.status} Allowed (FAIL)`
        : `${test10.status} with ${conflictCount} conflicts`,
      test10.status,
      !test10.success && test10.status === 409 && conflictCount >= 2 ? "PASS" : "FAIL"
    );

    // ====================================================================
    // TEST 11: Role permissions unchanged (PRINCIPAL can create)
    // ====================================================================
    console.log("TEST 11: PRINCIPAL role can still create schedules");
    const principalSchedule = {
      classId: "demo-class-10a",
      dayOfWeek: "SATURDAY",
      period: 1,
      startTime: "08:00",
      endTime: "08:45",
      room: "Room 501"
    };

    const test11 = await createSchedule(principalToken, principalSchedule);
    recordTest(
      "11",
      "PRINCIPAL permissions intact",
      "201 Created",
      test11.success ? `201 Created` : `${test11.status} ${test11.data?.message}`,
      test11.status,
      test11.success && test11.status === 201 ? "PASS" : "FAIL"
    );

    if (test11.success) {
      createdScheduleIds.push(test11.data.data.id);
    }

    // ====================================================================
    // TEST 12: Cross-school isolation intact
    // ====================================================================
    console.log("TEST 12: Cross-school isolation");
    // Principal of School 1 should not be able to create for School 2 classes
    const crossSchoolAttempt = {
      classId: "school2-class-9b", // School 2 class
      dayOfWeek: "SATURDAY",
      period: 2,
      startTime: "09:00",
      endTime: "09:45",
      room: "Room 601"
    };

    const test12 = await createSchedule(principalToken, crossSchoolAttempt);
    recordTest(
      "12",
      "Cross-school isolation",
      "404 Not Found",
      test12.success
        ? `${test12.status} Created (FAIL - security breach)`
        : `${test12.status} ${test12.data?.message}`,
      test12.status,
      !test12.success && test12.status === 404 ? "PASS" : "FAIL"
    );

    console.log("\n" + "=".repeat(60));
    console.log("TEST RESULTS");
    console.log("=".repeat(60));

    // Display results
    console.log("\n");
    console.table(testResults);

    // Summary
    const passed = testResults.filter((t) => t.result === "PASS").length;
    const failed = testResults.filter((t) => t.result === "FAIL").length;
    const total = testResults.length;

    console.log("\n" + "=".repeat(60));
    console.log("SUMMARY");
    console.log("=".repeat(60));
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed} ✓`);
    console.log(`Failed: ${failed} ${failed > 0 ? "✗" : ""}`);
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    console.log("");

    if (failed === 0) {
      console.log("🎉 ALL TESTS PASSED!");
    } else {
      console.log("⚠️  Some tests failed. Review results above.");
    }
  } catch (error) {
    console.error("\n❌ TEST EXECUTION ERROR:");
    console.error(error.message);
    if (error.response) {
      console.error("Response:", error.response.data);
    }
  } finally {
    // Cleanup: Delete created test schedules
    console.log("\n" + "=".repeat(60));
    console.log("CLEANUP");
    console.log("=".repeat(60));
    console.log(`Cleaning up ${createdScheduleIds.length} test schedules...`);

    for (const id of createdScheduleIds) {
      await deleteSchedule(id);
    }

    console.log("✓ Cleanup complete");
  }
}

// Run tests
runTests()
  .then(() => {
    process.exit(testResults.every((t) => t.result === "PASS") ? 0 : 1);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
