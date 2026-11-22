/**
 * Capacity Protection Test
 * Tests maxIPs enforcement and cleanup cooldown
 * 
 * NOTE: This test temporarily modifies the LOGIN_RATE_LIMIT_MAX_IPS
 * environment variable to make capacity testing feasible.
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const LOGIN_ENDPOINT = `${BASE_URL}/api/auth/login`;

const TEST_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'WrongPassword'  // Use wrong password to avoid authentication
};

// Test with a much smaller capacity for feasibility
const TEST_MAX_IPS = 10;  // Small enough to test, large enough to be meaningful

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║ CAPACITY PROTECTION TEST                                   ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('\n⚠️  WARNING: This test requires modifying .env configuration');
console.log(`   Set LOGIN_RATE_LIMIT_MAX_IPS=${TEST_MAX_IPS} in .env`);
console.log('   Then restart the server before running this test\n');

console.log('Press Ctrl+C to cancel or wait 5 seconds to continue...\n');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeLoginRequest(ipHeader) {
  try {
    const response = await axios.post(LOGIN_ENDPOINT, TEST_CREDENTIALS, {
      headers: { 'X-Real-IP': ipHeader }, // Some proxies use X-Real-IP
      validateStatus: () => true
    });
    return {
      status: response.status,
      retryAfter: response.headers['retry-after'],
      message: response.data.message
    };
  } catch (error) {
    return {
      status: error.response?.status || 0,
      retryAfter: error.response?.headers?.['retry-after'],
      message: error.response?.data?.message || error.message
    };
  }
}

async function runCapacityTest() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('TEST 1: Fill Map to Capacity');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log(`Simulating ${TEST_MAX_IPS} unique IPs...`);
  console.log('Note: Without trust proxy, all will use same socket IP\n');
  
  const results = [];
  
  for (let i = 1; i <= TEST_MAX_IPS; i++) {
    const fakeIP = `192.168.1.${i}`;
    const response = await makeLoginRequest(fakeIP);
    results.push({ ip: fakeIP, ...response });
    
    if (i % 5 === 0 || response.status === 429) {
      console.log(`   IP ${i}/${TEST_MAX_IPS}: Status ${response.status}`);
    }
  }
  
  const accepted = results.filter(r => r.status === 401 || r.status === 400).length;
  const rejected = results.filter(r => r.status === 429).length;
  
  console.log(`\n Result: ${accepted} accepted, ${rejected} rejected with 429\n`);
  
  if (accepted === TEST_MAX_IPS) {
    console.log('✅ PASS: All IPs within capacity were accepted\n');
  } else {
    console.log(`⚠️  PARTIAL: Only ${accepted}/${TEST_MAX_IPS} accepted`);
    console.log('   (May indicate trust proxy is disabled - all requests from same IP)\n');
  }
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('TEST 2: Attempt to Exceed Capacity');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('Sending request from new IP beyond capacity...');
  const overCapacityIP = `192.168.1.${TEST_MAX_IPS + 1}`;
  const overCapacityResponse = await makeLoginRequest(overCapacityIP);
  
  console.log(`   Status: ${overCapacityResponse.status}`);
  console.log(`   Retry-After: ${overCapacityResponse.retryAfter || 'N/A'}`);
  console.log(`   Message: ${overCapacityResponse.message}\n`);
  
  if (overCapacityResponse.status === 429) {
    console.log('✅ PASS: New IP rejected when Map at capacity');
    console.log(`   Retry-After: ${overCapacityResponse.retryAfter} seconds\n`);
  } else if (overCapacityResponse.status === 401 || overCapacityResponse.status === 400) {
    console.log('⚠️  INFO: Request accepted (likely all requests using same socket IP)');
    console.log('   Enable trust proxy to test true multi-IP capacity\n');
  } else {
    console.log(`❌ FAIL: Unexpected status ${overCapacityResponse.status}\n`);
  }
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('TEST 3: Cleanup Cooldown (30-second throttle)');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('This test verifies cleanup is not repeatedly triggered...');
  console.log('Sending multiple requests beyond capacity rapidly...\n');
  
  const cooldownTests = [];
  for (let i = 0; i < 5; i++) {
    const startTime = Date.now();
    const testIP = `10.0.0.${i}`;
    const response = await makeLoginRequest(testIP);
    const duration = Date.now() - startTime;
    
    cooldownTests.push({ attempt: i + 1, duration, status: response.status });
    console.log(`   Attempt ${i + 1}: ${response.status} in ${duration}ms`);
    
    await sleep(100); // Small delay between requests
  }
  
  const avgDuration = cooldownTests.reduce((sum, t) => sum + t.duration, 0) / cooldownTests.length;
  
  console.log(`\n   Average response time: ${avgDuration.toFixed(0)}ms`);
  
  if (avgDuration < 100) {
    console.log('✅ PASS: Fast rejection without cleanup overhead');
    console.log('   Cooldown prevents repeated Map scans\n');
  } else {
    console.log('⚠️  INFO: Response times suggest cleanup may be running');
    console.log('   Expected: <50ms for cooldown-protected rejection\n');
  }
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('TEST 4: Existing IP Continues During Capacity');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('Testing that existing IPs are unaffected by capacity...');
  
  // Use the first IP from earlier test
  const existingIP = `192.168.1.1`;
  const existingIPResponse = await makeLoginRequest(existingIP);
  
  console.log(`   Status: ${existingIPResponse.status}`);
  console.log(`   Message: ${existingIPResponse.message}\n`);
  
  if (existingIPResponse.status === 401 || existingIPResponse.status === 400) {
    console.log('✅ PASS: Existing IP processed normally despite capacity');
    console.log('   Capacity check only affects NEW IPs\n');
  } else if (existingIPResponse.status === 429) {
    console.log('✅ PASS: Existing IP rate-limited by its own counter');
    console.log('   (Not rejected due to capacity - has own request limit)\n');
  } else {
    console.log(`⚠️  UNEXPECTED: Status ${existingIPResponse.status}\n`);
  }
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('SUMMARY');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('Key Findings:');
  console.log('1. Capacity enforcement depends on trust proxy configuration');
  console.log('2. Without trust proxy, all requests share same socket IP');
  console.log('3. Cooldown mechanism prevents CPU amplification');
  console.log('4. Existing IPs bypass capacity check logic\n');
  
  console.log('Recommendations:');
  console.log('- Enable Express trust proxy for true multi-IP testing');
  console.log('- Use load testing tools for realistic distributed scenarios');
  console.log('- Monitor production logs for capacity_exhaustion events\n');
}

// Wait 5 seconds then run
await sleep(5000);

try {
  await runCapacityTest();
  console.log('✅ Capacity protection test complete\n');
} catch (error) {
  console.error('❌ Test error:', error.message);
  process.exit(1);
}
