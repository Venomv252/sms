import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

async function main() {
  // SECURITY: Allowlist-based environment guard for seed script
  // Only permit execution in explicitly approved development/test environments
  const ALLOWED_ENVIRONMENTS = ["development", "test"];
  const currentEnv = process.env.NODE_ENV;

  if (!currentEnv || !ALLOWED_ENVIRONMENTS.includes(currentEnv)) {
    console.error("❌ SECURITY ERROR: Seed script blocked.");
    console.error(`   Current NODE_ENV: ${currentEnv || "(not set)"}`);
    console.error(`   Allowed environments: ${ALLOWED_ENVIRONMENTS.join(", ")}`);
    console.error("   ");
    console.error("   This script seeds accounts with hardcoded password 'ChangeMe123!'");
    console.error("   Execution is restricted to development and test environments only.");
    console.error("   Production databases must be initialized manually with strong credentials.");
    process.exit(1);
  }

  console.log(`ℹ️  Running seed script in ${currentEnv} environment...`);
  
  const password = await bcrypt.hash("ChangeMe123!", 10);

  const demoSchool = await prisma.school.upsert({
    where: { code: "DEMO-SCHOOL" },
    update: { name: "Demo School" },
    create: { code: "DEMO-SCHOOL", name: "Demo School" },
  });

  // 1. Create demo platform Super Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { username: "superadmin", role: "SUPER_ADMIN", schoolId: null },
    create: {
      email: "admin@example.com",
      username: "superadmin",
      password,
      role: "SUPER_ADMIN",
      firstName: "Demo",
      lastName: "Admin",
    },
  });

  const directorUser = await prisma.user.upsert({
    where: { email: "director@example.com" },
    update: { username: "director", password, role: "DIRECTOR", firstName: "Demo", lastName: "Director", schoolId: null },
    create: { email: "director@example.com", username: "director", password, role: "DIRECTOR", firstName: "Demo", lastName: "Director" },
  });
  await prisma.directorSchool.upsert({
    where: { directorId_schoolId: { directorId: directorUser.id, schoolId: demoSchool.id } },
    update: {},
    create: { directorId: directorUser.id, schoolId: demoSchool.id },
  });

  // School-level demo accounts.
  // These role accounts are provisioned by the seed for local development only.
  for (const account of [
    {
      email: "principal@example.com",
      username: "principal",
      role: "PRINCIPAL",
      firstName: "Demo",
      lastName: "Principal",
    },
    {
      email: "management@example.com",
      username: "management",
      role: "MANAGEMENT",
      firstName: "Demo",
      lastName: "Management",
    },
    {
      email: "accountant@example.com",
      username: "accountant",
      role: "ACCOUNTANT",
      firstName: "Demo",
      lastName: "Accountant",
    },
    {
      email: "driver@example.com",
      username: "driver",
      role: "DRIVER",
      firstName: "Demo",
      lastName: "Driver",
    },
  ]) {
    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        username: account.username,
        password,
        role: account.role,
        firstName: account.firstName,
        lastName: account.lastName,
        schoolId: demoSchool.id,
      },
      create: { ...account, password, schoolId: demoSchool.id },
    });
  }

  // 2. Create demo teacher
  const teacherUser = await prisma.user.upsert({
    where: { email: "teacher@example.com" },
    update: { username: "teacher", schoolId: demoSchool.id },
    create: {
      email: "teacher@example.com",
      username: "teacher",
      password,
      role: "TEACHER",
      schoolId: demoSchool.id,
      firstName: "Demo",
      lastName: "Teacher",
      teacher: {
        create: {
          employeeId: "EMP001",
          department: "Mathematics",
          designation: "Mathematics Teacher",
          phoneNumber: "9000000001",
        },
      },
    },
  });

  // 3. Create demo student
  const studentUser = await prisma.user.upsert({
    where: { email: "student@example.com" },
    update: { username: "student", schoolId: demoSchool.id },
    create: {
      email: "student@example.com",
      username: "student",
      password,
      role: "STUDENT",
      schoolId: demoSchool.id,
      firstName: "Demo",
      lastName: "Student",
      student: {
        create: {
          rollNumber: "STU001",
          grade: "10",
          section: "A",
          admissionNumber: "ADM-STU-001",
          dateOfBirth: new Date("2010-01-01T00:00:00.000Z"),
          address: "Demo Address",
          phoneNumber: "9000000002",
          parentName: "Demo Parent",
          parentEmail: "parent@example.com",
          parentPhone: "9000000003",
          bloodGroup: "O+",
        },
      },
    },
  });

  // 4. Create demo parent login account.
  // This is a separate User record; Student.parentEmail alone does not create one.
  const parentUser = await prisma.user.upsert({
    where: { email: "parent@example.com" },
    update: {
      username: "parent",
      password,
      role: "PARENT",
      schoolId: demoSchool.id,
      firstName: "Demo",
      lastName: "Parent",
    },
    create: {
      email: "parent@example.com",
      username: "parent",
      password,
      role: "PARENT",
      schoolId: demoSchool.id,
      firstName: "Demo",
      lastName: "Parent",
    },
  });

  const teacher = await prisma.teacher.findUniqueOrThrow({
    where: { userId: teacherUser.id },
  });

  const student = await prisma.student.findUniqueOrThrow({
    where: { userId: studentUser.id },
  });

  // Explicitly link the parent account to this student (idempotent).
  await prisma.parentStudent.upsert({
    where: { parentUserId_studentId: { parentUserId: parentUser.id, studentId: student.id } },
    update: {},
    create: { parentUserId: parentUser.id, studentId: student.id },
  });

  // 4. Create subject
  const subject = await prisma.subject.upsert({
    where: { code: "MATH101" },
    update: {
      name: "Mathematics",
      teacherId: teacher.id,
    },
    create: {
      name: "Mathematics",
      code: "MATH101",
      teacherId: teacher.id,
      credits: 1,
      description: "Core mathematics",
    },
  });

  // 6. Create class
  const classRecord = await prisma.class.upsert({
    where: { id: "demo-class-10a" },
    update: {
      name: "Class 10A Mathematics",
      grade: "10",
      section: "A",
      subjectId: subject.id,
      teacherId: teacher.id,
      academicYear: "2026-2027",
    },
    create: {
      id: "demo-class-10a",
      name: "Class 10A Mathematics",
      grade: "10",
      section: "A",
      subjectId: subject.id,
      teacherId: teacher.id,
      academicYear: "2026-2027",
    },
  });

  // 7. Create attendance records
  for (const record of [
    {
      date: new Date("2026-10-20T00:00:00.000Z"),
      status: "PRESENT",
      remarks: "Demo attendance",
    },
    {
      date: new Date("2026-10-21T00:00:00.000Z"),
      status: "LATE",
      remarks: "Arrived late",
    },
  ]) {
    await prisma.attendance.upsert({
      where: {
        studentId_classId_date: {
          studentId: student.id,
          classId: classRecord.id,
          date: record.date,
        },
      },
      update: {
        status: record.status,
        remarks: record.remarks,
      },
      create: {
        studentId: student.id,
        classId: classRecord.id,
        ...record,
      },
    });
  }

  // 8. Create homework
  let homework = await prisma.homework.findFirst({
    where: {
      title: "Algebra Practice",
      classId: classRecord.id,
    },
  });

  if (!homework) {
    homework = await prisma.homework.create({
      data: {
        title: "Algebra Practice",
        description: "Complete the assigned linear equations exercises.",
        subjectId: subject.id,
        classId: classRecord.id,
        dueDate: new Date("2026-11-05T23:59:00.000Z"),
        totalMarks: 20,
      },
    });
  }

  // 9. Create homework submission
  await prisma.homeworkSubmission.upsert({
    where: {
      homeworkId_studentId: {
        homeworkId: homework.id,
        studentId: student.id,
      },
    },
    update: {
      status: "SUBMITTED",
      textAnswer: "Demo submission",
      submittedAt: new Date("2026-10-22T10:00:00.000Z"),
    },
    create: {
      homeworkId: homework.id,
      studentId: student.id,
      status: "SUBMITTED",
      textAnswer: "Demo submission",
      submittedAt: new Date("2026-10-22T10:00:00.000Z"),
    },
  });

  // 10. Create result
  const existingResult = await prisma.result.findFirst({
    where: {
      studentId: student.id,
      subjectId: subject.id,
      examType: "UNIT TEST 1",
      academicYear: "2026-2027",
      term: "TERM 1",
    },
  });

  if (!existingResult) {
    await prisma.result.create({
      data: {
        studentId: student.id,
        subjectId: subject.id,
        examType: "UNIT TEST 1",
        theoryMarks: 42,
        internalMarks: 8,
        totalMarks: 50,
        grade: "A",
        remarks: "Good progress",
        academicYear: "2026-2027",
        term: "TERM 1",
      },
    });
  }

  // 11. Create fee payment
  await prisma.feePayment.upsert({
    where: { receiptNumber: "DEMO-RECEIPT-001" },
    update: {
      amount: "15000.00",
      status: "PAID",
      paymentDate: new Date("2026-10-01T00:00:00.000Z"),
    },
    create: {
      studentId: student.id,
      amount: "15000.00",
      term: "TERM 1",
      academicYear: "2026-2027",
      status: "PAID",
      paymentMethod: "DEMO",
      receiptNumber: "DEMO-RECEIPT-001",
      paymentDate: new Date("2026-10-01T00:00:00.000Z"),
      dueDate: new Date("2026-10-15T00:00:00.000Z"),
      remarks: "Seeded demo fee record",
    },
  });

  // 12. Create timetable entry
  const existingSchedule = await prisma.schedule.findFirst({
    where: {
      classId: classRecord.id,
      dayOfWeek: "MONDAY",
      period: 1,
    },
  });

  if (!existingSchedule) {
    await prisma.schedule.create({
      data: {
        classId: classRecord.id,
        dayOfWeek: "MONDAY",
        period: 1,
        startTime: "09:00",
        endTime: "09:45",
        room: "Room 10A",
      },
    });
  }

  // 13. Create notice
  const existingNotice = await prisma.notice.findFirst({
    where: { title: "Welcome to the Student ERP" },
  });

  if (!existingNotice) {
    await prisma.notice.create({
      data: {
        title: "Welcome to the Student ERP",
        content: "This is a sample notice for local development.",
        category: "GENERAL",
        priority: "NORMAL",
        isActive: true,
        schoolId: demoSchool.id,
      },
    });
  } else if (!existingNotice.schoolId) {
    await prisma.notice.update({ where: { id: existingNotice.id }, data: { schoolId: demoSchool.id } });
  }

  console.log("Database seeded successfully.");
  console.log("Demo accounts (all use password ChangeMe123!):");
  console.log("Super Admin: superadmin");
  console.log("Director: director");
  console.log("Teacher: teacher@example.com");
  console.log("Student: student@example.com");
  console.log("Parent: parent@example.com");
  console.log("Admin ID:", admin.id);
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
