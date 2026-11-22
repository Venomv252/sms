// READ-ONLY Database Connectivity Test
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDatabaseHealth() {
  try {
    console.log("Testing database connectivity...\n");
    
    // Test 1: Basic connection
    await prisma.$connect();
    console.log("✅ Prisma client connected");
    
    // Test 2: Query raw (read-only)
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log("✅ Database query successful");
    console.log(`   PostgreSQL version: ${result[0].version.split(' ')[0]} ${result[0].version.split(' ')[1]}`);
    
    // Test 3: Count tables (read-only)
    const userCount = await prisma.user.count();
    const schoolCount = await prisma.school.count();
    const studentCount = await prisma.student.count();
    
    console.log("\n✅ Prisma schema access:");
    console.log(`   Users: ${userCount}`);
    console.log(`   Schools: ${schoolCount}`);
    console.log(`   Students: ${studentCount}`);
    
    console.log("\n✅ ALL CHECKS PASSED - Database is healthy");
    
  } catch (error) {
    console.error("\n❌ Database health check FAILED:");
    console.error(`   Error: ${error.message}`);
    
    if (error.code === "P1001") {
      console.error("   Reason: Cannot reach database server");
    } else if (error.code === "P1003") {
      console.error("   Reason: Database does not exist");
    } else if (error.code === "P1000") {
      console.error("   Reason: Authentication failed");
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseHealth();
