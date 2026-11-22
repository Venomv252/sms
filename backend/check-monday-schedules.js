import "dotenv/config";
import prisma from "./src/config/prisma.js";

async function checkMonday() {
  const schedules = await prisma.schedule.findMany({
    where: { dayOfWeek: "MONDAY" },
    include: {
      class: {
        select: {
          name: true,
          grade: true,
          section: true,
          teacher: {
            select: {
              user: {
                select: { schoolId: true, firstName: true, lastName: true }
              }
            }
          }
        }
      }
    }
  });

  console.log(`Found ${schedules.length} MONDAY schedules:\n`);
  schedules.forEach(s => {
    console.log(`ID: ${s.id}`);
    console.log(`  Class: ${s.class.name}`);
    console.log(`  School: ${s.class.teacher.user.schoolId || 'N/A'}`);
    console.log(`  Period: ${s.period}`);
    console.log(`  Time: ${s.startTime}-${s.endTime}`);
    console.log(`  Room: ${s.room || 'N/A'}`);
    console.log('');
  });

  await prisma.$disconnect();
}

checkMonday();
