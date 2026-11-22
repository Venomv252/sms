/**
 * PRODUCTION-CLASS UNIT TESTS
 * 
 * Tests the ACTUAL exported LoginRateLimiter class from production code.
 * Uses dependency injection to mock time and inject test configuration.
 * 
 * This is NOT a mock replica - these tests import and exercise the real
 * production class with injected dependencies.
 */

import { LoginRateLimiter } from './src/middleware/loginRateLimit.js';
import assert from 'assert';

// Mock clock for time control
class MockClock {
  constructor(initialTime = 1000000000) {
    this.currentTime = initialTime;
  }
  
  now() {
    return this.currentTime;
  }
  
  advance(ms) {
    this.currentTime += ms;
  }
}

// Test results tracking
const results = [];

function logTest(name, status, details) {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`\n${icon} ${status}: ${name}`);
  console.log(`   ${details}`);
  results.push({ name, status, details });
}

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║ PRODUCTION-CLASS UNIT TESTS: LoginRateLimiter             ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('\n✅ Testing ACTUAL production class from loginRateLimit.js');
console.log('   Using dependency injection for time and configuration\n');

// ============================================================================
// TEST 1: Fixed-Window Request Limit
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST 1: FIXED-WINDOW REQUEST LIMIT');
console.log('═══════════════════════════════════════════════════════════');

async function test1_FixedWindowRequestLimit() {
  const clock = new MockClock(1000000000);
  const limiter = new LoginRateLimiter({
    maxRequests: 5,
    windowMs: 60000,
    maxIPs: 100,
    clock: clock
  });
  
  console.log('\nStep 1: Make 5 requests (reach limit)');
  const ip = '192.168.1.100';
  
  for (let i = 1; i <= 5; i++) {
    const result = limiter.checkRequest(ip);
    console.log(`   Request ${i}: allowed=${result.allowed}`);
  }
  
  console.log('\nStep 2: 6th request should be blocked');
  const result6 = limiter.checkRequest(ip);
  console.log(`   Request 6: allowed=${result6.allowed}, reason='${result6.reason}'`);
  
  if (!result6.allowed && result6.reason === 'request_limit' && result6.retryAfter > 0) {
    logTest(
      'TEST 1: Fixed-window request limit enforced',
      'PASS',
      `Blocked at request 6 with reason='request_limit', retryAfter=${result6.retryAfter}s`
    );
  } else {
    logTest(
      'TEST 1: Fixed-window request limit enforced',
      'FAIL',
      `Expected blocked with request_limit, got allowed=${result6.allowed}, reason=${result6.reason}`
    );
  }
}

// ============================================================================
// TEST 2: Fixed-Window Expiration and Reset
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST 2: FIXED-WINDOW EXPIRATION AND RESET');
console.log('═══════════════════════════════════════════════════════════');

async function test2_FixedWindowExpiration() {
  const clock = new MockClock(2000000000);
  const limiter = new LoginRateLimiter({
    maxRequests: 5,
    windowMs: 60000,
    maxIPs: 100,
    clock: clock
  });
  
  const ip = '192.168.1.200';
  
  console.log('\nStep 1: Exhaust limit (5 requests)');
  for (let i = 1; i <= 5; i++) {
    limiter.checkRequest(ip);
  }
  
  const blocked = limiter.checkRequest(ip);
  console.log(`   6th request: blocked=${!blocked.allowed}`);
  
  console.log('\nStep 2: Advance time within window (30s)');
  clock.advance(30000);
  const stillBlocked = limiter.checkRequest(ip);
  console.log(`   Request at T+30s: blocked=${!stillBlocked.allowed}`);
  
  console.log('\nStep 3: Advance time beyond window (61s total)');
  clock.advance(31000);
  const allowed = limiter.checkRequest(ip);
  console.log(`   Request at T+61s: allowed=${allowed.allowed}`);
  
  const state = limiter.getState(ip);
  console.log(`   New window state: count=${state.count}`);
  
  if (!blocked.allowed && !stillBlocked.allowed && allowed.allowed && state.count === 1) {
    logTest(
      'TEST 2: Fixed-window expiration resets counter',
      'PASS',
      'Counter expired after 61s, new window started with count=1'
    );
  } else {
    logTest(
      'TEST 2: Fixed-window expiration resets counter',
      'FAIL',
      `Expected reset after window, got blocked=${!blocked.allowed}, stillBlocked=${!stillBlocked.allowed}, allowed=${allowed.allowed}, count=${state.count}`
    );
  }
}

