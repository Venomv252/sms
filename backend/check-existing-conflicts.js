// Check for existing scheduling conflicts before applying migration
import "dotenv/config";
import prisma from "./src/config/prisma.js";

async function checkExistingConflicts() {
  console.log("Checking for existing scheduling conflicts...\n");

  // Check for class-period duplicates
  const allSchedules = await prisma.schedule.findMany({
    orderBy: [
      { classId: "asc" },
      { dayOfWeek: "asc" },
      { period: "asc" }
    ],
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

  // Group by classId-dayOfWeek-period
  const groups = {};
  allSchedules.forEach((schedule) => {
    const key = `${schedule.classId}-${schedule.dayOfWeek}-${schedule.period}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(schedule);
  });

  // Find duplicates
  const duplicates = Object.entries(groups).filter(
    ([_, schedules]) => schedules.length > 1
  );

  if (duplicates.length > 0) {
    console.log("⚠️  FOUND DUPLICATE CLASS-DAY-PERIOD COMBINATIONS:");
    console.log("These must be resolved before applying the migration.\n");

    duplicates.forEach(([key, schedules]) => {
      const first = schedules[0];
      console.log(`Class: ${first.class.name} (${first.class.grade}${first.class.section})`);
      console.log(`Day: ${first.dayOfWeek}, Period: ${first.period}`);
      console.log(`Duplicate schedules:`);
      schedules.forEach((s) => {
        console.log(
          `  - ID: ${s.id}, Time: ${s.startTime}-${s.endTime}, Room: ${s.room || "N/A"}`
        );
      });
      console.log("");
    });

    console.log("ACTION REQUIRED:");
    console.log("1. Review the duplicates above");
    console.log("2. Decide which schedules to keep");
    console.log("3. Delete duplicate schedules manually");
    console.log(
      "4. Then apply the migration: npx prisma migrate dev\n"
    );

    return false;
  } else {
    console.log("✅ No class-period duplicates found!");
    console.log("Safe to apply migration.\n");
    return true;
  }
}

checkExistingConflicts()
  .then((canProceed) => {
    process.exitCode = canProceed ? 0 : 1;
  })
  .catch((error) => {
    console.error("Error checking conflicts:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
