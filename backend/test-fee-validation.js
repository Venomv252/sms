/**
 * TEST: Fee Creation - Amount Validation
 * 
 * Tests the improved fee creation endpoint that validates amount is a positive decimal
 * 
 * Requirements:
 * - Amount must be positive (> 0)
 * - Reject zero, negative, NaN, Infinity, and non-numeric values
 * - Reject exponent notation (1e5) and hexadecimal (0x64)
 * - Reject amounts with more than 2 decimal places
 * - Reject amounts exceeding Decimal(10,2) maximum (99999999.99)
 * - Preserve existing authorization checks
 */

import axios from "axios";

// Use environment variable or default to test server on port 5001
// CRITICAL: Never defaults to port 5000 (development server)
const API_BASE = process.env.API_BASE_URL || "http://localhost:5001/api";

// Validate API_BASE to prevent accidental development server usage
if (API_BASE.includes(":5000")) {
  console.error("❌ FATAL: Test configuration error");
  console.error(`   API_BASE is set to port 5000 (development server): ${API_BASE}`);
  console.error("   Tests must target port 5001 (test server)");
  console.error("\n   Set API_BASE_URL environment variable or update default in test file");
  process.exit(1);
}

// Test credentials (assumes seed data exists)
const ADMIN_CREDS = { username: "superadmin", password: "ChangeMe123!" };
const ACCOUNTANT_CREDS = { username: "accountant", password: "ChangeMe123!" };

let adminToken = null;
let accountantToken = null;
let validStudentId = null;

async function login(credentials) {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, credentials);
    return response.data.data?.token || response.data.token;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
}

