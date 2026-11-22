
const BASE_URL = "http://localhost:5000/api";

const TEST_ACCOUNTS = [
  { role: "SUPER_ADMIN", username: "superadmin" },
  { role: "DIRECTOR", username: "director" },
  { role: "PRINCIPAL", username: "principal" },
  { role: "MANAGEMENT", username: "management" },
  { role: "TEACHER", username: "teacher" },
  { role: "ACCOUNTANT", username: "accountant" },
  { role: "DRIVER", username: "driver" },
  { role: "STUDENT", username: "student" },
  { role: "PARENT", username: "parent" },
];

const PASSWORD = "ChangeMe123!";

async function testRole(account) {
  try {
    // 1. Login
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: account.username,
        password: PASSWORD,
      }),
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginData.message}`);
    }

    const token = loginData.data?.token;

    if (!token) {
      throw new Error("Login succeeded but token was missing");
    }

    // 2. Verify authenticated user
    const meResponse = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const meData = await meResponse.json();

    if (!meResponse.ok) {
      throw new Error(`Auth verification failed: ${meData.message}`);
    }

    // Adjust this if your /auth/me response uses another structure.
    const user = meData.data;

    if (!user || user.role !== account.role) {
      throw new Error(
        `Expected ${account.role}, received ${user?.role ?? "unknown"}`
      );
    }

    console.log(`${account.role.padEnd(12)} | PASS`);
    return true;

  } catch (error) {
    console.log(`${account.role.padEnd(12)} | FAIL | ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log("\n========== ROLE AUTHENTICATION TEST ==========\n");

  let passed = 0;
  let failed = 0;

  for (const account of TEST_ACCOUNTS) {
    const success = await testRole(account);

    if (success) passed++;
    else failed++;
  }

  console.log("\n==============================================");
  console.log(`Total: ${TEST_ACCOUNTS.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log("==============================================\n");

  if (failed > 0) {
    process.exitCode = 1;
  }
}

runTests();
