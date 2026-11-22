// Setup script for cross-school testing
import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "./src/config/prisma.js";

async function main() {
  const password = await bcrypt.hash("ChangeMe123!", 10);

  // Create second school
  const school2 = await prisma.school.upsert({
    where: { code: "SCHOOL-2" },
    update: { name: "Riverside Academy" },
    create: { code: "SCHOOL-2", name: "Riverside Academy" },
  });

  console.log("Created School 2:", school2.name);

  // Create teacher for school 2
  const teacher2User = await prisma.user.upsert({
    where: { email: "teacher2@example.com" },
    update: { 
      schoolId: school2.id,
      role: "TEACHER",
      password 
    },
    create: {
      email: "teacher2@example.com",
      username: "teacher2",
      password,
      role: "TEACHER",
      schoolId: school2.id,
      firstName: "School2",
      lastName: "Teacher",
      teacher: {
        create: {
          employeeId: "EMP002",
          department: "Science",
          designation: "Science Teacher",
          phoneNumber: "9000000011",
        },
      },
    },
  });

  const teacher2 = await prisma.teacher.findUniqueOrThrow({
    where: { userId: teacher2User.id },
  });

  // Create student for school 2
  const student2User = await prisma.user.upsert({
    where: { email: "student2@example.com" },
    update: { 
      schoolId: school2.id,
      role: "STUDENT",
      password 
    },
    create: {
      email: "student2@example.com",
      username: "student2",
      password,
      role: "STUDENT",
      schoolId: school2.id,
      firstName: "School2",
      lastName: "Student",
      student: {
        create: {
          rollNumber: "STU002",
          grade: "9",
          section: "B",
          admissionNumber: "ADM-STU-002",
          dateOfBirth: new Date("2011-05-15T00:00:00.000Z"),
          address: "School 2 Address",
          phoneNumber: "9000000022",
          parentName: "School2 Parent",
          parentEmail: "parent2@example.com",
          parentPhone: "9000000033",
          bloodGroup: "A+",
        },
      },
    },
  });

  const student2 = await prisma.student.findUniqueOrThrow({
    where: { userId: student2User.id },
  });

  // Create parent for school 2
  const parent2User = await prisma.user.upsert({
    where: { email: "parent2@example.com" },
    update: {
      password,
      role: "PARENT",
      schoolId: school2.id,
    },
    create: {
      email: "parent2@example.com",
      username: "parent2",
      password,
      role: "PARENT",
      schoolId: school2.id,
      firstName: "School2",
      lastName: "Parent",
    },
  });

  // Link parent to student
  await prisma.parentStudent.upsert({
    where: { 
      parentUserId_studentId: { 
        parentUserId: parent2User.id, 
        studentId: student2.id 
      } 
    },
    update: {},
    create: { parentUserId: parent2User.id, studentId: student2.id },
  });

  // Create subject for school 2
  const subject2 = await prisma.subject.upsert({
    where: { code: "SCI101" },
    update: {
      name: "Science",
      teacherId: teacher2.id,
    },
    create: {
      name: "Science",
      code: "SCI101",
      teacherId: teacher2.id,
      credits: 1,
      description: "General Science",
    },
  });

  // Create class for school 2
  const class2 = await prisma.class.upsert({
    where: { id: "school2-class-9b" },
    update: {
      name: "Class 9B Science",
      grade: "9",
      section: "B",
      subjectId: subject2.id,
      teacherId: teacher2.id,
      academicYear: "2026-2027",
    },
    create: {
      id: "school2-class-9b",
      name: "Class 9B Science",
      grade: "9",
      section: "B",
      subjectId: subject2.id,
      teacherId: teacher2.id,
      academicYear: "2026-2027",
    },
  });

  // Create schedule for school 2
  const existingSchedule2 = await prisma.schedule.findFirst({
    where: {
      classId: class2.id,
      dayOfWeek: "TUESDAY",
      period: 1,
    },
  });

  if (!existingSchedule2) {
    await prisma.schedule.create({
      data: {
        classId: class2.id,
        dayOfWeek: "TUESDAY",
        period: 1,
        startTime: "09:00",
        endTime: "09:45",
        room: "Room 9B",
      },
    });
  }

  // Create PRINCIPAL for school 2
  await prisma.user.upsert({
    where: { email: "principal2@example.com" },
    update: {
      password,
      role: "PRINCIPAL",
      schoolId: school2.id,
    },
    create: {
      email: "principal2@example.com",
      username: "principal2",
      password,
      role: "PRINCIPAL",
      schoolId: school2.id,
      firstName: "School2",
      lastName: "Principal",
    },
  });

  // Create MANAGEMENT for school 2
  await prisma.user.upsert({
    where: { email: "management2@example.com" },
    update: {
      password,
      role: "MANAGEMENT",
      schoolId: school2.id,
    },
    create: {
      email: "management2@example.com",
      username: "management2",
      password,
      role: "MANAGEMENT",
      schoolId: school2.id,
      firstName: "School2",
      lastName: "Management",
    },
  });

  console.log("Cross-school test data created successfully!");
  console.log("\nSchool 1 (DEMO-SCHOOL): Greenwood High School");
  console.log("  - Class: demo-class-10a (Grade 10, Section A)");
  console.log("  - Schedule: MONDAY period 1");
  console.log("\nSchool 2 (SCHOOL-2): Riverside Academy");
  console.log("  - Class: school2-class-9b (Grade 9, Section B)");
  console.log("  - Schedule: TUESDAY period 1");
  console.log("\nNew accounts (all use password ChangeMe123!):");
  console.log("  - teacher2@example.com (School 2)");
  console.log("  - student2@example.com (School 2)");
  console.log("  - parent2@example.com (School 2)");
  console.log("  - principal2@example.com (School 2)");
  console.log("  - management2@example.com (School 2)");
}

main()
  .catch((error) => {
    console.error("Setup failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
