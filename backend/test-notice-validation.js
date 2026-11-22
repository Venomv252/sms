/**
 * TEST: Notice Creation - School ID Validation
 * 
 * Tests the improved notice creation endpoint that validates ADMIN-supplied schoolId
 * 
 * Requirements:
 * - Non-ADMIN users must use their assigned schoolId
 * - ADMIN can create school-specific or platform-wide notices
 * - ADMIN-supplied schoolId must exist in database
 * - Invalid schoolId returns HTTP 400
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
const PRINCIPAL_CREDS = { username: "principal", password: "ChangeMe123!" };

let adminToken = null;
let principalToken = null;
let validSchoolId = null;

async function login(credentials) {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, credentials);
    return response.data.data?.token || response.data.token;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
}

async function getSchools(token) {
  try {
    const response = await axios.get(`${API_BASE}/students`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Extract schoolId from first student if available
    const students = response.data.data;
    if (students && students.length > 0 && students[0].user?.schoolId) {
      return students[0].user.schoolId;
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function createNotice(token, noticeData) {
  try {
    const response = await axios.post(`${API_BASE}/notices`, noticeData, {
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
  console.log("🧪 Notice Creation Validation Tests\n");
  console.log("=" .repeat(60));

  // Setup: Login
  console.log("\n📋 Setup: Authenticating users...");
  try {
    adminToken = await login(ADMIN_CREDS);
    console.log("✅ ADMIN authenticated");
  } catch (error) {
    console.log("⚠️  ADMIN not available, skipping admin tests");
  }

  try {
    principalToken = await login(PRINCIPAL_CREDS);
    console.log("✅ PRINCIPAL authenticated");
    
    // Get a valid schoolId from the principal's school
    validSchoolId = await getSchools(adminToken || principalToken);
    if (validSchoolId) {
      console.log(`✅ Valid school ID obtained: ${validSchoolId}`);
    }
  } catch (error) {
    console.log("⚠️  PRINCIPAL not available");
  }

  console.log("\n" + "=".repeat(60));

  const testCases = [];

  // Test 1: ADMIN creates platform-wide notice (schoolId = null)
  if (adminToken) {
    console.log("\n🧪 Test 1: ADMIN creates platform-wide notice (schoolId omitted)");
    const result1 = await createNotice(adminToken, {
      title: "Platform-wide Notice Test",
      content: "This is a test notice for all schools",
      category: "GENERAL",
    });
    
    if (result1.success && result1.data.data.schoolId === null) {
      console.log("✅ PASS - Platform-wide notice created successfully");
      console.log(`   Notice ID: ${result1.data.data.id}`);
      console.log(`   School ID: ${result1.data.data.schoolId} (null expected)`);
      testCases.push({ test: "Test 1", status: "PASS" });
    } else {
      console.log("❌ FAIL - Platform-wide notice creation failed");
      console.log(`   Response: ${JSON.stringify(result1)}`);
      testCases.push({ test: "Test 1", status: "FAIL" });
    }
  }

  // Test 2: ADMIN creates platform-wide notice (schoolId explicitly null)
  if (adminToken) {
    console.log("\n🧪 Test 2: ADMIN creates platform-wide notice (schoolId = null)");
    const result2 = await createNotice(adminToken, {
      title: "Explicit Null School ID Test",
      content: "Testing explicit null value",
      category: "GENERAL",
      schoolId: null,
    });
    
    if (result2.success && result2.data.data.schoolId === null) {
      console.log("✅ PASS - Platform-wide notice with explicit null created");
      testCases.push({ test: "Test 2", status: "PASS" });
    } else {
      console.log("❌ FAIL - Explicit null schoolId failed");
      console.log(`   Response: ${JSON.stringify(result2)}`);
      testCases.push({ test: "Test 2", status: "FAIL" });
    }
  }

  // Test 3: ADMIN creates school-specific notice with VALID schoolId
  if (adminToken && validSchoolId) {
    console.log("\n🧪 Test 3: ADMIN creates school-specific notice (valid schoolId)");
    const result3 = await createNotice(adminToken, {
      title: "School-specific Notice Test",
      content: "This is a test notice for a specific school",
      category: "ACADEMIC",
      schoolId: validSchoolId,
    });
    
    if (result3.success && result3.data.data.schoolId === validSchoolId) {
      console.log("✅ PASS - School-specific notice created successfully");
      console.log(`   Notice ID: ${result3.data.data.id}`);
      console.log(`   School ID: ${result3.data.data.schoolId}`);
      testCases.push({ test: "Test 3", status: "PASS" });
    } else {
      console.log("❌ FAIL - School-specific notice creation failed");
      console.log(`   Response: ${JSON.stringify(result3)}`);
      testCases.push({ test: "Test 3", status: "FAIL" });
    }
  }

  // Test 4: ADMIN creates notice with INVALID schoolId (should fail with 400)
  if (adminToken) {
    console.log("\n🧪 Test 4: ADMIN creates notice with invalid schoolId (expect 400)");
    const fakeSchoolId = "00000000-0000-0000-0000-000000000000";
    const result4 = await createNotice(adminToken, {
      title: "Invalid School ID Test",
      content: "This should fail",
      category: "GENERAL",
      schoolId: fakeSchoolId,
    });
    
    if (!result4.success && result4.status === 400) {
      console.log("✅ PASS - Invalid schoolId correctly rejected with 400");
      console.log(`   Error message: ${result4.message}`);
      testCases.push({ test: "Test 4", status: "PASS" });
    } else {
      console.log("❌ FAIL - Invalid schoolId should have been rejected");
      console.log(`   Response: ${JSON.stringify(result4)}`);
      testCases.push({ test: "Test 4", status: "FAIL" });
    }
  }

  // Test 5: ADMIN creates notice with malformed schoolId (should fail with 400)
  if (adminToken) {
    console.log("\n🧪 Test 5: ADMIN creates notice with malformed schoolId (expect 400)");
    const result5 = await createNotice(adminToken, {
      title: "Malformed School ID Test",
      content: "This should fail",
      category: "GENERAL",
      schoolId: "not-a-valid-uuid",
    });
    
    if (!result5.success && result5.status === 400) {
      console.log("✅ PASS - Malformed schoolId correctly rejected with 400");
      console.log(`   Error message: ${result5.message}`);
      testCases.push({ test: "Test 5", status: "PASS" });
    } else {
      console.log("❌ FAIL - Malformed schoolId should have been rejected");
      console.log(`   Response: ${JSON.stringify(result5)}`);
      testCases.push({ test: "Test 5", status: "FAIL" });
    }
  }

  // Test 6: Non-ADMIN user cannot override schoolId
  if (principalToken) {
    console.log("\n🧪 Test 6: PRINCIPAL cannot override schoolId (school isolation)");
    const fakeSchoolId = "00000000-0000-0000-0000-000000000000";
    const result6 = await createNotice(principalToken, {
      title: "Principal School Override Test",
      content: "Attempting to use different schoolId",
      category: "GENERAL",
      schoolId: fakeSchoolId, // This should be ignored
    });
    
    // The notice should be created with principal's schoolId, not the fake one
    if (result6.success && result6.data.data.schoolId !== fakeSchoolId) {
      console.log("✅ PASS - PRINCIPAL schoolId override correctly ignored");
      console.log(`   Used school ID: ${result6.data.data.schoolId} (principal's school)`);
      console.log(`   Attempted override: ${fakeSchoolId} (correctly ignored)`);
      testCases.push({ test: "Test 6", status: "PASS" });
    } else {
      console.log("❌ FAIL - PRINCIPAL should not be able to override schoolId");
      console.log(`   Response: ${JSON.stringify(result6)}`);
      testCases.push({ test: "Test 6", status: "FAIL" });
    }
  }

  // Test 7: ADMIN sends empty string schoolId (should fail with 400)
  if (adminToken) {
    console.log("\n🧪 Test 7: ADMIN sends empty string schoolId (expect 400)");
    const result7 = await createNotice(adminToken, {
      title: "Empty String School ID Test",
      content: "Testing empty string validation",
      category: "GENERAL",
      schoolId: "", // Empty string
    });
    
    if (!result7.success && result7.status === 400) {
      console.log("✅ PASS - Empty string schoolId correctly rejected with 400");
      console.log(`   Error message: ${result7.message}`);
      testCases.push({ test: "Test 7", status: "PASS" });
    } else {
      console.log("❌ FAIL - Empty string should be rejected");
      console.log(`   Response: ${JSON.stringify(result7)}`);
      testCases.push({ test: "Test 7", status: "FAIL" });
    }
  }

  // Test 8: ADMIN sends number schoolId (should fail with 400)
  if (adminToken) {
    console.log("\n🧪 Test 8: ADMIN sends number as schoolId (expect 400)");
    const result8 = await createNotice(adminToken, {
      title: "Number School ID Test",
      content: "Testing type validation",
      category: "GENERAL",
      schoolId: 123, // Number instead of string
    });
    
    if (!result8.success && result8.status === 400) {
      console.log("✅ PASS - Number schoolId correctly rejected with 400");
      console.log(`   Error message: ${result8.message}`);
      testCases.push({ test: "Test 8", status: "PASS" });
    } else {
      console.log("❌ FAIL - Number should be rejected");
      console.log(`   Response: ${JSON.stringify(result8)}`);
      testCases.push({ test: "Test 8", status: "FAIL" });
    }
  }

  // Test 9: ADMIN sends boolean schoolId (should fail with 400)
  if (adminToken) {
    console.log("\n🧪 Test 9: ADMIN sends boolean as schoolId (expect 400)");
    const result9 = await createNotice(adminToken, {
      title: "Boolean School ID Test",
      content: "Testing type validation",
      category: "GENERAL",
      schoolId: false, // Boolean instead of string
    });
    
    if (!result9.success && result9.status === 400) {
      console.log("✅ PASS - Boolean schoolId correctly rejected with 400");
      console.log(`   Error message: ${result9.message}`);
      testCases.push({ test: "Test 9", status: "PASS" });
    } else {
      console.log("❌ FAIL - Boolean should be rejected");
      console.log(`   Response: ${JSON.stringify(result9)}`);
      testCases.push({ test: "Test 9", status: "FAIL" });
    }
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
