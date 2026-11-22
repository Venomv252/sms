/**
 * Cross-School Room Conflict Regression Test
 * 
 * Verifies that rooms with the same name in different schools do NOT conflict.
 * This is a regression test for the bug where room conflicts were not scoped to schools.
 */

import "dotenv/config";
import axios from "axios";

const baseUrl = "http://localhost:5000/api";

async function getToken(email, password = "ChangeMe123!") {
  const response = await axios.post(`${baseUrl}/auth/login`, {
    email,
    password
  });
  return response.data.data.token;
}

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

async function deleteSchedule(token, scheduleId) {
  try {
    await axios.delete(`${baseUrl}/schedules/${scheduleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    return false;
  }
}

async function runCrossSchoolRoomTest() {
  console.log("=".repeat(70));
  console.log("CROSS-SCHOOL ROOM CONFLICT REGRESSION TEST");
  console.log("=".repeat(70));
  console.log("");
  console.log("This test verifies that rooms with the same name in different");
  console.log("schools do NOT conflict with each other.");
  console.log("");

  const adminToken = await getToken("admin@example.com");
  const createdScheduleIds = [];
  let allTestsPassed = true;

  try {
    // ====================================================================
    // TEST 1: School 1 creates schedule in "Room 101"
    // ====================================================================
    console.log("TEST 1: School 1 creates schedule in Room 101");
    console.log("-".repeat(70));
    
    const school1Schedule = {
      classId: "demo-class-10a", // School 1 class
      dayOfWeek: "MONDAY",
      period: 1,
      startTime: "09:00",
      endTime: "09:45",
      room: "Room 101"
    };

    const test1 = await createSchedule(adminToken, school1Schedule);
    
    if (test1.success && test1.status === 201) {
      console.log("✓ PASS: School 1 schedule created successfully");
      console.log(`  Schedule ID: ${test1.data.data.id}`);
      createdScheduleIds.push(test1.data.data.id);
    } else {
      console.log("✗ FAIL: Could not create School 1 schedule");
      console.log(`  Status: ${test1.status}`);
      console.log(`  Message: ${test1.data?.message}`);
      allTestsPassed = false;
    }
    console.log("");

    // ====================================================================
    // TEST 2: School 2 creates schedule in "Room 101" at SAME TIME
    // ====================================================================
    console.log("TEST 2: School 2 creates schedule in Room 101 (same time)");
    console.log("-".repeat(70));
    console.log("Expected: 201 (should succeed - different school)");
    
    const school2Schedule = {
      classId: "school2-class-9b", // School 2 class
      dayOfWeek: "MONDAY",
      period: 1,
      startTime: "09:00", // Same time as School 1
      endTime: "09:45",
      room: "Room 101" // Same room name
    };

    const test2 = await createSchedule(adminToken, school2Schedule);
    
    if (test2.success && test2.status === 201) {
      console.log("✓ PASS: School 2 schedule created successfully");
      console.log("  Different schools CAN use the same room name simultaneously");
      console.log(`  Schedule ID: ${test2.data.data.id}`);
      createdScheduleIds.push(test2.data.data.id);
    } else if (test2.status === 409) {
      console.log("✗ FAIL: School 2 schedule rejected with 409 conflict");
      console.log("  BUG: Room conflicts are crossing school boundaries!");
      console.log(`  Conflicts: ${JSON.stringify(test2.data?.conflicts, null, 2)}`);
      allTestsPassed = false;
    } else {
      console.log("✗ FAIL: Unexpected error creating School 2 schedule");
      console.log(`  Status: ${test2.status}`);
      console.log(`  Message: ${test2.data?.message}`);
      allTestsPassed = false;
    }
    console.log("");

    // ====================================================================
    // TEST 3: School 1 tries to create ANOTHER schedule in "Room 101" at overlapping time
    // ====================================================================
    console.log("TEST 3: School 1 creates ANOTHER schedule in Room 101 (overlapping)");
    console.log("-".repeat(70));
    console.log("Expected: 409 (should fail - same school, overlapping time)");
    
    const school1Conflict = {
      classId: "demo-class-10b", // Different class, but same school (School 1)
      dayOfWeek: "MONDAY",
      period: 2,
      startTime: "09:30", // Overlaps with 09:00-09:45
      endTime: "10:15",
      room: "Room 101"
    };

    const test3 = await createSchedule(adminToken, school1Conflict);
    
    if (!test3.success && test3.status === 409) {
      const hasRoomConflict = test3.data?.conflicts?.some(c => c.type === "ROOM_CONFLICT");
      if (hasRoomConflict) {
        console.log("✓ PASS: School 1 schedule correctly rejected (ROOM_CONFLICT)");
        console.log("  Same school room conflicts are properly detected");
      } else {
        console.log("⚠ PARTIAL: Rejected with 409, but not ROOM_CONFLICT");
        console.log(`  Conflicts: ${JSON.stringify(test3.data?.conflicts, null, 2)}`);
      }
    } else if (test3.success) {
      console.log("✗ FAIL: School 1 conflicting schedule was created!");
      console.log("  BUG: Room conflicts within the same school are not detected!");
      console.log(`  Schedule ID: ${test3.data.data.id}`);
      createdScheduleIds.push(test3.data.data.id);
      allTestsPassed = false;
    } else {
      console.log("✗ FAIL: Unexpected error");
      console.log(`  Status: ${test3.status}`);
      console.log(`  Message: ${test3.data?.message}`);
      allTestsPassed = false;
    }
    console.log("");

    // ====================================================================
    // TEST 4: School 2 tries to create ANOTHER schedule in "Room 101" at overlapping time
    // ====================================================================
    console.log("TEST 4: School 2 creates ANOTHER schedule in Room 101 (overlapping)");
    console.log("-".repeat(70));
    console.log("Expected: 409 (should fail - same school, overlapping time)");
    
    const school2Conflict = {
      classId: "school2-class-9b", // Same class, different period (School 2)
      dayOfWeek: "MONDAY",
      period: 2,
      startTime: "09:15", // Overlaps with School 2's 09:00-09:45
      endTime: "10:00",
      room: "Room 101"
    };

    const test4 = await createSchedule(adminToken, school2Conflict);
    
    if (!test4.success && test4.status === 409) {
      const hasRoomConflict = test4.data?.conflicts?.some(c => c.type === "ROOM_CONFLICT");
      if (hasRoomConflict) {
        console.log("✓ PASS: School 2 schedule correctly rejected (ROOM_CONFLICT)");
        console.log("  Same school room conflicts are properly detected");
      } else {
        console.log("⚠ PARTIAL: Rejected with 409, but not ROOM_CONFLICT");
        console.log(`  Conflicts: ${JSON.stringify(test4.data?.conflicts, null, 2)}`);
      }
    } else if (test4.success) {
      console.log("✗ FAIL: School 2 conflicting schedule was created!");
      console.log("  BUG: Room conflicts within the same school are not detected!");
      console.log(`  Schedule ID: ${test4.data.data.id}`);
      createdScheduleIds.push(test4.data.data.id);
      allTestsPassed = false;
    } else {
      console.log("✗ FAIL: Unexpected error");
      console.log(`  Status: ${test4.status}`);
      console.log(`  Message: ${test4.data?.message}`);
      allTestsPassed = false;
    }
    console.log("");

    // ====================================================================
    // SUMMARY
    // ====================================================================
    console.log("=".repeat(70));
    console.log("TEST SUMMARY");
    console.log("=".repeat(70));
    
    if (allTestsPassed) {
      console.log("✓ ALL TESTS PASSED");
      console.log("");
      console.log("✓ Different schools can use the same room name simultaneously");
      console.log("✓ Same school room conflicts are properly detected");
      console.log("");
      console.log("🎉 Cross-school room conflict bug is FIXED!");
    } else {
      console.log("✗ SOME TESTS FAILED");
      console.log("");
      console.log("⚠️  There are issues with cross-school room conflict detection.");
      console.log("   Review the test results above for details.");
    }
    console.log("");

  } catch (error) {
    console.error("\n❌ TEST ERROR:", error.message);
    allTestsPassed = false;
  } finally {
    // Cleanup
    if (createdScheduleIds.length > 0) {
      console.log("=".repeat(70));
      console.log("CLEANUP");
      console.log("=".repeat(70));
      console.log(`Cleaning up ${createdScheduleIds.length} test schedules...`);
      
      for (const id of createdScheduleIds) {
        const deleted = await deleteSchedule(adminToken, id);
        if (deleted) {
          console.log(`✓ Deleted schedule: ${id}`);
        } else {
          console.log(`⚠ Could not delete schedule: ${id}`);
        }
      }
      console.log("✓ Cleanup complete");
      console.log("");
    }
  }

  return allTestsPassed;
}

// Run the test
runCrossSchoolRoomTest()
  .then((passed) => {
    process.exit(passed ? 0 : 1);
  })
  .catch((error) => {
    console.error("\n❌ FATAL ERROR:", error.message);
    process.exit(1);
  });