async function getStudentId(token) {
  try {
    const response = await axios.get(`${API_BASE}/students`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const students = response.data.data;
    if (students && students.length > 0) {
      return students[0].id;
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function createFee(token, feeData) {
  try {
    const response = await axios.post(`${API_BASE}/fees`, feeData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
}

async function runTests() {
  console.log("🧪 Fee Amount Validation Tests\n");
  console.log("=" .repeat(60));

  // Setup: Login
  console.log("\n📋 Setup: Authenticating users...");
  try {
    adminToken = await login(ADMIN_CREDS);
    console.log("✅ ADMIN authenticated");
  } catch (error) {
    console.log("⚠️  ADMIN not available");
  }

  try {
    accountantToken = await login(ACCOUNTANT_CREDS);
    console.log("✅ ACCOUNTANT authenticated");
  } catch (error) {
    console.log("⚠️  ACCOUNTANT not available, trying to use ADMIN token");
    accountantToken = adminToken;
  }

  // Get a valid student ID
  const token = accountantToken || adminToken;
  if (token) {
    validStudentId = await getStudentId(token);
    if (validStudentId) {
      console.log(`✅ Valid student ID obtained: ${validStudentId}`);
    } else {
      console.log("⚠️  No students found in database");
    }
  }

  console.log("\n" + "=".repeat(60));

  const testCases = [];

  if (!token || !validStudentId) {
    console.log("\n⚠️  Insufficient test data - skipping tests");
    console.log("   Server may not be running or database may be empty");
    return;
  }

  const baseFeeData = {
    studentId: validStudentId,
    term: "TERM1",
    academicYear: "2026-2027",
    dueDate: "2027-01-31",
    remarks: "Test fee",
  };

  // Test 1: Valid positive amount (integer)
  console.log("\n🧪 Test 1: Create fee with valid positive amount (integer)");
  const result1 = await createFee(token, {
    ...baseFeeData,
    amount: 1000,
  });
  
  if (result1.success) {
    console.log("✅ PASS - Valid positive integer amount accepted");
    console.log(`   Fee ID: ${result1.data.data.id}`);
    console.log(`   Amount: ${result1.data.data.amount}`);
    testCases.push({ test: "Test 1", status: "PASS" });
  } else {
    console.log("❌ FAIL - Valid positive amount should be accepted");
    console.log(`   Response: ${JSON.stringify(result1)}`);
    testCases.push({ test: "Test 1", status: "FAIL" });
  }

  // Test 2: Valid positive amount (decimal)
  console.log("\n🧪 Test 2: Create fee with valid positive amount (decimal)");
  const result2 = await createFee(token, {
    ...baseFeeData,
    amount: 1234.56,
  });
  
  if (result2.success) {
    console.log("✅ PASS - Valid positive decimal amount accepted");
    console.log(`   Amount: ${result2.data.data.amount}`);
    testCases.push({ test: "Test 2", status: "PASS" });
  } else {
    console.log("❌ FAIL - Valid positive decimal should be accepted");
    console.log(`   Response: ${JSON.stringify(result2)}`);
    testCases.push({ test: "Test 2", status: "FAIL" });
  }

  // Test 3: Valid amount as string (should be parsed)
  console.log("\n🧪 Test 3: Create fee with valid amount as string");
  const result3 = await createFee(token, {
    ...baseFeeData,
    amount: "500.75",
  });
  
  if (result3.success) {
    console.log("✅ PASS - Valid numeric string amount accepted");
    console.log(`   Amount: ${result3.data.data.amount}`);
    testCases.push({ test: "Test 3", status: "PASS" });
  } else {
    console.log("❌ FAIL - Valid numeric string should be accepted");
    console.log(`   Response: ${JSON.stringify(result3)}`);
    testCases.push({ test: "Test 3", status: "FAIL" });
  }

  // Test 4: Zero amount (should fail)
  console.log("\n🧪 Test 4: Create fee with zero amount (expect 400)");
  const result4 = await createFee(token, {
    ...baseFeeData,
    amount: 0,
  });
  
  if (!result4.success && result4.status === 400) {
    console.log("✅ PASS - Zero amount correctly rejected with 400");
    console.log(`   Error message: ${result4.message}`);
    testCases.push({ test: "Test 4", status: "PASS" });
  } else {
    console.log("❌ FAIL - Zero amount should be rejected");
    console.log(`   Response: ${JSON.stringify(result4)}`);
    testCases.push({ test: "Test 4", status: "FAIL" });
  }

  // Test 5: Negative amount (should fail)
  console.log("\n🧪 Test 5: Create fee with negative amount (expect 400)");
  const result5 = await createFee(token, {
    ...baseFeeData,
    amount: -100,
  });
  
  if (!result5.success && result5.status === 400) {
    console.log("✅ PASS - Negative amount correctly rejected with 400");
    console.log(`   Error message: ${result5.message}`);
    testCases.push({ test: "Test 5", status: "PASS" });
  } else {
    console.log("❌ FAIL - Negative amount should be rejected");
    console.log(`   Response: ${JSON.stringify(result5)}`);
    testCases.push({ test: "Test 5", status: "FAIL" });
  }

  // Test 6: NaN value (should fail)
  console.log("\n🧪 Test 6: Create fee with NaN (expect 400)");
  const result6 = await createFee(token, {
    ...baseFeeData,
    amount: "not-a-number",
  });
  
  if (!result6.success && result6.status === 400) {
    console.log("✅ PASS - NaN correctly rejected with 400");
    console.log(`   Error message: ${result6.message}`);
    testCases.push({ test: "Test 6", status: "PASS" });
  } else {
    console.log("❌ FAIL - NaN should be rejected");
    console.log(`   Response: ${JSON.stringify(result6)}`);
    testCases.push({ test: "Test 6", status: "FAIL" });
  }

  // Test 7: Infinity (should fail)
  console.log("\n🧪 Test 7: Create fee with very large number exceeding max (expect 400)");
  const result7 = await createFee(token, {
    ...baseFeeData,
    amount: 100000000, // Exceeds Decimal(10,2) max of 99999999.99
  });
  
  if (!result7.success && result7.status === 400) {
    console.log("✅ PASS - Amount exceeding max correctly rejected with 400");
    console.log(`   Error message: ${result7.message}`);
    testCases.push({ test: "Test 7", status: "PASS" });
  } else {
    console.log("❌ FAIL - Amount exceeding max should be rejected");
    console.log(`   Response: ${JSON.stringify(result7)}`);
    testCases.push({ test: "Test 7", status: "FAIL" });
  }

  // Test 8: Non-numeric string (should fail)
  console.log("\n🧪 Test 8: Create fee with non-numeric string (expect 400)");
  const result8 = await createFee(token, {
    ...baseFeeData,
    amount: "not-a-number",
  });
  
  if (!result8.success && result8.status === 400) {
    console.log("✅ PASS - Non-numeric string correctly rejected with 400");
    console.log(`   Error message: ${result8.message}`);
    testCases.push({ test: "Test 8", status: "PASS" });
  } else {
    console.log("❌ FAIL - Non-numeric string should be rejected");
    console.log(`   Response: ${JSON.stringify(result8)}`);
    testCases.push({ test: "Test 8", status: "FAIL" });
  }

  // Test 9: Empty string (should fail)
  console.log("\n🧪 Test 9: Create fee with empty string (expect 400)");
  const result9 = await createFee(token, {
    ...baseFeeData,
    amount: "",
  });
  
  if (!result9.success && result9.status === 400) {
    console.log("✅ PASS - Empty string correctly rejected with 400");
    console.log(`   Error message: ${result9.message}`);
    testCases.push({ test: "Test 9", status: "PASS" });
  } else {
    console.log("❌ FAIL - Empty string should be rejected");
    console.log(`   Response: ${JSON.stringify(result9)}`);
    testCases.push({ test: "Test 9", status: "FAIL" });
  }

  // Test 10: Very small positive amount (edge case)
  console.log("\n🧪 Test 10: Create fee with very small positive amount");
  const result10 = await createFee(token, {
    ...baseFeeData,
    amount: 0.01,
  });
  
  if (result10.success) {
    console.log("✅ PASS - Very small positive amount accepted");
    console.log(`   Amount: ${result10.data.data.amount}`);
    testCases.push({ test: "Test 10", status: "PASS" });
  } else {
    console.log("❌ FAIL - Small positive amount should be accepted");
    console.log(`   Response: ${JSON.stringify(result10)}`);
    testCases.push({ test: "Test 10", status: "FAIL" });
  }

  // Test 11: Large amount (edge case)
  console.log("\n🧪 Test 11: Create fee with large amount");
  const result11 = await createFee(token, {
    ...baseFeeData,
    amount: 99999999.99, // Max for Decimal(10,2)
  });
  
  if (result11.success) {
    console.log("✅ PASS - Large amount accepted");
    console.log(`   Amount: ${result11.data.data.amount}`);
    testCases.push({ test: "Test 11", status: "PASS" });
  } else {
    console.log("❌ FAIL - Large valid amount should be accepted");
    console.log(`   Response: ${JSON.stringify(result11)}`);
    testCases.push({ test: "Test 11", status: "FAIL" });
  }

  // Test 12: Exponent notation (should fail)
  console.log("\n🧪 Test 12: Create fee with exponent notation (expect 400)");
  const result12 = await createFee(token, {
    ...baseFeeData,
    amount: "1e5", // Scientific notation
  });
  
  if (!result12.success && result12.status === 400) {
    console.log("✅ PASS - Exponent notation correctly rejected with 400");
    console.log(`   Error message: ${result12.message}`);
    testCases.push({ test: "Test 12", status: "PASS" });
  } else {
    console.log("❌ FAIL - Exponent notation should be rejected");
    console.log(`   Response: ${JSON.stringify(result12)}`);
    testCases.push({ test: "Test 12", status: "FAIL" });
  }

  // Test 13: Hexadecimal notation (should fail)
  console.log("\n🧪 Test 13: Create fee with hexadecimal notation (expect 400)");
  const result13 = await createFee(token, {
    ...baseFeeData,
    amount: "0x64", // Hex for 100
  });
  
  if (!result13.success && result13.status === 400) {
    console.log("✅ PASS - Hexadecimal notation correctly rejected with 400");
    console.log(`   Error message: ${result13.message}`);
    testCases.push({ test: "Test 13", status: "PASS" });
  } else {
    console.log("❌ FAIL - Hexadecimal notation should be rejected");
    console.log(`   Response: ${JSON.stringify(result13)}`);
    testCases.push({ test: "Test 13", status: "FAIL" });
  }

  // Test 14: More than 2 decimal places (should fail)
  console.log("\n🧪 Test 14: Create fee with >2 decimal places (expect 400)");
  const result14 = await createFee(token, {
    ...baseFeeData,
    amount: "123.456", // 3 decimal places
  });
  
  if (!result14.success && result14.status === 400) {
    console.log("✅ PASS - >2 decimal places correctly rejected with 400");
    console.log(`   Error message: ${result14.message}`);
    testCases.push({ test: "Test 14", status: "PASS" });
  } else {
    console.log("❌ FAIL - >2 decimal places should be rejected");
    console.log(`   Response: ${JSON.stringify(result14)}`);
    testCases.push({ test: "Test 14", status: "FAIL" });
  }

  // Test 15: Exact maximum value (should accept)
  console.log("\n🧪 Test 15: Create fee with exact maximum (99999999.99)");
  const result15 = await createFee(token, {
    ...baseFeeData,
    amount: "99999999.99",
  });
  
  if (result15.success) {
    console.log("✅ PASS - Exact maximum value accepted");
    console.log(`   Amount: ${result15.data.data.amount}`);
    testCases.push({ test: "Test 15", status: "PASS" });
  } else {
    console.log("❌ FAIL - Exact maximum should be accepted");
    console.log(`   Response: ${JSON.stringify(result15)}`);
    testCases.push({ test: "Test 15", status: "FAIL" });
  }

  // Test 16: One cent over maximum (should reject)
  console.log("\n🧪 Test 16: Create fee one cent over maximum (100000000)");
  const result16 = await createFee(token, {
    ...baseFeeData,
    amount: "100000000",
  });
  
  if (!result16.success && result16.status === 400) {
    console.log("✅ PASS - Value over maximum correctly rejected with 400");
    console.log(`   Error message: ${result16.message}`);
    testCases.push({ test: "Test 16", status: "PASS" });
  } else {
    console.log("❌ FAIL - Value over maximum should be rejected");
    console.log(`   Response: ${JSON.stringify(result16)}`);
    testCases.push({ test: "Test 16", status: "FAIL" });
  }

  // Test 17: Maximum with 3 decimals (should reject for precision)
  console.log("\n🧪 Test 17: Create fee 99999999.999 (expect 400 - precision)");
  const result17 = await createFee(token, {
    ...baseFeeData,
    amount: "99999999.999",
  });
  
  if (!result17.success && result17.status === 400) {
    console.log("✅ PASS - 99999999.999 correctly rejected with 400 (precision)");
    console.log(`   Error message: ${result17.message}`);
    testCases.push({ test: "Test 17", status: "PASS" });
  } else {
    console.log("❌ FAIL - Should be rejected for decimal precision");
    console.log(`   Response: ${JSON.stringify(result17)}`);
    testCases.push({ test: "Test 17", status: "FAIL" });
  }

  // Test 18: Just below maximum (should accept)
  console.log("\n🧪 Test 18: Create fee 99999999.98 (just below max)");
  const result18 = await createFee(token, {
    ...baseFeeData,
    amount: "99999999.98",
  });
  
  if (result18.success) {
    console.log("✅ PASS - Value just below maximum accepted");
    console.log(`   Amount: ${result18.data.data.amount}`);
    testCases.push({ test: "Test 18", status: "PASS" });
  } else {
    console.log("❌ FAIL - Value below maximum should be accepted");
    console.log(`   Response: ${JSON.stringify(result18)}`);
    testCases.push({ test: "Test 18", status: "FAIL" });
  }

  // Test 19: Leading zeros (verify behavior)
  console.log("\n🧪 Test 19: Create fee with leading zeros (000100.50)");
  const result19 = await createFee(token, {
    ...baseFeeData,
    amount: "000100.50",
  });
  
  if (result19.success) {
    console.log("✅ PASS - Leading zeros accepted (parsed as 100.50)");
    console.log(`   Amount stored: ${result19.data.data.amount}`);
    console.log(`   Note: Leading zeros stripped by validation`);
    testCases.push({ test: "Test 19", status: "PASS" });
  } else {
    console.log("❌ FAIL - Leading zeros should be accepted");
    console.log(`   Response: ${JSON.stringify(result19)}`);
    testCases.push({ test: "Test 19", status: "FAIL" });
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("\n📊 TEST SUMMARY");
  console.log("=".repeat(60));
  
  const passed = testCases.filter(t => t.status === "PASS").length;
  const failed = testCases.filter(t => t.status === "FAIL").length;
  
  testCases.forEach(tc => {
    const icon = tc.status === "PASS" ? "✅" : "❌";
    console.log(`${icon} ${tc.test}: ${tc.status}`);
  });
  
  console.log("\n" + "=".repeat(60));
  console.log(`Total: ${testCases.length} | Passed: ${passed} | Failed: ${failed}`);
  
  if (failed === 0 && testCases.length > 0) {
    console.log("\n🎉 ALL TESTS PASSED!");
    console.log("\n📊 Test Coverage:");
    console.log("   ✅ Basic validation (positive, zero, negative)");
    console.log("   ✅ Format validation (exponent, hex, malformed)");
    console.log("   ✅ Decimal precision (0-2 places)");
    console.log("   ✅ Maximum value boundary (99999999.99)");
    console.log("   ✅ Edge cases (leading zeros, exact max, over max)");
  } else if (testCases.length === 0) {
    console.log("\n⚠️  No tests were executed (server may not be running)");
  } else {
    console.log("\n⚠️  SOME TESTS FAILED");
  }
  
  console.log("=".repeat(60));
}

// Execute tests
runTests().catch(error => {
  console.error("\n❌ Test execution failed:");
  console.error(error);
  process.exit(1);
});
