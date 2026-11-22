// Clean up test duplicate schedules
// ⚠️ WARNING: This script deletes specific test schedule records
// DO NOT RUN IN PRODUCTION without explicit confirmation
import "dotenv/config";
import prisma from "./src/config/prisma.js";

async function cleanDuplicates() {
  // Safety check: Require explicit confirmation flag
  const confirmFlag = process.argv[2];
  
  if (confirmFlag !== "--confirm") {
    console.error("⚠️  SAFETY CHECK FAILED");
    console.error("");
    console.error("This script will DELETE specific test schedules.");
    console.error("This is intended for TEST ENVIRONMENTS ONLY.");
    console.error("");
    console.error("To proceed, run:");
    console.error("  node clean-test-duplicates.js --confirm");
    console.error("");
    console.error("⚠️  DO NOT RUN IN PRODUCTION");
    process.exit(1);
  }

  // Additional safety: Allowlist only development and test environments
  const allowedEnvironments = ["development", "test"];
  const currentEnv = process.env.NODE_ENV;
  
  if (!currentEnv || !allowedEnvironments.includes(currentEnv)) {
    console.error("❌ BLOCKED: Invalid or missing NODE_ENV");
    console.error("");
    console.error(`Current NODE_ENV: ${currentEnv || "(not set)"}`);
    console.error(`Allowed values: ${allowedEnvironments.join(", ")}`);
    console.error("");
    console.error("Set NODE_ENV to 'development' or 'test' to proceed");
    process.exit(1);
  }

  // Additional safety: Verify database target is approved for destructive operations
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error("❌ BLOCKED: DATABASE_URL is not configured");
    console.error("");
    console.error("Cannot verify database target");
    process.exit(1);
  }

  // Parse database connection to verify it's a safe target
  // Format: postgresql://user:pass@host:port/dbname?schema=...
  let dbHost, dbPort, dbName;
  
  try {
    const url = new URL(databaseUrl);
    dbHost = url.hostname;
    dbPort = url.port || "5432";
    dbName = url.pathname.substring(1).split("?")[0]; // Remove leading "/" and query params
  } catch (error) {
    console.error("❌ BLOCKED: Cannot parse DATABASE_URL");
    console.error("");
    console.error("Database connection string is malformed");
    process.exit(1);
  }

  // Validate protocol: Only PostgreSQL connections are permitted
  const url = new URL(databaseUrl);
  const allowedProtocols = ["postgresql:", "postgres:"];
  
  if (!allowedProtocols.includes(url.protocol)) {
    console.error("❌ BLOCKED: DATABASE_URL protocol is not approved");
    console.error("");
    console.error(`Current protocol: ${url.protocol}`);
    console.error(`Allowed protocols: ${allowedProtocols.join(", ")}`);
    console.error("");
    console.error("This script only works with PostgreSQL databases");
    process.exit(1);
  }

  // Allowlist: Only permit localhost/local development databases
  const safeHosts = ["localhost", "127.0.0.1", "::1"];
  const safePorts = ["5433"]; // Current verified local development port
  const safeDatabaseNames = ["sms_db"]; // Current verified local development database
  
  if (!safeHosts.includes(dbHost)) {
    console.error("❌ BLOCKED: Database host is not approved for destructive operations");
    console.error("");
    console.error(`Database host: ${dbHost}`);
    console.error(`Approved hosts: ${safeHosts.join(", ")}`);
    console.error("");
    console.error("This script can only run against local development databases");
    process.exit(1);
  }

  if (!safePorts.includes(dbPort)) {
    console.error("❌ BLOCKED: Database port is not approved for destructive operations");
    console.error("");
    console.error(`Database port: ${dbPort}`);
    console.error(`Approved ports: ${safePorts.join(", ")}`);
    console.error("");
    console.error("This script can only run against the verified local development port");
    process.exit(1);
  }

  if (!safeDatabaseNames.includes(dbName)) {
    console.error("❌ BLOCKED: Database name is not approved for destructive operations");
    console.error("");
    console.error(`Database name: ${dbName}`);
    console.error(`Approved names: ${safeDatabaseNames.join(", ")}`);
    console.error("");
    console.error("This script can only run against the verified local development database");
    process.exit(1);
  }

  console.log("⚠️  WARNING: This will delete specific test schedules");
  console.log("Environment:", currentEnv);
  console.log("Database host:", dbHost);
  console.log("Database port:", dbPort);
  console.log("Database name:", dbName);
  console.log("");
  console.log("Cleaning up test duplicate schedules...\n");

  // Delete the specific test schedules we created for edge case testing
  // These IDs follow the pattern "schedule-{purpose}-{type}" and are NOT UUIDs
  const testScheduleIds = [
    "schedule-overlap-teacher",
    "schedule-overlap-room",
    "schedule-duplicate-period"
  ];

  console.log(`Target schedule IDs (${testScheduleIds.length} total):`);
  testScheduleIds.forEach(id => console.log(`  - ${id}`));
  console.log("");

  // Query and display existing records before deletion
  console.log("Checking for existing test schedules...\n");
  
  const existingSchedules = [];
  for (const id of testScheduleIds) {
    try {
      const schedule = await prisma.schedule.findUnique({
        where: { id },
        include: {
          class: {
            select: {
              name: true,
              grade: true,
              section: true
            }
          }
        }
      });

      if (schedule) {
        existingSchedules.push({ id, schedule });
        console.log(`Found: ${id}`);
        console.log(`  Class: ${schedule.class.name} (${schedule.class.grade}-${schedule.class.section})`);
        console.log(`  Day: ${schedule.dayOfWeek}, Period: ${schedule.period}`);
        console.log(`  Time: ${schedule.startTime}-${schedule.endTime}`);
        console.log(`  Room: ${schedule.room || "N/A"}`);
        console.log("");
      }
    } catch (error) {
      console.log(`Error checking ${id}:`, error.message);
    }
  }

  if (existingSchedules.length === 0) {
    console.log("✓ No test schedules found - nothing to delete");
    console.log("");
    return;
  }

  console.log("━".repeat(70));
  console.log(`⚠️  ABOUT TO DELETE ${existingSchedules.length} SCHEDULE(S)`);
  console.log("⚠️  THIS ACTION IS PERMANENT AND CANNOT BE UNDONE");
  console.log("━".repeat(70));
  console.log("");

  // Perform deletions one by one
  let deletedCount = 0;
  let notFoundCount = testScheduleIds.length - existingSchedules.length;

  for (const id of testScheduleIds) {
    // Revalidate: Verify ID is still in the allowlist before deletion
    if (!testScheduleIds.includes(id)) {
      console.error(`  ❌ SECURITY ERROR: ID "${id}" not in allowlist - skipping`);
      continue;
    }

    try {
      await prisma.schedule.delete({
        where: { id }
      });
      console.log(`✓ Deleted: ${id}`);
      deletedCount++;
    } catch (error) {
      if (error.code === "P2025") {
        // Record not found - already counted in notFoundCount
        console.log(`  Skipped: ${id} (not found)`);
      } else {
        console.error(`  Error deleting ${id}:`, error.message);
      }
    }
  }

  console.log("");
  console.log("━".repeat(70));
  console.log("✅ Cleanup complete!");
  console.log("━".repeat(70));
  console.log(`   Deleted: ${deletedCount}`);
  console.log(`   Not found: ${notFoundCount}`);
  console.log(`   Total targeted: ${testScheduleIds.length}`);
  console.log("");
}

cleanDuplicates()
  .catch((error) => {
    console.error("\n❌ Cleanup failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
