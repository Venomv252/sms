/**
 * Concurrency Test for Schedule Conflict Detection
 * Tests that simultaneous requests cannot create conflicting schedules
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
    return { success: true, status: response.status, id: response.data.data.id };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message
    };
  }
}

async function deleteSchedule(token, scheduleId) {
  try {
    await axios.delete(`${baseUrl}/schedules/${scheduleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    // Ignore cleanup errors
  }
}

async function runConcurrencyTest() {
  console.log("=".repeat(60));
  console.log("CONCURRENCY TEST - Simultaneous Conflict Detection");
  console.log("=".repeat(60));
  console.log("");

  const adminToken = await getToken("admin@example.com");

  // Test scenario: Two requests try to create conflicting schedules simultaneously
  const scheduleA = {
    classId: "demo-class-10a",
    dayOfWeek: "SUNDAY",
    period: 1,
    startTime: "08:00",
    endTime: "08:45",
    room: "Concurrency Test Room"
  };

  const scheduleB = {
    classId: "demo-class-10a",
    dayOfWeek: "SUNDAY",
    period: 1, // Same class, day, period - should conflict
    startTime: "08:15", // Overlapping time - should also conflict
    endTime: "09:00",
    room: "Concurrency Test Room 2"
  };

  console.log("TEST: Sending two conflicting schedule requests simultaneously...");
  console.log("Schedule A:", JSON.stringify(scheduleA, null, 2));
  console.log("Schedule B:", JSON.stringify(scheduleB, null, 2));
  console.log("");

  // Send both requests at the same time
  const [resultA, resultB] = await Promise.all([
    createSchedule(adminToken, scheduleA),
    createSchedule(adminToken, scheduleB)
  ]);

  console.log("=".repeat(60));
  console.log("RESULTS:");
  console.log("=".repeat(60));
  console.log("\nSchedule A Result:");
  console.log(`  Success: ${resultA.success}`);
  console.log(`  Status: ${resultA.status}`);
  if (resultA.success) {
    console.log(`  Created ID: ${resultA.id}`);
  } else {
    console.log(`  Message: ${resultA.message}`);
  }

  console.log("\nSchedule B Result:");
  console.log(`  Success: ${resultB.success}`);
  console.log(`  Status: ${resultB.status}`);
  if (resultB.success) {
    console.log(`  Created ID: ${resultB.id}`);
  } else {
    console.log(`  Message: ${resultB.message}`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("ANALYSIS:");
  console.log("=".repeat(60));

  const successCount = [resultA, resultB].filter((r) => r.success).length;
  const conflictCount = [resultA, resultB].filter(
    (r) => !r.success && r.status === 409
  ).length;

  console.log(`\nSuccessful creations: ${successCount}`);
  console.log(`Conflict rejections: ${conflictCount}`);

  let testPassed = false;
  let verdict = "";

  if (successCount === 1 && conflictCount === 1) {
    verdict = "✅ PASS - Exactly one schedule created, one rejected for conflict";
    testPassed = true;
  } else if (successCount === 0 && conflictCount === 2) {
    verdict =
      "⚠️  PASS (Conservative) - Both rejected due to serialization conflict";
    testPassed = true;
  } else if (successCount === 2) {
    verdict =
      "❌ FAIL - Both schedules created! Concurrency protection is NOT working!";
    testPassed = false;
  } else {
    verdict = `⚠️  UNEXPECTED - Success: ${successCount}, Conflicts: ${conflictCount}`;
    testPassed = false;
  }

  console.log(`\n${verdict}`);
  console.log("");

  if (testPassed) {
    console.log("✓ Concurrency protection is working correctly.");
    console.log(
      "  The database transaction isolation prevented duplicate schedules."
    );
  } else {
    console.log("✗ Concurrency protection FAILED!");
    console.log("  Multiple conflicting schedules were created simultaneously.");
  }

  // Cleanup
  console.log("\n" + "=".repeat(60));
  console.log("CLEANUP:");
  console.log("=".repeat(60));

  const createdIds = [resultA, resultB]
    .filter((r) => r.success)
    .map((r) => r.id);

  if (createdIds.length > 0) {
    console.log(`Cleaning up ${createdIds.length} schedule(s)...`);
    for (const id of createdIds) {
      await deleteSchedule(adminToken, id);
    }
    console.log("✓ Cleanup complete");
  } else {
    console.log("No schedules to clean up.");
  }

  return testPassed;
}

// Run the concurrency test multiple times to ensure consistency
async function runMultipleTests() {
  console.log("\n" + "=".repeat(60));
  console.log("RUNNING CONCURRENCY TEST 3 TIMES");
  console.log("=".repeat(60));
  console.log("");

  const results = [];

  for (let i = 1; i <= 3; i++) {
    console.log(`\n${"#".repeat(60)}`);
    console.log(`RUN ${i}/3`);
    console.log(`${"#".repeat(60)}\n`);

    const passed = await runConcurrencyTest();
    results.push(passed);

    // Wait a bit between runs
    if (i < 3) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("FINAL SUMMARY");
  console.log("=".repeat(60));

  const passCount = results.filter((r) => r).length;
  console.log(`\nTotal runs: ${results.length}`);
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${results.length - passCount}`);

  if (passCount === results.length) {
    console.log("\n🎉 ALL CONCURRENCY TESTS PASSED!");
    console.log("The system correctly prevents race conditions.\n");
    return true;
  } else {
    console.log(
      "\n⚠️  Some concurrency tests failed. Review the results above.\n"
    );
    return false;
  }
}

runMultipleTests()
  .then((allPassed) => {
    process.exit(allPassed ? 0 : 1);
  })
  .catch((error) => {
    console.error("\n❌ TEST ERROR:", error.message);
    process.exit(1);
  });
