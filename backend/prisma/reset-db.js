import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    console.log("🗑️  Starting database cleanup...\n");

    // Delete in correct order to respect foreign key constraints
    
    // 1. Delete join tables and dependent records first
    console.log("Deleting join tables and dependent records...");
    await prisma.noticeRecipient.deleteMany({});
    await prisma.doubtComment.deleteMany({});
    await prisma.doubt.deleteMany({});
    await prisma.note.deleteMany({});
    await prisma.busLocationHistory.deleteMany({});
    await prisma.trip.deleteMany({});
    await prisma.bus.deleteMany({});
    await prisma.maintenanceRequest.deleteMany({});
    await prisma.inventoryItem.deleteMany({});
    await prisma.academicEvent.deleteMany({});
    await prisma.complaint.deleteMany({});
    await prisma.auditLog.deleteMany({});
    await prisma.admissionApplication.deleteMany({});
    console.log("✓ Join tables cleared\n");

    // 2. Delete student-related records
    console.log("Deleting student-related records...");
    await prisma.leaveRequest.deleteMany({});
    await prisma.certificate.deleteMany({});
    await prisma.feePayment.deleteMany({});
    await prisma.result.deleteMany({});
    await prisma.homeworkSubmission.deleteMany({});
    await prisma.homework.deleteMany({});
    await prisma.attendance.deleteMany({});
    console.log("✓ Student records cleared\n");

    // 3. Delete academic structure
    console.log("Deleting academic structure...");
    await prisma.schedule.deleteMany({});
    await prisma.class.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.notice.deleteMany({});
    console.log("✓ Academic structure cleared\n");

    // 4. Delete parent-student links
    console.log("Deleting parent-student relationships...");
    await prisma.parentStudent.deleteMany({});
    console.log("✓ Parent-student links cleared\n");

    // 5. Delete role-specific records
    console.log("Deleting role-specific records...");
    await prisma.accountant.deleteMany({});
    await prisma.teacher.deleteMany({});
    await prisma.student.deleteMany({});
    console.log("✓ Role-specific records cleared\n");

    // 6. Delete director-school links
    console.log("Deleting director-school relationships...");
    await prisma.directorSchool.deleteMany({});
    console.log("✓ Director-school links cleared\n");

    // 7. Delete users (before schools, since users reference schools)
    console.log("Deleting all users...");
    const userCount = await prisma.user.deleteMany({});
    console.log(`✓ Deleted ${userCount.count} users\n`);

    // 8. Delete schools last
    console.log("Deleting all schools...");
    const schoolCount = await prisma.school.deleteMany({});
    console.log(`✓ Deleted ${schoolCount.count} schools\n`);

    console.log("✅ Database cleanup completed successfully!\n");
    console.log("All data has been deleted from the database.");

  } catch (error) {
    console.error("❌ Error during database cleanup:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
