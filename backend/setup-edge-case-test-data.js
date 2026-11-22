// Setup script for edge case testing
import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "./src/config/prisma.js";

async function main() {
  const password = await bcrypt.hash("ChangeMe123!", 10);

  console.log("Setting up edge case test data...\n");

  // Get existing schools
  const school1 = await prisma.school.findUnique({
    where: { code: "DEMO-SCHOOL" }
  });

  const school2 = await prisma.school.findUnique({
    where: { code: "SCHOOL-2" }
  });

  // ============================
  // TEST 1: Second teacher in School 1
  // ============================
  const teacher2User = await prisma.user.upsert({
    where: { email: "teacher-math2@example.com" },
    update: { 
      schoolId: school1.id,
      role: "TEACHER",
      password 
    },
    create: {
      email: "teacher-math2@example.com",
      username: "teacher-math2",
      password,
      role: "TEACHER",
      schoolId: school1.id,
      firstName: "Second",
      lastName: "Teacher",
      teacher: {
        create: {
          employeeId: "EMP003",
          department: "English",
          designation: "English Teacher",
          phoneNumber: "9000000111",
        },
      },
    },
  });

  const teacher2 = await prisma.teacher.findUniqueOrThrow({
    where: { userId: teacher2User.id },
  });

  // Create subject and class for second teacher
  const subject2 = await prisma.subject.upsert({
    where: { code: "ENG101" },
    update: {
      name: "English",
      teacherId: teacher2.id,
    },
    create: {
      name: "English",
      code: "ENG101",
      teacherId: teacher2.id,
      credits: 1,
      description: "English Language",
    },
  });

  const class2 = await prisma.class.upsert({
    where: { id: "demo-class-10a-eng" },
    update: {
      name: "Class 10A English",
      grade: "10",
      section: "A",
      subjectId: subject2.id,
      teacherId: teacher2.id,
      academicYear: "2026-2027",
    },
    create: {
      id: "demo-class-10a-eng",
      name: "Class 10A English",
      grade: "10",
      section: "A",
      subjectId: subject2.id,
      teacherId: teacher2.id,
      academicYear: "2026-2027",
    },
  });

  // Create schedule for second teacher
  await prisma.schedule.upsert({
    where: { id: "schedule-teacher2-mon-2" },
    update: {},
    create: {
      id: "schedule-teacher2-mon-2",
      classId: class2.id,
      dayOfWeek: "MONDAY",
      period: 2,
      startTime: "10:00",
      endTime: "10:45",
      room: "Room 10A-Eng",
    },
  });

  console.log("✓ Created second teacher (teacher-math2@example.com) in School 1");

  // ============================
  // TEST 2: Student in different section
  // ============================
  const student2User = await prisma.user.upsert({
    where: { email: "student-10b@example.com" },
    update: { 
      schoolId: school1.id,
      role: "STUDENT",
      password 
    },
    create: {
      email: "student-10b@example.com",
      username: "student-10b",
      password,
      role: "STUDENT",
      schoolId: school1.id,
      firstName: "Section B",
      lastName: "Student",
      student: {
        create: {
          rollNumber: "STU-10B-001",
          grade: "10",
          section: "B",
          admissionNumber: "ADM-STU-10B-001",
          dateOfBirth: new Date("2010-06-15T00:00:00.000Z"),
          address: "Student 10B Address",
          phoneNumber: "9000000222",
          parentName: "Parent 10B",
          parentEmail: "parent-10b@example.com",
          parentPhone: "9000000333",
          bloodGroup: "B+",
        },
      },
    },
  });

  console.log("✓ Created student in Section B (student-10b@example.com)");

  // Create class for 10B
  const class10B = await prisma.class.upsert({
    where: { id: "demo-class-10b" },
    update: {
      name: "Class 10B Mathematics",
      grade: "10",
      section: "B",
      subjectId: subject2.id,
      teacherId: teacher2.id,
      academicYear: "2026-2027",
    },
    create: {
      id: "demo-class-10b",
      name: "Class 10B Mathematics",
      grade: "10",
      section: "B",
      subjectId: subject2.id,
      teacherId: teacher2.id,
      academicYear: "2026-2027",
    },
  });

  // Schedule for 10B
  await prisma.schedule.upsert({
    where: { id: "schedule-10b-tue-1" },
    update: {},
    create: {
      id: "schedule-10b-tue-1",
      classId: class10B.id,
      dayOfWeek: "TUESDAY",
      period: 1,
      startTime: "09:00",
      endTime: "09:45",
      room: "Room 10B",
    },
  });

  console.log("✓ Created schedule for Section 10B");

  // ============================
  // TEST 3: Parent without linked student
  // ============================
  const parentNoLinkUser = await prisma.user.upsert({
    where: { email: "parent-nolink@example.com" },
    update: {
      password,
      role: "PARENT",
      schoolId: school1.id,
    },
    create: {
      email: "parent-nolink@example.com",
      username: "parent-nolink",
      password,
      role: "PARENT",
      schoolId: school1.id,
      firstName: "Unlinked",
      lastName: "Parent",
    },
  });

  console.log("✓ Created parent with no linked students (parent-nolink@example.com)");

  // ============================
  // TEST 4: Parent linked to students in TWO schools
  // ============================
  
  // Get existing students
  const student1 = await prisma.student.findFirst({
    where: { 
      user: { 
        email: "student@example.com",
        schoolId: school1.id 
      } 
    }
  });

  const student2School2 = await prisma.student.findFirst({
    where: { 
      user: { 
        email: "student2@example.com",
        schoolId: school2.id 
      } 
    }
  });

  const parentMultiSchoolUser = await prisma.user.upsert({
    where: { email: "parent-multischool@example.com" },
    update: {
      password,
      role: "PARENT",
      schoolId: school1.id, // Assigned to school 1
    },
    create: {
      email: "parent-multischool@example.com",
      username: "parent-multischool",
      password,
      role: "PARENT",
      schoolId: school1.id,
      firstName: "MultiSchool",
      lastName: "Parent",
    },
  });

  // Link to student in School 1
  await prisma.parentStudent.upsert({
    where: { 
      parentUserId_studentId: { 
        parentUserId: parentMultiSchoolUser.id, 
        studentId: student1.id 
      } 
    },
    update: {},
    create: { 
      parentUserId: parentMultiSchoolUser.id, 
      studentId: student1.id 
    },
  });

  // Link to student in School 2
  await prisma.parentStudent.upsert({
    where: { 
      parentUserId_studentId: { 
        parentUserId: parentMultiSchoolUser.id, 
        studentId: student2School2.id 
      } 
    },
    update: {},
    create: { 
      parentUserId: parentMultiSchoolUser.id, 
      studentId: student2School2.id 
    },
  });

  console.log("✓ Created parent linked to students in BOTH schools (parent-multischool@example.com)");

  // ============================
  // TEST 6-8: Overlapping schedules
  // ============================

  // Get first teacher
  const teacher1 = await prisma.teacher.findFirst({
    where: { 
      user: { 
        email: "teacher@example.com" 
      } 
    }
  });

  // Create overlapping schedule - same teacher, same time (MONDAY 09:00-09:45)
  const class1Original = await prisma.class.findUnique({
    where: { id: "demo-class-10a" }
  });

  const conflictClass = await prisma.class.upsert({
    where: { id: "demo-class-conflict" },
    update: {
      name: "Class 10A Science",
      grade: "10",
      section: "A",
      subjectId: subject2.id,
      teacherId: teacher1.id,
      academicYear: "2026-2027",
    },
    create: {
      id: "demo-class-conflict",
      name: "Class 10A Science",
      grade: "10",
      section: "A",
      subjectId: subject2.id,
      teacherId: teacher1.id,
      academicYear: "2026-2027",
    },
  });

  // Overlapping teacher schedule (same teacher, overlapping time)
  await prisma.schedule.upsert({
    where: { id: "schedule-overlap-teacher" },
    update: {},
    create: {
      id: "schedule-overlap-teacher",
      classId: conflictClass.id,
      dayOfWeek: "MONDAY",
      period: 1,
      startTime: "09:00",
      endTime: "09:45",
      room: "Room Lab",
    },
  });

  // Overlapping room schedule (same room, same time)
  await prisma.schedule.upsert({
    where: { id: "schedule-overlap-room" },
    update: {},
    create: {
      id: "schedule-overlap-room",
      classId: class2.id,
      dayOfWeek: "MONDAY",
      period: 1,
      startTime: "09:00",
      endTime: "09:45",
      room: "Room 10A", // Same room as original
    },
  });

  // Duplicate period for same class
  await prisma.schedule.upsert({
    where: { id: "schedule-duplicate-period" },
    update: {},
    create: {
      id: "schedule-duplicate-period",
      classId: "demo-class-10a",
      dayOfWeek: "MONDAY",
      period: 1, // Same as original
      startTime: "14:00",
      endTime: "14:45",
      room: "Room Different",
    },
  });

  console.log("✓ Created overlapping schedules for conflict testing");

  console.log("\n====================================");
  console.log("Edge case test data setup complete!");
  console.log("====================================\n");
  
  console.log("Test Accounts Created:");
  console.log("  - teacher-math2@example.com (Second teacher, School 1)");
  console.log("  - student-10b@example.com (Student in Section B, School 1)");
  console.log("  - parent-nolink@example.com (Parent with no linked students)");
  console.log("  - parent-multischool@example.com (Parent linked to students in both schools)");
  console.log("\nAll passwords: ChangeMe123!");
}

main()
  .catch((error) => {
    console.error("Setup failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
