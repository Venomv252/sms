// Verify teacher-class assignments
import "dotenv/config";
import prisma from "./src/config/prisma.js";

async function main() {
  console.log("=".repeat(60));
  console.log("VERIFYING TEACHER-CLASS ASSIGNMENTS");
  console.log("=".repeat(60));
  console.log("");

  // Get Teacher 1 details
  const teacher1 = await prisma.teacher.findFirst({
    where: {
      user: { email: "teacher@example.com" }
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          schoolId: true
        }
      }
    }
  });

  console.log("TEACHER 1 (Math):");
  console.log(`  User ID: ${teacher1.user.id}`);
  console.log(`  Email: ${teacher1.user.email}`);
  console.log(`  School ID: ${teacher1.user.schoolId}`);
  console.log("");

  // Get all classes assigned to Teacher 1
  const teacher1Classes = await prisma.class.findMany({
    where: {
      teacherId: teacher1.id
    },
    include: {
      subject: {
        select: {
          name: true,
          code: true
        }
      }
    }
  });

  console.log(`  Classes assigned to Teacher 1: ${teacher1Classes.length}`);
  teacher1Classes.forEach(c => {
    console.log(`    - ${c.name} (${c.grade}${c.section}) - ${c.subject.name}`);
  });
  console.log("");

  // Get Teacher 2 details
  const teacher2 = await prisma.teacher.findFirst({
    where: {
      user: { email: "teacher-math2@example.com" }
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          schoolId: true
        }
      }
    }
  });

  console.log("TEACHER 2 (English):");
  console.log(`  User ID: ${teacher2.user.id}`);
  console.log(`  Email: ${teacher2.user.email}`);
  console.log(`  School ID: ${teacher2.user.schoolId}`);
  console.log("");

  // Get all classes assigned to Teacher 2
  const teacher2Classes = await prisma.class.findMany({
    where: {
      teacherId: teacher2.id
    },
    include: {
      subject: {
        select: {
          name: true,
          code: true
        }
      }
    }
  });

  console.log(`  Classes assigned to Teacher 2: ${teacher2Classes.length}`);
  teacher2Classes.forEach(c => {
    console.log(`    - ${c.name} (${c.grade}${c.section}) - ${c.subject.name}`);
  });
  console.log("");

  // Get all schedules and their class-teacher relationships
  console.log("=".repeat(60));
  console.log("ALL SCHEDULES WITH TEACHER ASSIGNMENTS:");
  console.log("=".repeat(60));
  console.log("");

  const schedules = await prisma.schedule.findMany({
    where: {
      class: {
        teacher: {
          user: {
            schoolId: teacher1.user.schoolId
          }
        }
      }
    },
    include: {
      class: {
        include: {
          subject: {
            select: {
              name: true
            }
          },
          teacher: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true
                }
              }
            }
          }
        }
      }
    },
    orderBy: [
      { dayOfWeek: "asc" },
      { period: "asc" }
    ]
  });

  console.log(`Total schedules in School 1: ${schedules.length}`);
  console.log("");

  schedules.forEach(s => {
    const teacherName = `${s.class.teacher.user.firstName} ${s.class.teacher.user.lastName}`;
    const isTeacher1 = s.class.teacher.user.id === teacher1.user.id;
    const marker = isTeacher1 ? "📚 T1" : "📘 T2";
    
    console.log(`${marker} ${s.dayOfWeek} P${s.period} (${s.startTime}-${s.endTime})`);
    console.log(`   Class: ${s.class.name} (${s.class.grade}${s.class.section})`);
    console.log(`   Subject: ${s.class.subject.name}`);
    console.log(`   Teacher: ${teacherName} (${s.class.teacher.user.email})`);
    console.log(`   Room: ${s.room || 'N/A'}`);
    console.log("");
  });

  console.log("=".repeat(60));
  console.log("ANALYSIS:");
  console.log("=".repeat(60));
  
  const teacher1Schedules = schedules.filter(s => s.class.teacher.user.id === teacher1.user.id);
  const teacher2Schedules = schedules.filter(s => s.class.teacher.user.id === teacher2.user.id);
  
  console.log(`Schedules for Teacher 1: ${teacher1Schedules.length}`);
  console.log(`Schedules for Teacher 2: ${teacher2Schedules.length}`);
  console.log("");
  
  console.log("When Teacher 1 queries /api/schedules:");
  console.log("  Filter: class.teacher.userId = Teacher1.userId");
  console.log(`  Expected to return: ${teacher1Schedules.length} schedules`);
  console.log("");
  
  console.log("Schedules Teacher 1 SHOULD see:");
  teacher1Schedules.forEach(s => {
    console.log(`  ✓ ${s.dayOfWeek} P${s.period} - ${s.class.name}`);
  });
}

main()
  .catch((error) => {
    console.error("Verification failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
