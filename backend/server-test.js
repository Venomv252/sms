/**
 * Test Server Startup Script
 * 
 * Starts Express server on port 5001 using .env.test configuration
 * 
 * CRITICAL SAFETY CHECKS:
 * - Validates NODE_ENV is "test"
 * - Validates PORT is 5001 (not 5000)
 * - Validates DATABASE_URL contains "sms_test_db"
 * - Validates database host and port match expected PostgreSQL instance
 * - Prevents accidental development database usage
 * 
 * Usage:
 *   npx dotenv -e .env.test -- node server-test.js
 * 
 * OR (if server-test.js loads .env.test directly):
 *   node server-test.js
 */

// Load .env.test BEFORE any other imports
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.test
const result = dotenv.config({ path: join(__dirname, ".env.test") });

if (result.error) {
  console.error("❌ FATAL: Could not load .env.test");
  console.error(`   Error: ${result.error.message}`);
  console.error("\n   Test server requires .env.test configuration file.");
  console.error("   Expected location: backend/.env.test");
  process.exit(1);
}

console.log("🔍 Running startup safety checks...\n");

// SAFETY CHECK 1: Validate NODE_ENV is "test"
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv !== "test") {
  console.error("❌ SAFETY CHECK FAILED: NODE_ENV validation");
  console.error(`   Expected: NODE_ENV="test"`);
  console.error(`   Actual: NODE_ENV="${nodeEnv || "(not set)"}"`);
  console.error("\n   Test server must run with NODE_ENV=test");
  console.error("   Verify .env.test sets NODE_ENV=test");
  process.exit(1);
}
console.log("✅ NODE_ENV validation passed: test");

// SAFETY CHECK 2: Validate PORT is 5001 (not 5000)
const port = Number(process.env.PORT);
if (port !== 5001) {
  console.error("❌ SAFETY CHECK FAILED: PORT validation");
  console.error(`   Expected: PORT=5001 (test server)`);
  console.error(`   Actual: PORT=${port || "(not set)"}`);
  console.error("\n   Test server must run on port 5001 to avoid conflicts.");
  console.error("   Verify .env.test sets PORT=5001");
  process.exit(1);
}
console.log("✅ PORT validation passed: 5001");

// SAFETY CHECK 3: Validate DATABASE_URL exists and parses
const databaseUrl = process.env.DATABASE_URL || "";
if (!databaseUrl) {
  console.error("❌ SAFETY CHECK FAILED: DATABASE_URL missing");
  console.error("   DATABASE_URL environment variable is not set");
  console.error("   Verify .env.test contains DATABASE_URL");
  process.exit(1);
}

// Parse DATABASE_URL (without exposing credentials)
let dbHost, dbPort, dbName;
try {
  const urlPattern = /postgresql:\/\/[^:]+:[^@]+@([^:/]+):?(\d+)?\/([^?]+)/;
  const match = databaseUrl.match(urlPattern);
  
  if (!match) {
    throw new Error("DATABASE_URL format invalid");
  }
  
  dbHost = match[1];
  dbPort = match[2] || "5432";
  dbName = match[3];
  
} catch (error) {
  console.error("❌ SAFETY CHECK FAILED: DATABASE_URL parsing");
  console.error(`   Error: ${error.message}`);
  console.error("   Expected format: postgresql://user:pass@host:port/database");
  process.exit(1);
}
console.log("✅ DATABASE_URL parsing passed");

// SAFETY CHECK 4: Validate database name is "sms_test_db"
if (dbName !== "sms_test_db") {
  console.error("❌ SAFETY CHECK FAILED: Database name validation");
  console.error(`   Expected: Database name must be "sms_test_db"`);
  console.error(`   Actual: Database name is "${dbName}"`);
  console.error("\n   This prevents accidental connection to development database.");
  console.error("   Verify .env.test DATABASE_URL points to sms_test_db");
  process.exit(1);
}
console.log(`✅ Database name validation passed: ${dbName}`);

// SAFETY CHECK 5: Validate database host and port match expected instance
const expectedHost = "localhost";
const expectedPort = "5433";

if (dbHost !== expectedHost || dbPort !== expectedPort) {
  console.error("❌ SAFETY CHECK FAILED: Database host/port validation");
  console.error(`   Expected: ${expectedHost}:${expectedPort}`);
  console.error(`   Actual: ${dbHost}:${dbPort}`);
  console.error("\n   Database host/port do not match expected PostgreSQL instance.");
  console.error("   Verify .env.test DATABASE_URL uses correct host and port");
  process.exit(1);
}
console.log(`✅ Database host/port validation passed: ${dbHost}:${dbPort}`);

// All safety checks passed
console.log("\n" + "=".repeat(60));
console.log("✅ ALL SAFETY CHECKS PASSED");
console.log("=".repeat(60));
console.log(`   Environment: ${nodeEnv}`);
console.log(`   Port: ${port}`);
console.log(`   Database: ${dbName}`);
console.log(`   Host: ${dbHost}:${dbPort}`);
console.log("=".repeat(60));
console.log("\n🚀 Starting test server...\n");

// Now import and start server (environment already loaded and validated)
import "./src/server.js";
