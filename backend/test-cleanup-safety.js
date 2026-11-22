/**
 * Cleanup Script Safety Tests
 * Verifies that destructive cleanup scripts have proper safeguards
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testResults = [];

function recordTest(testName, expected, actual, result) {
  testResults.push({
    testName,
    expected,
    actual,
    result
  });
}

async function runScript(scriptName, args = [], env = {}) {
  return new Promise((resolve) => {
    const scriptPath = join(__dirname, scriptName);
    const processEnv = { ...process.env, ...env };
    
    const child = spawn("node", [scriptPath, ...args], {
      env: processEnv,
      cwd: __dirname
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      resolve({
        exitCode: code,
        stdout,
        stderr
      });
    });

    // Timeout after 5 seconds
    setTimeout(() => {
      child.kill();
      resolve({
        exitCode: -1,
        stdout,
        stderr: stderr + "\nTimeout: Process killed after 5 seconds"
      });
    }, 5000);
  });
}

async function runTests() {
  console.log("=".repeat(70));
  console.log("CLEANUP SCRIPT SAFETY TESTS");
  console.log("=".repeat(70));
  console.log("");
  console.log("Testing: clean-monday.js");
  console.log("These tests verify safety mechanisms without executing deletions.");
  console.log("");

  // ====================================================================
  // TEST 1: Script exits without --confirm flag
  // ====================================================================
  console.log("TEST 1: Run clean-monday.js without --confirm flag");
  console.log("-".repeat(70));

  const test1 = await runScript("clean-monday.js", []);

  const test1Pass = test1.exitCode === 1 && 
                    test1.stderr.includes("SAFETY CHECK FAILED") &&
                    test1.stderr.includes("--confirm");

  console.log(`Exit Code: ${test1.exitCode}`);
  console.log(`Contains "SAFETY CHECK FAILED": ${test1.stderr.includes("SAFETY CHECK FAILED")}`);
  console.log(`Contains "--confirm": ${test1.stderr.includes("--confirm")}`);
  console.log(`Contains "DO NOT RUN IN PRODUCTION": ${test1.stderr.includes("DO NOT RUN IN PRODUCTION")}`);
  console.log("");

  recordTest(
    "Without --confirm flag",
    "Exit code 1, shows safety warning",
    test1Pass ? "Blocked with warning" : `Exit ${test1.exitCode}, no proper warning`,
    test1Pass ? "PASS" : "FAIL"
  );

  // ====================================================================
  // TEST 2: Script blocks production environment (even with --confirm)
  // ====================================================================
  console.log("TEST 2: Run clean-monday.js with NODE_ENV=production");
  console.log("-".repeat(70));

  const test2 = await runScript("clean-monday.js", ["--confirm"], {
    NODE_ENV: "production"
  });

  const test2Pass = test2.exitCode === 1 &&
                    test2.stderr.includes("BLOCKED") &&
                    test2.stderr.includes("production");

  console.log(`Exit Code: ${test2.exitCode}`);
  console.log(`Contains "BLOCKED": ${test2.stderr.includes("BLOCKED")}`);
  console.log(`Contains "production": ${test2.stderr.includes("production")}`);
  console.log("");

  recordTest(
    "With NODE_ENV=production",
    "Exit code 1, blocks production",
    test2Pass ? "Blocked production execution" : `Exit ${test2.exitCode}, production not blocked`,
    test2Pass ? "PASS" : "FAIL"
  );

  // ====================================================================
  // TEST 3: Script shows warning even with --confirm in development
  // ====================================================================
  console.log("TEST 3: Verify warnings are shown with --confirm in development");
  console.log("-".repeat(70));
  console.log("Note: We will NOT actually run this to avoid deleting data");
  console.log("Instead, we verify the script structure.");
  console.log("");

  // Read the script to verify it has the right structure
  const fs = await import("fs");
  const scriptContent = fs.readFileSync(join(__dirname, "clean-monday.js"), "utf-8");

  const hasConfirmCheck = scriptContent.includes('confirmFlag !== "--confirm"');
  const hasProductionCheck = scriptContent.includes('NODE_ENV === "production"');
  const hasWarnings = scriptContent.includes("WARNING") && scriptContent.includes("DELETE");
  const showsSchedules = scriptContent.includes("findMany") && scriptContent.includes("MONDAY");

  console.log(`Has --confirm check: ${hasConfirmCheck}`);
  console.log(`Has NODE_ENV check: ${hasProductionCheck}`);
  console.log(`Has warnings: ${hasWarnings}`);
  console.log(`Shows schedules before deletion: ${showsSchedules}`);
  console.log("");

  const test3Pass = hasConfirmCheck && hasProductionCheck && hasWarnings && showsSchedules;

  recordTest(
    "Script structure verification",
    "All safety mechanisms present",
    test3Pass ? "All checks present" : "Some checks missing",
    test3Pass ? "PASS" : "FAIL"
  );

  // ====================================================================
  // TEST 4: Compare with clean-friday-schedules.js safety level
  // ====================================================================
  console.log("TEST 4: Compare safety mechanisms with clean-friday-schedules.js");
  console.log("-".repeat(70));

  const fridayContent = fs.readFileSync(join(__dirname, "clean-friday-schedules.js"), "utf-8");

  const mondayHasConfirm = scriptContent.includes('confirmFlag !== "--confirm"');
  const mondayHasEnvCheck = scriptContent.includes('NODE_ENV === "production"');
  const mondayHasWarning = scriptContent.includes("⚠️") || scriptContent.includes("WARNING");

  const fridayHasConfirm = fridayContent.includes('confirmFlag !== "--confirm"');
  const fridayHasEnvCheck = fridayContent.includes('NODE_ENV === "production"');
  const fridayHasWarning = fridayContent.includes("⚠️") || fridayContent.includes("WARNING");

  console.log("clean-monday.js:");
  console.log(`  --confirm check: ${mondayHasConfirm}`);
  console.log(`  NODE_ENV check: ${mondayHasEnvCheck}`);
  console.log(`  Warning messages: ${mondayHasWarning}`);
  console.log("");
  console.log("clean-friday-schedules.js:");
  console.log(`  --confirm check: ${fridayHasConfirm}`);
  console.log(`  NODE_ENV check: ${fridayHasEnvCheck}`);
  console.log(`  Warning messages: ${fridayHasWarning}`);
  console.log("");

  const test4Pass = mondayHasConfirm === fridayHasConfirm &&
                    mondayHasEnvCheck === fridayHasEnvCheck &&
                    mondayHasWarning === fridayHasWarning;

  recordTest(
    "Safety parity with clean-friday",
    "Equivalent or stronger safeguards",
    test4Pass ? "Equivalent safeguards" : "Different safety levels",
    test4Pass ? "PASS" : "FAIL"
  );

  // ====================================================================
  // SUMMARY
  // ====================================================================
  console.log("=".repeat(70));
  console.log("TEST RESULTS");
  console.log("=".repeat(70));
  console.log("\n");
  console.table(testResults);

  const passed = testResults.filter((t) => t.result === "PASS").length;
  const failed = testResults.filter((t) => t.result === "FAIL").length;
  const total = testResults.length;

  console.log("\n" + "=".repeat(70));
  console.log("SUMMARY");
  console.log("=".repeat(70));
  console.log(`Total Tests: ${total}`);
  console.log(`Passed: ${passed} ✓`);
  console.log(`Failed: ${failed} ${failed > 0 ? "✗" : ""}`);
  console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
  console.log("");

  if (failed === 0) {
    console.log("🎉 ALL SAFETY TESTS PASSED!");
    console.log("");
    console.log("Verified:");
    console.log("✓ Script requires --confirm flag");
    console.log("✓ Script blocks production environment");
    console.log("✓ Script shows warnings before deletion");
    console.log("✓ Safety level matches clean-friday-schedules.js");
    console.log("");
    console.log("clean-monday.js is now SAFE for use in test environments.");
  } else {
    console.log("⚠️  Some safety tests failed. Review results above.");
  }

  return failed === 0;
}

runTests()
  .then((passed) => {
    process.exit(passed ? 0 : 1);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