// ============================================================================
// TEST 3: Counter Persistence Within Window
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST 3: COUNTER PERSISTENCE WITHIN WINDOW');
console.log('═══════════════════════════════════════════════════════════');

async function test3_CounterPersistence() {
  const clock = new MockClock(3000000000);
  const limiter = new LoginRateLimiter({
    maxRequests: 10,
    windowMs: 120000,
    maxIPs: 100,
    clock: clock
  });
  
  const ip = '192.168.1.300';
  
  console.log('\nStep 1: Make 3 requests at T=0');
  for (let i = 1; i <= 3; i++) {
    limiter.checkRequest(ip);
  }
  
  let state = limiter.getState(ip);
  console.log(`   State: count=${state.count}, remainingTime=${state.remainingTime}ms`);
  
  console.log('\nStep 2: Advance time by 60s (halfway)');
  clock.advance(60000);
  
  console.log('\nStep 3: Make 2 more requests');
  limiter.checkRequest(ip);
  limiter.checkRequest(ip);
  
  state = limiter.getState(ip);
  console.log(`   State: count=${state.count}, remainingTime=${state.remainingTime}ms`);
  
  if (state.count === 5 && state.remainingTime === 60000) {
    logTest(
      'TEST 3: Counter persists within window',
      'PASS',
      'Counter accumulated to 5, window time remaining: 60s'
    );
  } else {
    logTest(
      'TEST 3: Counter persists within window',
      'FAIL',
      `Expected count=5 with 60s remaining, got count=${state.count}, remaining=${state.remainingTime}ms`
    );
  }
}

// ============================================================================
// TEST 4: IP Capacity Limit Enforcement
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST 4: IP CAPACITY LIMIT ENFORCEMENT');
console.log('═══════════════════════════════════════════════════════════');

async function test4_IPCapacityLimit() {
  const clock = new MockClock(4000000000);
  const limiter = new LoginRateLimiter({
    maxRequests: 50,
    windowMs: 900000,
    maxIPs: 3,
    cleanupCooldown: 30000,
    clock: clock
  });
  
  console.log('\nStep 1: Add 3 unique IPs (reach capacity)');
  for (let i = 1; i <= 3; i++) {
    const result = limiter.checkRequest(`192.168.1.${i}`);
    console.log(`   IP ${i}: allowed=${result.allowed}`);
  }
  
  console.log(`   Map size: ${limiter.requests.size}/${limiter.maxIPs}`);
  
  console.log('\nStep 2: Attempt 4th IP (should be rejected)');
  const result4 = limiter.checkRequest('192.168.1.4');
  console.log(`   IP 4: allowed=${result4.allowed}, reason='${result4.reason}'`);
  
  if (!result4.allowed && result4.reason === 'capacity_exhaustion') {
    logTest(
      'TEST 4: IP capacity limit enforced',
      'PASS',
      `4th IP rejected with reason='capacity_exhaustion', retryAfter=${result4.retryAfter}s`
    );
  } else {
    logTest(
      'TEST 4: IP capacity limit enforced',
      'FAIL',
      `Expected capacity_exhaustion, got allowed=${result4.allowed}, reason=${result4.reason}`
    );
  }
}

// ============================================================================
// TEST 5: Existing IPs Bypass Capacity Check
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST 5: EXISTING IPS BYPASS CAPACITY CHECK');
console.log('═══════════════════════════════════════════════════════════');

