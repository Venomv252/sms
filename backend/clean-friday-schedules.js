// Clean up any existing Friday schedules for testing
// ⚠️ WARNING: This script deletes ALL Friday and Saturday schedules
// DO NOT RUN IN PRODUCTION without explicit confirmation
import "dotenv/config";
import prisma from "./src/config/prisma.js";

async function cleanFridaySchedules() {
  // Safety check: Require explicit confirmation flag
  const confirmFlag = process.argv[2];
  
  if (confirmFlag !== "--confirm") {
    console.error("⚠️  SAFETY CHECK FAILED");
    console.error("");
    console.error("This script will DELETE ALL Friday and Saturday schedules.");
    console.error("This is intended for TEST ENVIRONMENTS ONLY.");
    console.error("");
    console.error("To proceed, run:");
    console.error("  node clean-friday-schedules.js --confirm");
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

  console.log("⚠️  WARNING: This will delete ALL Friday and Saturday schedules");
  console.log("Environment:", process.env.NODE_ENV || "unknown");
  console.log("");
  console.log("Cleaning up existing FRIDAY schedules for testing...\n");

  const fridaySchedules = await prisma.schedule.findMany({
    where: { dayOfWeek: "FRIDAY" },
    include: {
      class: {
        select: {
          name: true
        }
      }
    }
  });

  console.log(`Found ${fridaySchedules.length} FRIDAY schedules:`);
  fridaySchedules.forEach((s) => {
    console.log(
      `  - ${s.class.name}, Period ${s.period}, ${s.startTime}-${s.endTime}, Room: ${s.room || "N/A"}`
    );
  });

  if (fridaySchedules.length > 0) {
    await prisma.schedule.deleteMany({
      where: { dayOfWeek: "FRIDAY" }
    });
    console.log(`\n✓ Deleted ${fridaySchedules.length} schedules`);
  } else {
    console.log("\n No FRIDAY schedules to clean");
  }

  // Also clean SATURDAY schedules
  const saturdaySchedules = await prisma.schedule.findMany({
    where: { dayOfWeek: "SATURDAY" }
  });

  if (saturdaySchedules.length > 0) {
    await prisma.schedule.deleteMany({
      where: { dayOfWeek: "SATURDAY" }
    });
    console.log(`✓ Deleted ${saturdaySchedules.length} SATURDAY schedules`);
  }

  // Also clean SUNDAY schedules (used in concurrency tests)
  const sundaySchedules = await prisma.schedule.findMany({
    where: { dayOfWeek: "SUNDAY" }
  });

  if (sundaySchedules.length > 0) {
    await prisma.schedule.deleteMany({
      where: { dayOfWeek: "SUNDAY" }
    });
    console.log(`✓ Deleted ${sundaySchedules.length} SUNDAY schedules`);
  }

  console.log("\n✅ Cleanup complete! Ready for testing.");
}

cleanFridaySchedules()
  .catch((error) => {
    console.error("Cleanup failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
