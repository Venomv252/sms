// Clean up Monday schedules for testing
// ⚠️ WARNING: This script deletes ALL Monday schedules
// DO NOT RUN IN PRODUCTION without explicit confirmation
import "dotenv/config";
import prisma from "./src/config/prisma.js";

async function cleanMondaySchedules() {
  // Safety check: Require explicit confirmation flag
  const confirmFlag = process.argv[2];
  
  if (confirmFlag !== "--confirm") {
    console.error("⚠️  SAFETY CHECK FAILED");
    console.error("");
    console.error("This script will DELETE ALL Monday schedules.");
    console.error("This is intended for TEST ENVIRONMENTS ONLY.");
    console.error("");
    console.error("To proceed, run:");
    console.error("  node clean-monday.js --confirm");
    console.error("");
    console.error("⚠️  DO NOT RUN IN PRODUCTION");
    process.exit(1);
  }

  // Additional safety: Check if NODE_ENV is production
  if (process.env.NODE_ENV === "production") {
    console.error("❌ BLOCKED: Cannot run in production environment");
    console.error("Set NODE_ENV to 'development' or 'test' to proceed");
    process.exit(1);
  }

  console.log("⚠️  WARNING: This will delete ALL Monday schedules");
  console.log("Environment:", process.env.NODE_ENV || "unknown");
  console.log("");
  console.log("Cleaning up Monday schedules for testing...\n");

  // Show what will be deleted
  const mondaySchedules = await prisma.schedule.findMany({
    where: { dayOfWeek: "MONDAY" },
    include: {
      class: {
        select: {
          name: true
        }
      }
    }
  });

  console.log(`Found ${mondaySchedules.length} MONDAY schedules:`);
  mondaySchedules.forEach((s) => {
    console.log(
      `  - ${s.class.name}, Period ${s.period}, ${s.startTime}-${s.endTime}, Room: ${s.room || "N/A"}`
    );
  });

  if (mondaySchedules.length > 0) {
    await prisma.schedule.deleteMany({
      where: { dayOfWeek: "MONDAY" }
    });
    console.log(`\n✓ Deleted ${mondaySchedules.length} schedules`);
  } else {
    console.log("\n No MONDAY schedules to clean");
  }

  console.log("\n✅ Cleanup complete!");
}

cleanMondaySchedules()
  .catch((error) => {
    console.error("Cleanup failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