async function test5_ExistingIPsBypassCapacity() {
  const clock = new MockClock(5000000000);
  const limiter = new LoginRateLimiter({
    maxRequests: 50,
    windowMs: 900000,
    maxIPs: 3,
    cleanupCooldown: 30000,
    clock: clock
  });
  
  console.log('\nStep 1: Fill capacity with 3 IPs');
  for (let i = 1; i <= 3; i++) {
    limiter.checkRequest(`192.168.1.${i}`);
  }
  
  console.log('\nStep 2: Verify new IP rejected');
  const newIP = limiter.checkRequest('192.168.1.99');
  console.log(`   New IP: allowed=${newIP.allowed}`);
  
  console.log('\nStep 3: Existing IP makes more requests');
  const existingIP1 = limiter.checkRequest('192.168.1.1');
  const existingIP2 = limiter.checkRequest('192.168.1.1');
  
  const state = limiter.getState('192.168.1.1');
  console.log(`   Existing IP (192.168.1.1): allowed=${existingIP2.allowed}, count=${state.count}`);
  
  if (!newIP.allowed && existingIP1.allowed && existingIP2.allowed && state.count === 3) {
    logTest(
      'TEST 5: Existing IPs bypass capacity check',
      'PASS',
      'New IP rejected, existing IP continued with count=3'
    );
  } else {
    logTest(
      'TEST 5: Existing IPs bypass capacity check',
      'FAIL',
      `Expected newIP blocked, existingIP allowed, got newIP=${newIP.allowed}, existingIP=${existingIP2.allowed}, count=${state.count}`
    );
  }
}

// ============================================================================
// TEST 6: Expired Record Cleanup
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST 6: EXPIRED RECORD CLEANUP');
console.log('═══════════════════════════════════════════════════════════');

async function test6_ExpiredRecordCleanup() {
  const clock = new MockClock(6000000000);
  const limiter = new LoginRateLimiter({
    maxRequests: 50,
    windowMs: 900000,
    maxIPs: 3,
    cleanupCooldown: 30000,
    clock: clock
  });
  
  console.log('\nStep 1: Add 3 IPs at capacity');
  for (let i = 1; i <= 3; i++) {
    limiter.checkRequest(`192.168.1.${i}`);
  }
  console.log(`   Map size: ${limiter.requests.size}`);
  
  console.log('\nStep 2: Advance time beyond window (901s)');
  clock.advance(901000);
  
  console.log('\nStep 3: Attempt new IP (triggers cleanup)');
  const result = limiter.checkRequest('192.168.1.99');
  console.log(`   Map size after cleanup: ${limiter.requests.size}`);
  console.log(`   New IP: allowed=${result.allowed}`);
  
  if (limiter.requests.size === 1 && result.allowed) {
    logTest(
      'TEST 6: Expired records cleaned up',
      'PASS',
      'All 3 expired IPs removed, new IP added, map size=1'
    );
  } else {
    logTest(
      'TEST 6: Expired records cleaned up',
      'FAIL',
      `Expected size=1 after cleanup, got size=${limiter.requests.size}, allowed=${result.allowed}`
    );
  }
}

// ============================================================================
// TEST 7: Cleanup Cooldown (CPU Protection)
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST 7: CLEANUP COOLDOWN (CPU PROTECTION)');
console.log('═══════════════════════════════════════════════════════════');

