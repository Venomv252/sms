/**
 * TEST: Homework Submission - File URL Validation
 * 
 * Tests the improved homework submission endpoint that validates file URLs
 * 
 * Requirements:
 * - Reject malformed URLs
 * - Reject unsafe protocols (javascript:, data:, file:, etc.)
 * - Accept only HTTP and HTTPS protocols
 * - Preserve existing authorization checks
 * 
 * Note: Since no storage provider is configured, this test validates
 * URL format and protocol only. Domain allowlist is not implemented
 * as no storage provider exists in the configuration.
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
const STUDENT_CREDS = { email: "student@example.com", password: "ChangeMe123!" };

let studentToken = null;
let validHomeworkId = null;

async function login(credentials) {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, credentials);
    return response.data.token;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
}

async function getHomework(token) {
  try {
    const response = await axios.get(`${API_BASE}/homework`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const homework = response.data.data;
    if (homework && homework.length > 0) {
      return homework[0].id;
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function submitHomework(token, homeworkId, submissionData) {
  try {
    const response = await axios.post(
      `${API_BASE}/homework/${homeworkId}/submit`,
      submissionData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
  console.log("🧪 Homework File URL Validation Tests\n");
  console.log("=" .repeat(60));

  // Setup: Login
  console.log("\n📋 Setup: Authenticating student...");
  try {
    studentToken = await login(STUDENT_CREDS);
    console.log("✅ STUDENT authenticated");
  } catch (error) {
    console.log("⚠️  STUDENT not available");
  }

  // Get a valid homework ID
  if (studentToken) {
    validHomeworkId = await getHomework(studentToken);
    if (validHomeworkId) {
      console.log(`✅ Valid homework ID obtained: ${validHomeworkId}`);
    } else {
      console.log("⚠️  No homework assignments found");
    }
  }

  console.log("\n" + "=".repeat(60));

  const testCases = [];

  if (!studentToken || !validHomeworkId) {
    console.log("\n⚠️  Insufficient test data - skipping tests");
    console.log("   Server may not be running or database may be empty");
    console.log("   Ensure student account exists and has assigned homework");
    return;
  }

  // Test 1: Valid HTTP URL
  console.log("\n🧪 Test 1: Submit homework with valid HTTP URL");
  const result1 = await submitHomework(studentToken, validHomeworkId, {
    fileUrl: "http://example.com/homework/file.pdf",
  });
  
  if (result1.success) {
    console.log("✅ PASS - Valid HTTP URL accepted");
    console.log(`   Submission ID: ${result1.data.data.id}`);
    console.log(`   File URL: ${result1.data.data.fileUrl}`);
    testCases.push({ test: "Test 1", status: "PASS" });
  } else {
    console.log("❌ FAIL - Valid HTTP URL should be accepted");
    console.log(`   Response: ${JSON.stringify(result1)}`);
    testCases.push({ test: "Test 1", status: "FAIL" });
  }

  // Test 2: Valid HTTPS URL
  console.log("\n🧪 Test 2: Submit homework with valid HTTPS URL");
  const result2 = await submitHomework(studentToken, validHomeworkId, {
    fileUrl: "https://secure-storage.example.com/uploads/homework123.pdf",
  });
  
  if (result2.success) {
    console.log("✅ PASS - Valid HTTPS URL accepted");
    console.log(`   File URL: ${result2.data.data.fileUrl}`);
    testCases.push({ test: "Test 2", status: "PASS" });
  } else {
    console.log("❌ FAIL - Valid HTTPS URL should be accepted");
    console.log(`   Response: ${JSON.stringify(result2)}`);
    testCases.push({ test: "Test 2", status: "FAIL" });
  }

  // Test 3: Valid URL with query parameters
  console.log("\n🧪 Test 3: Submit homework with URL containing query parameters");
  const result3 = await submitHomework(studentToken, validHomeworkId, {
    fileUrl: "https://cdn.example.com/files/homework.pdf?token=abc123&version=2",
  });
  
  if (result3.success) {
    console.log("✅ PASS - URL with query parameters accepted");
    console.log(`   File URL: ${result3.data.data.fileUrl}`);
    testCases.push({ test: "Test 3", status: "PASS" });
  } else {
    console.log("❌ FAIL - URL with query parameters should be accepted");
    console.log(`   Response: ${JSON.stringify(result3)}`);
    testCases.push({ test: "Test 3", status: "FAIL" });
  }

  // Test 4: Malformed URL (missing protocol)
  console.log("\n🧪 Test 4: Submit homework with malformed URL - no protocol (expect 400)");
  const result4 = await submitHomework(studentToken, validHomeworkId, {
    fileUrl: "example.com/homework.pdf",
  });
  
  if (!result4.success && result4.status === 400) {
    console.log("✅ PASS - Malformed URL (no protocol) correctly rejected with 400");
    console.log(`   Error message: ${result4.message}`);
    testCases.push({ test: "Test 4", status: "PASS" });
  } else {
    console.log("❌ FAIL - Malformed URL should be rejected");
    console.log(`   Response: ${JSON.stringify(result4)}`);
    testCases.push({ test: "Test 4", status: "FAIL" });
  }

  // Test 5: Malformed URL (invalid format)
  console.log("\n🧪 Test 5: Submit homework with malformed URL - invalid format (expect 400)");
  const result5 = await submitHomework(studentToken, validHomeworkId, {
    fileUrl: "not a valid url at all",
  });
  
  if (!result5.success && result5.status === 400) {
    console.log("✅ PASS - Malformed URL correctly rejected with 400");
    console.log(`   Error message: ${result5.message}`);
    testCases.push({ test: "Test 5", status: "PASS" });
  } else {
    console.log("❌ FAIL - Malformed URL should be rejected");
    console.log(`   Response: ${JSON.stringify(result5)}`);
    testCases.push({ test: "Test 5", status: "FAIL" });
  }

  // Test 6: javascript: protocol (XSS attack vector)
  console.log("\n🧪 Test 6: Submit homework with javascript: protocol (expect 400)");
  const result6 = await submitHomework(studentToken, validHomeworkId, {
    fileUrl: "javascript:alert('XSS')",
  });
  
  if (!result6.success && result6.status === 400) {
    console.log("✅ PASS - javascript: protocol correctly rejected with 400");
    console.log(`   Error message: ${result6.message}`);
    testCases.push({ test: "Test 6", status: "PASS" });
  } else {
    console.log("❌ FAIL - javascript: protocol should be rejected");
    console.log(`   Response: ${JSON.stringify(result6)}`);
    testCases.push({ test: "Test 6", status: "FAIL" });
  }

  // Test 7: data: protocol
  console.log("\n🧪 Test 7: Submit homework with data: protocol (expect 400)");
  const result7 = await submitHomework(studentToken, validHomeworkId, {
    fileUrl: "data:text/html,<script>alert('XSS')</script>",
  });
  
  if (!result7.success && result7.status === 400) {
    console.log("✅ PASS - data: protocol correctly rejected with 400");
    console.log(`   Error message: ${result7.message}`);
    testCases.push({ test: "Test 7", status: "PASS" });
  } else {
    console.log("❌ FAIL - data: protocol should be rejected");
    console.log(`   Response: ${JSON.stringify(result7)}`);
    testCases.push({ test: "Test 7", status: "FAIL" });
  }

  // Test 8: file: protocol
  console.log("\n🧪 Test 8: Submit homework with file: protocol (expect 400)");
  const result8 = await submitHomework(studentToken, validHomeworkId, {
    fileUrl: "file:///etc/passwd",
  });
  
  if (!result8.success && result8.status === 400) {
    console.log("✅ PASS - file: protocol correctly rejected with 400");
    console.log(`   Error message: ${result8.message}`);
    testCases.push({ test: "Test 8", status: "PASS" });
  } else {
    console.log("❌ FAIL - file: protocol should be rejected");
    console.log(`   Response: ${JSON.stringify(result8)}`);
    testCases.push({ test: "Test 8", status: "FAIL" });
  }

  // Test 9: ftp: protocol
  console.log("\n🧪 Test 9: Submit homework with ftp: protocol (expect 400)");
  const result9 = await submitHomework(studentToken, validHomeworkId, {
    fileUrl: "ftp://ftp.example.com/homework.pdf",
  });
  
  if (!result9.success && result9.status === 400) {
    console.log("✅ PASS - ftp: protocol correctly rejected with 400");
    console.log(`   Error message: ${result9.message}`);
    testCases.push({ test: "Test 9", status: "PASS" });
  } else {
    console.log("❌ FAIL - ftp: protocol should be rejected");
    console.log(`   Response: ${JSON.stringify(result9)}`);
    testCases.push({ test: "Test 9", status: "FAIL" });
  }

  // Test 10: Empty string (should fail - existing check)
  console.log("\n🧪 Test 10: Submit homework with empty fileUrl (expect 400)");
  const result10 = await submitHomework(studentToken, validHomeworkId, {
    fileUrl: "",
  });
  
  if (!result10.success && result10.status === 400) {
    console.log("✅ PASS - Empty fileUrl correctly rejected with 400");
    console.log(`   Error message: ${result10.message}`);
    testCases.push({ test: "Test 10", status: "PASS" });
  } else {
    console.log("❌ FAIL - Empty fileUrl should be rejected");
    console.log(`   Response: ${JSON.stringify(result10)}`);
    testCases.push({ test: "Test 10", status: "FAIL" });
  }

  // Test 11: Text answer (no URL) - should still work
  console.log("\n🧪 Test 11: Submit homework with text answer only (no URL)");
  const result11 = await submitHomework(studentToken, validHomeworkId, {
    textAnswer: "This is my homework answer without a file.",
  });
  
  if (result11.success) {
    console.log("✅ PASS - Text-only submission still works");
    console.log(`   Text answer length: ${result11.data.data.textAnswer.length} chars`);
    testCases.push({ test: "Test 11", status: "PASS" });
  } else {
    console.log("❌ FAIL - Text-only submission should still work");
    console.log(`   Response: ${JSON.stringify(result11)}`);
    testCases.push({ test: "Test 11", status: "FAIL" });
  }

  // Test 12: Both text and valid URL
  console.log("\n🧪 Test 12: Submit homework with both text answer and valid URL");
  const result12 = await submitHomework(studentToken, validHomeworkId, {
    textAnswer: "See attached file for complete solution",
    fileUrl: "https://example.com/homework-complete.pdf",
  });
  
  if (result12.success) {
    console.log("✅ PASS - Combined text + URL submission works");
    console.log(`   Has text: ${!!result12.data.data.textAnswer}`);
    console.log(`   Has URL: ${!!result12.data.data.fileUrl}`);
    testCases.push({ test: "Test 12", status: "PASS" });
  } else {
    console.log("❌ FAIL - Combined submission should work");
    console.log(`   Response: ${JSON.stringify(result12)}`);
    testCases.push({ test: "Test 12", status: "FAIL" });
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
  
  console.log("\n" + "=".repeat(60));
  console.log("\n📝 NOTE: File Storage Architecture");
  console.log("=".repeat(60));
  console.log("No storage provider (S3, Azure Blob, etc.) is configured.");
  console.log("The application accepts arbitrary HTTP/HTTPS URLs for file submissions.");
  console.log("Domain allowlist validation is NOT implemented due to lack of");
  console.log("configured storage provider.");
  console.log("\nValidation implemented:");
  console.log("  ✅ URL format validation");
  console.log("  ✅ Protocol whitelist (http:, https: only)");
  console.log("  ✅ Unsafe protocol blocking (javascript:, data:, file:, ftp:)");
  console.log("\nNOT implemented (requires storage configuration):");
  console.log("  ⚠️  Domain allowlist");
  console.log("  ⚠️  File existence verification");
  console.log("  ⚠️  Storage provider authentication");
  console.log("=".repeat(60));
}

// Execute tests
runTests().catch(error => {
  console.error("\n❌ Test execution failed:");
  console.error(error);
  process.exit(1);
});
