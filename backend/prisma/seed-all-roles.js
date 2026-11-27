import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedAllRoles() {
  try {
    console.log("🌱 Starting database seeding with all roles...\n");

    // Password for all accounts
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Create Super Admin (platform level, no school)
    console.log("Creating Super Admin...");
    const superAdmin = await prisma.user.create({
      data: {
        username: "superadmin",
        email: "superadmin@sms.com",
        password: hashedPassword,
        firstName: "Super",
        lastName: "Admin",
        role: "SUPER_ADMIN",
        schoolId: null, // Platform level
      },
    });
    console.log("✓ Super Admin created\n");

    // 2. Create a school
    console.log("Creating school...");
    const school = await prisma.school.create({
      data: {
        name: "Greenwood High School",
        code: "GHS001",
        address: "123 Education Street, Knowledge City",
      },
    });
    console.log("✓ School created\n");

    // 3. Create Director and link to school
    console.log("Creating Director...");
    const director = await prisma.user.create({
      data: {
        username: "director",
        email: "director@greenwood.edu",
        password: hashedPassword,
        firstName: "David",
        lastName: "Director",
        role: "DIRECTOR",
        schoolId: school.id,
      },
    });

    await prisma.directorSchool.create({
      data: {
        directorId: director.id,
        schoolId: school.id,
      },
    });
    console.log("✓ Director created and linked to school\n");

    // 4. Create Principal
    console.log("Creating Principal...");
    const principal = await prisma.user.create({
      data: {
        username: "principal",
        email: "principal@greenwood.edu",
        password: hashedPassword,
        firstName: "Patricia",
        lastName: "Principal",
        role: "PRINCIPAL",
        schoolId: school.id,
      },
    });
    console.log("✓ Principal created\n");

    // 5. Create Management
    console.log("Creating Management user...");
    const management = await prisma.user.create({
      data: {
        username: "management",
        email: "management@greenwood.edu",
        password: hashedPassword,
        firstName: "Michael",
        lastName: "Manager",
        role: "MANAGEMENT",
        schoolId: school.id,
      },
    });
    console.log("✓ Management user created\n");

    // 6. Create Teacher
    console.log("Creating Teacher...");
    const teacherUser = await prisma.user.create({
      data: {
        username: "teacher",
        email: "teacher@greenwood.edu",
        password: hashedPassword,
        firstName: "Thomas",
        lastName: "Teacher",
        role: "TEACHER",
        schoolId: school.id,
      },
    });

    const teacher = await prisma.teacher.create({
      data: {
        userId: teacherUser.id,
        employeeId: "EMP001",
        department: "Mathematics",
        designation: "Senior Teacher",
        phoneNumber: "+1234567890",
        address: "456 Teacher Lane",
      },
    });
    console.log("✓ Teacher created\n");

    // 7. Create Accountant
    console.log("Creating Accountant...");
    const accountantUser = await prisma.user.create({
      data: {
        username: "accountant",
        email: "accountant@greenwood.edu",
        password: hashedPassword,
        firstName: "Alice",
        lastName: "Accountant",
        role: "ACCOUNTANT",
        schoolId: school.id,
      },
    });

    const accountant = await prisma.accountant.create({
      data: {
        userId: accountantUser.id,
        employeeId: "ACC001",
        phoneNumber: "+1234567891",
        address: "789 Finance Street",
        permissions: {
          feeCollection: true,
          concessions: true,
          expenses: true,
          payroll: true,
          reports: true,
          approvals: true,
        },
        approvalLimit: 10000.00,
        isActive: true,
      },
    });
    console.log("✓ Accountant created\n");

    // 8. Create Driver
    console.log("Creating Driver...");
    const driver = await prisma.user.create({
      data: {
        username: "driver",
        email: "driver@greenwood.edu",
        password: hashedPassword,
        firstName: "Daniel",
        lastName: "Driver",
        role: "DRIVER",
        schoolId: school.id,
      },
    });
    console.log("✓ Driver created\n");

    // 9. Create Student
    console.log("Creating Student...");
    const studentUser = await prisma.user.create({
      data: {
        username: "student",
        email: "student@greenwood.edu",
        password: hashedPassword,
        firstName: "Sarah",
        lastName: "Student",
        role: "STUDENT",
        schoolId: school.id,
      },
    });

    const student = await prisma.student.create({
      data: {
        userId: studentUser.id,
        rollNumber: "2024001",
        grade: "10",
        section: "A",
        admissionNumber: "ADM2024001",
        dateOfBirth: new Date("2010-05-15"),
        address: "321 Student Avenue",
        phoneNumber: "+1234567892",
        parentName: "Peter Parent",
        parentEmail: "parent@example.com",
        parentPhone: "+1234567893",
        bloodGroup: "O+",
      },
    });
    console.log("✓ Student created\n");

    // 10. Create Parent and link to student
    console.log("Creating Parent...");
    const parentUser = await prisma.user.create({
      data: {
        username: "parent",
        email: "parent@greenwood.edu",
        password: hashedPassword,
        firstName: "Peter",
        lastName: "Parent",
        role: "PARENT",
        schoolId: school.id,
      },
    });

    await prisma.parentStudent.create({
      data: {
        parentUserId: parentUser.id,
        studentId: student.id,
      },
    });
    console.log("✓ Parent created and linked to student\n");

    // Create some additional data for testing
    console.log("Creating additional test data...");

    // Create a subject
    const subject = await prisma.subject.create({
      data: {
        name: "Mathematics",
        code: "MATH101",
        description: "Advanced Mathematics",
        teacherId: teacher.id,
        credits: 4,
      },
    });

    // Create a class
    const classRecord = await prisma.class.create({
      data: {
        name: "Grade 10 Mathematics",
        grade: "10",
        section: "A",
        subjectId: subject.id,
        teacherId: teacher.id,
        academicYear: "2024-2025",
      },
    });

    // Create a fee payment for the student
    await prisma.feePayment.create({
      data: {
        studentId: student.id,
        amount: 5000.00,
        term: "Term 1",
        academicYear: "2024-2025",
        status: "PENDING",
        dueDate: new Date("2024-12-31"),
        remarks: "Annual tuition fee",
      },
    });

    console.log("✓ Additional test data created\n");

    console.log("✅ Database seeding completed successfully!\n");
    console.log("Summary:");
    console.log("- 1 School created: Greenwood High School");
    console.log("- 10 Users created (one for each role)");
    console.log("- Additional test data: 1 subject, 1 class, 1 fee payment");
    console.log("\nAll accounts use password: password123");

  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedAllRoles()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