async function test7_CleanupCooldown() {
  const clock = new MockClock(7000000000);
  
  // Track cleanup calls by spying on cleanup method
  let cleanupCallCount = 0;
  const limiter = new LoginRateLimiter({
    maxRequests: 50,
    windowMs: 900000,
    maxIPs: 3,
    cleanupCooldown: 30000,
    clock: clock
  });
  
  // Spy on cleanup method
  const originalCleanup = limiter.cleanup.bind(limiter);
  limiter.cleanup = function() {
    cleanupCallCount++;
    return originalCleanup();
  };
  
  console.log('\nStep 1: Fill capacity');
  for (let i = 1; i <= 3; i++) {
    limiter.checkRequest(`192.168.1.${i}`);
  }
  
  console.log('\nStep 2: Trigger cleanup (1st capacity check)');
  limiter.checkRequest('192.168.1.99');
  console.log(`   Cleanup calls: ${cleanupCallCount}`);
  const count1 = cleanupCallCount;
  
  console.log('\nStep 3: Immediate retry (within cooldown)');
  limiter.checkRequest('192.168.1.98');
  console.log(`   Cleanup calls: ${cleanupCallCount}`);
  const count2 = cleanupCallCount;
  
  console.log('\nStep 4: Retry at 15s (still within cooldown)');
  clock.advance(15000);
  limiter.checkRequest('192.168.1.97');
  console.log(`   Cleanup calls: ${cleanupCallCount}`);
  const count3 = cleanupCallCount;
  
  console.log('\nStep 5: Retry at 31s (beyond cooldown)');
  clock.advance(16000);
  limiter.checkRequest('192.168.1.96');
  console.log(`   Cleanup calls: ${cleanupCallCount}`);
  const count4 = cleanupCallCount;
  
  if (count1 === 1 && count2 === 1 && count3 === 1 && count4 === 2) {
    logTest(
      'TEST 7: Cleanup cooldown prevents CPU amplification',
      'PASS',
      'Cleanup ran at T=0 and T=31s only (30s cooldown enforced)'
    );
  } else {
    logTest(
      'TEST 7: Cleanup cooldown prevents CPU amplification',
      'FAIL',
      `Expected cleanup at T=0 and T=31s only, got counts: ${count1}, ${count2}, ${count3}, ${count4}`
    );
  }
}

// ============================================================================
// TEST 8: Retry-After Calculation
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST 8: RETRY-AFTER CALCULATION');
console.log('═══════════════════════════════════════════════════════════');

async function test8_RetryAfterCalculation() {
  const clock = new MockClock(8000000000);
  const limiter = new LoginRateLimiter({
    maxRequests: 3,
    windowMs: 120000, // 2 minutes
    maxIPs: 100,
    clock: clock
  });
  
  const ip = '192.168.1.800';
  
  console.log('\nStep 1: Exhaust limit');
  for (let i = 1; i <= 3; i++) {
    limiter.checkRequest(ip);
  }
  
  console.log('\nStep 2: Check Retry-After immediately');
  const result1 = limiter.checkRequest(ip);
  console.log(`   Retry-After: ${result1.retryAfter}s (expected ~120s)`);
  
  console.log('\nStep 3: Advance 60s, check again');
  clock.advance(60000);
  const result2 = limiter.checkRequest(ip);
  console.log(`   Retry-After: ${result2.retryAfter}s (expected ~60s)`);
  
  const diff1 = Math.abs(result1.retryAfter - 120);
  const diff2 = Math.abs(result2.retryAfter - 60);
  
  if (diff1 <= 1 && diff2 <= 1) {
    logTest(
      'TEST 8: Retry-After accurately calculated',
      'PASS',
      `Retry-After decreases correctly: ${result1.retryAfter}s → ${result2.retryAfter}s`
    );
  } else {
    logTest(
      'TEST 8: Retry-After accurately calculated',
      'FAIL',
      `Expected ~120s and ~60s, got ${result1.retryAfter}s and ${result2.retryAfter}s`
    );
  }
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================

async function runAllTests() {
  await test1_FixedWindowRequestLimit();
  await test2_FixedWindowExpiration();
  await test3_CounterPersistence();
  await test4_IPCapacityLimit();
  await test5_ExistingIPsBypassCapacity();
  await test6_ExpiredRecordCleanup();
  await test7_CleanupCooldown();
  await test8_RetryAfterCalculation();
  
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║ TEST SUMMARY                                               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  
  console.log(`Total Tests: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / results.length) * 100).toFixed(1)}%`);
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('DETAILED RESULTS:');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  results.forEach((test, index) => {
    const icon = test.status === 'PASS' ? '✅' : '❌';
    console.log(`${index + 1}. ${icon} ${test.status}: ${test.name}`);
    console.log(`   ${test.details}\n`);
  });
  
  process.exit(failed > 0 ? 1 : 0);
}

runAllTests().catch(error => {
  console.error('\n❌ FATAL ERROR:', error);
  console.error(error.stack);
  process.exit(1);
});
