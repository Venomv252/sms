/**
 * UNIT TESTS FOR LOGIN RATE LIMITER
 * 
 * These tests attempt to verify:
 * - Test A: Fixed-window expiration and reset
 * - Test B: Maximum IP capacity enforcement
 * - Test C: Cleanup cooldown behavior
 * 
 * LIMITATION REPORT:
 * The current LoginRateLimiter implementation has the following constraints
 * that prevent true unit testing:
 * 
 * 1. Uses Date.now() directly (not mockable)
 * 2. Imports config globally (not injectable)
 * 3. LoginRateLimiter class not exported (cannot instantiate)
 * 4. Singleton pattern (cannot create isolated test instances)
 * 
 * PROPOSED MINIMAL CHANGES (for future implementation):
 * 
 * Option 1: Export class and add optional constructor parameters
 * ```javascript
 * export class LoginRateLimiter {
 *   constructor(options = {}) {
 *     this.maxRequests = options.maxRequests || config.rateLimit.login.maxRequests;
 *     this.windowMs = options.windowMs || config.rateLimit.login.windowMs;
 *     this.maxIPs = options.maxIPs || config.rateLimit.login.maxIPs;
 *     this.now = options.now || (() => Date.now()); // Injectable clock
 *     // ... rest of constructor
 *   }
 * }
 * ```
 * 
 * Option 2: Export class with clock injection only
 * ```javascript
 * export class LoginRateLimiter {
 *   constructor(clock = Date) {
 *     this.clock = clock;
 *     // Use this.clock.now() instead of Date.now()
 *   }
 * }
 * ```
 * 
 * For now, these tests use workarounds to demonstrate the test scenarios.
 */

import assert from 'assert';

// Mock configuration for testing
const testConfig = {
  maxRequests: 5,      // Low limit for fast testing
  windowMs: 60000,     // 1 minute window
  maxIPs: 3,           // Small capacity for testing
  cleanupCooldown: 30000 // 30 seconds
};

// Results tracking
const results = [];

function logTest(name, status, details) {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`\n${icon} ${status}: ${name}`);
  console.log(`   ${details}`);
  results.push({ name, status, details });
}

/**
 * MOCK RATE LIMITER CLASS
 * This is a simplified version for unit testing only.
 * Mimics the production implementation but with injectable dependencies.
 */
class TestableRateLimiter {
  constructor(options = {}) {
    this.maxRequests = options.maxRequests || 50;
    this.windowMs = options.windowMs || 900000;
    this.maxIPs = options.maxIPs || 50000;
    this.cleanupCooldown = options.cleanupCooldown || 30000;
    
    // Injectable clock for time mocking
    this.clock = options.clock || { now: () => Date.now() };
    
    this.requests = new Map();
    this.lastCapacityCleanup = 0;
    this.cleanupCallCount = 0; // For testing
  }
  
  checkRequest(ip) {
    const now = this.clock.now();
    const record = this.requests.get(ip);
    
    // Check if existing record is expired
    if (record && now >= record.resetTime) {
      this.requests.delete(ip);
    }
    
    // Get current count
    const currentRecord = this.requests.get(ip);
    const currentCount = currentRecord ? currentRecord.count : 0;
    
    // Check if limit exceeded for existing IP
    if (currentCount >= this.maxRequests) {
      const retryAfterMs = currentRecord.resetTime - now;
      const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
      
      return {
        allowed: false,
        retryAfter: retryAfterSeconds > 0 ? retryAfterSeconds : 1,
        reason: 'request_limit'
      };
    }
    
    // For new IPs: Check if Map is at capacity
    if (!currentRecord) {
      if (this.requests.size >= this.maxIPs) {
        // Map at capacity - check if we can run cleanup
        const timeSinceLastCleanup = now - this.lastCapacityCleanup;
        
        // Only run cleanup if cooldown has elapsed
        if (timeSinceLastCleanup >= this.cleanupCooldown) {
          this.cleanup();
          this.lastCapacityCleanup = now;
        }
        
        // Check again after cleanup
        if (this.requests.size >= this.maxIPs) {
          return {
            allowed: false,
            retryAfter: 60,
            reason: 'capacity_exhaustion'
          };
        }
      }
    }
    
    // Increment counter
    if (currentRecord) {
      currentRecord.count++;
    } else {
      this.requests.set(ip, {
        count: 1,
        resetTime: now + this.windowMs,
      });
    }
    
    return { allowed: true, retryAfter: null, reason: null };
  }
  
  cleanup() {
    this.cleanupCallCount++;
    const now = this.clock.now();
    for (const [ip, record] of this.requests.entries()) {
      if (now >= record.resetTime) {
        this.requests.delete(ip);
      }
    }
  }
  
  getState(ip) {
    const now = this.clock.now();
    const record = this.requests.get(ip);
    
    if (!record || now >= record.resetTime) {
      return { count: 0, isExpired: true };
    }
    
    return {
      count: record.count,
      resetTime: record.resetTime,
      isExpired: false,
      remainingTime: record.resetTime - now
    };
  }
}

/**
 * MOCK CLOCK for time manipulation
 */
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
  
  set(time) {
    this.currentTime = time;
  }
}

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║   UNIT TESTS: LOGIN RATE LIMITER                          ║');
console.log('╚════════════════════════════════════════════════════════════╝');

console.log('\n⚠️  NOTE: Using TestableRateLimiter mock class');
console.log('   Production code uses Date.now() directly and cannot be unit tested');
console.log('   These tests demonstrate EXPECTED behavior with mocked time\n');

// ============================================================================
// TEST A: Fixed-Window Expiration
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST A: FIXED-WINDOW EXPIRATION AND RESET');
console.log('═══════════════════════════════════════════════════════════');

async function testA_FixedWindowExpiration() {
  const clock = new MockClock(1000000000);
  const limiter = new TestableRateLimiter({
    maxRequests: 5,
    windowMs: 60000, // 1 minute
    maxIPs: 100,
    clock: clock
  });
  
  const testIP = '192.168.1.100';
  
  console.log('\nStep 1: Make 5 requests (reach limit)');
  for (let i = 1; i <= 5; i++) {
    const result = limiter.checkRequest(testIP);
    console.log(`   Request ${i}: ${result.allowed ? 'ALLOWED' : 'BLOCKED'}`);
  }
  
  const state1 = limiter.getState(testIP);
  console.log(`   State: count=${state1.count}, resetTime=${state1.resetTime}`);
  
  console.log('\nStep 2: Attempt 6th request (should be blocked)');
  const result6 = limiter.checkRequest(testIP);
  console.log(`   Request 6: ${result6.allowed ? 'ALLOWED' : 'BLOCKED'}`);
  console.log(`   Reason: ${result6.reason}`);
  console.log(`   Retry-After: ${result6.retryAfter} seconds`);
  
  if (!result6.allowed && result6.reason === 'request_limit') {
    logTest(
      'TEST A.1: Rate limit enforced',
      'PASS',
      `6th request blocked with reason='${result6.reason}', retryAfter=${result6.retryAfter}`
    );
  } else {
    logTest(
      'TEST A.1: Rate limit enforced',
      'FAIL',
      `Expected blocked with request_limit, got allowed=${result6.allowed}, reason=${result6.reason}`
    );
  }
  
  console.log('\nStep 3: Advance time by 30 seconds (still within window)');
  clock.advance(30000);
  const result7 = limiter.checkRequest(testIP);
  console.log(`   Request 7: ${result7.allowed ? 'ALLOWED' : 'BLOCKED'}`);
  console.log(`   Time advanced: 30s (window=60s)`);
  
  if (!result7.allowed) {
    logTest(
      'TEST A.2: Still blocked within window',
      'PASS',
      'Request correctly blocked 30s into 60s window'
    );
  } else {
    logTest(
      'TEST A.2: Still blocked within window',
      'FAIL',
      'Request should remain blocked within window'
    );
  }
  
  console.log('\nStep 4: Advance time beyond window (61 seconds total)');
  clock.advance(31000); // Now 61 seconds from start
  const result8 = limiter.checkRequest(testIP);
  console.log(`   Request 8: ${result8.allowed ? 'ALLOWED' : 'BLOCKED'}`);
  console.log(`   Time advanced: 61s total (beyond 60s window)`);
  
  if (result8.allowed) {
    logTest(
      'TEST A.3: Window expired, counter reset',
      'PASS',
      'Request allowed after window expiration, counter reset to 1'
    );
  } else {
    logTest(
      'TEST A.3: Window expired, counter reset',
      'FAIL',
      `Request should be allowed after expiration, got allowed=${result8.allowed}`
    );
  }
  
  const state2 = limiter.getState(testIP);
  console.log(`   New state: count=${state2.count}, isExpired=${state2.isExpired}`);
  
  console.log('\nStep 5: Verify new window started');
  for (let i = 2; i <= 5; i++) {
    const result = limiter.checkRequest(testIP);
    console.log(`   Request ${i}/5 in new window: ${result.allowed ? 'ALLOWED' : 'BLOCKED'}`);
  }
  
  const result9 = limiter.checkRequest(testIP);
  console.log(`   Request 6/5 in new window: ${result9.allowed ? 'ALLOWED' : 'BLOCKED'}`);
  
  if (!result9.allowed) {
    logTest(
      'TEST A.4: New window has independent limit',
      'PASS',
      'New window enforces same 5-request limit'
    );
  } else {
    logTest(
      'TEST A.4: New window has independent limit',
      'FAIL',
      'New window should enforce limit independently'
    );
  }
}

// ============================================================================
// TEST B: Maximum IP Capacity
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST B: MAXIMUM IP CAPACITY ENFORCEMENT');
console.log('═══════════════════════════════════════════════════════════');

async function testB_MaximumIPCapacity() {
  const clock = new MockClock(2000000000);
  const limiter = new TestableRateLimiter({
    maxRequests: 50,
    windowMs: 900000,
    maxIPs: 3, // Small capacity for testing
    cleanupCooldown: 30000,
    clock: clock
  });
  
  console.log('\nStep 1: Add 3 unique IPs (reach capacity)');
  for (let i = 1; i <= 3; i++) {
    const ip = `192.168.1.${i}`;
    const result = limiter.checkRequest(ip);
    console.log(`   IP ${i} (${ip}): ${result.allowed ? 'ALLOWED' : 'BLOCKED'}`);
  }
  
  console.log(`   Map size: ${limiter.requests.size}/${limiter.maxIPs}`);
  
  if (limiter.requests.size === 3) {
    logTest(
      'TEST B.1: Capacity reached',
      'PASS',
      `Map contains ${limiter.requests.size} IPs (capacity=${limiter.maxIPs})`
    );
  } else {
    logTest(
      'TEST B.1: Capacity reached',
      'FAIL',
      `Expected 3 IPs, got ${limiter.requests.size}`
    );
  }
  
  console.log('\nStep 2: Attempt to add 4th IP (should be rejected)');
  const ip4 = '192.168.1.4';
  const result4 = limiter.checkRequest(ip4);
  console.log(`   IP 4 (${ip4}): ${result4.allowed ? 'ALLOWED' : 'BLOCKED'}`);
  console.log(`   Reason: ${result4.reason}`);
  console.log(`   Retry-After: ${result4.retryAfter}`);
  
  if (!result4.allowed && result4.reason === 'capacity_exhaustion') {
    logTest(
      'TEST B.2: New IP rejected at capacity',
      'PASS',
      `4th IP blocked with reason='capacity_exhaustion', retryAfter=${result4.retryAfter}s`
    );
  } else {
    logTest(
      'TEST B.2: New IP rejected at capacity',
      'FAIL',
      `Expected capacity_exhaustion, got allowed=${result4.allowed}, reason=${result4.reason}`
    );
  }
  
  console.log('\nStep 3: Verify existing IPs can still make requests');
  const existingIP = '192.168.1.1';
  const resultExisting = limiter.checkRequest(existingIP);
  console.log(`   Existing IP (${existingIP}): ${resultExisting.allowed ? 'ALLOWED' : 'BLOCKED'}`);
  
  const stateExisting = limiter.getState(existingIP);
  console.log(`   Count: ${stateExisting.count}`);
  
  if (resultExisting.allowed && stateExisting.count === 2) {
    logTest(
      'TEST B.3: Existing IP unaffected by capacity',
      'PASS',
      'Existing IP can make requests, counter incremented to 2'
    );
  } else {
    logTest(
      'TEST B.3: Existing IP unaffected by capacity',
      'FAIL',
      `Expected allowed with count=2, got allowed=${resultExisting.allowed}, count=${stateExisting.count}`
    );
  }
  
  console.log('\nStep 4: Expire one IP by advancing time');
  clock.advance(901000); // Advance beyond 900s window
  console.log(`   Time advanced: 901s (beyond 900s window)`);
  console.log(`   Note: All 3 IPs created at same time, so all will expire`);
  
  // Trigger cleanup by attempting new IP
  const initialCleanupCount = limiter.cleanupCallCount;
  const ip5 = '192.168.1.5';
  const result5 = limiter.checkRequest(ip5);
  
  console.log(`   Cleanup triggered: ${limiter.cleanupCallCount > initialCleanupCount ? 'YES' : 'NO'}`);
  console.log(`   Map size after cleanup: ${limiter.requests.size}`);
  console.log(`   IP 5 (${ip5}): ${result5.allowed ? 'ALLOWED' : 'BLOCKED'}`);
  
  // CORRECTED ASSERTION: All 3 original IPs expired (same resetTime),
  // so Map should contain only the new IP (size=1)
  if (result5.allowed && limiter.requests.size === 1) {
    logTest(
      'TEST B.4: Cleanup frees space, new IP allowed',
      'PASS',
      `All expired IPs removed, new IP accepted, map size=${limiter.requests.size}`
    );
  } else {
    logTest(
      'TEST B.4: Cleanup frees space, new IP allowed',
      'FAIL',
      `Expected allowed with size=1, got allowed=${result5.allowed}, size=${limiter.requests.size}`
    );
  }
}

// ============================================================================
// TEST C: Cleanup Cooldown
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log('TEST C: CLEANUP COOLDOWN (CPU PROTECTION)');
console.log('═══════════════════════════════════════════════════════════');

async function testC_CleanupCooldown() {
  const clock = new MockClock(3000000000);
  const limiter = new TestableRateLimiter({
    maxRequests: 50,
    windowMs: 900000,
    maxIPs: 3,
    cleanupCooldown: 30000, // 30 seconds
    clock: clock
  });
  
  console.log('\nStep 1: Fill capacity with 3 IPs');
  for (let i = 1; i <= 3; i++) {
    limiter.checkRequest(`192.168.1.${i}`);
  }
  console.log(`   Map size: ${limiter.requests.size}/${limiter.maxIPs}`);
  
  console.log('\nStep 2: Attempt 4th IP (triggers cleanup)');
  const initialCleanupCount = limiter.cleanupCallCount;
  const result1 = limiter.checkRequest('192.168.1.4');
  const cleanup1Count = limiter.cleanupCallCount;
  
  console.log(`   Cleanup count before: ${initialCleanupCount}`);
  console.log(`   Cleanup count after: ${cleanup1Count}`);
  console.log(`   Cleanup triggered: ${cleanup1Count > initialCleanupCount ? 'YES' : 'NO'}`);
  console.log(`   Result: ${result1.allowed ? 'ALLOWED' : 'BLOCKED (capacity)'}`);
  
  if (cleanup1Count > initialCleanupCount) {
    logTest(
      'TEST C.1: First capacity attempt triggers cleanup',
      'PASS',
      `Cleanup count increased from ${initialCleanupCount} to ${cleanup1Count}`
    );
  } else {
    logTest(
      'TEST C.1: First capacity attempt triggers cleanup',
      'FAIL',
      'Cleanup should have been triggered'
    );
  }
  
  console.log('\nStep 3: Attempt 5th IP immediately (within cooldown)');
  const result2 = limiter.checkRequest('192.168.1.5');
  const cleanup2Count = limiter.cleanupCallCount;
  
  console.log(`   Time elapsed: 0s (cooldown=30s)`);
  console.log(`   Cleanup count: ${cleanup2Count}`);
  console.log(`   Cleanup triggered: ${cleanup2Count > cleanup1Count ? 'YES' : 'NO'}`);
  console.log(`   Result: ${result2.allowed ? 'ALLOWED' : 'BLOCKED (capacity)'}`);
  
  if (cleanup2Count === cleanup1Count) {
    logTest(
      'TEST C.2: Cleanup NOT triggered within cooldown',
      'PASS',
      `Cleanup count remained at ${cleanup2Count} (cooldown active)`
    );
  } else {
    logTest(
      'TEST C.2: Cleanup NOT triggered within cooldown',
      'FAIL',
      `Cleanup should not run within cooldown, count=${cleanup2Count}`
    );
  }
  
  console.log('\nStep 4: Attempt 6th IP at 15 seconds (still within cooldown)');
  clock.advance(15000);
  const result3 = limiter.checkRequest('192.168.1.6');
  const cleanup3Count = limiter.cleanupCallCount;
  
  console.log(`   Time elapsed: 15s (cooldown=30s)`);
  console.log(`   Cleanup count: ${cleanup3Count}`);
  console.log(`   Cleanup triggered: ${cleanup3Count > cleanup2Count ? 'YES' : 'NO'}`);
  
  if (cleanup3Count === cleanup2Count) {
    logTest(
      'TEST C.3: Cleanup NOT triggered at 15s',
      'PASS',
      'Cleanup correctly skipped at 15s (cooldown=30s)'
    );
  } else {
    logTest(
      'TEST C.3: Cleanup NOT triggered at 15s',
      'FAIL',
      'Cleanup should not run before 30s cooldown'
    );
  }
  
  console.log('\nStep 5: Attempt 7th IP at 31 seconds (beyond cooldown)');
  clock.advance(16000); // Now 31s total
  const result4 = limiter.checkRequest('192.168.1.7');
  const cleanup4Count = limiter.cleanupCallCount;
  
  console.log(`   Time elapsed: 31s (cooldown=30s)`);
  console.log(`   Cleanup count: ${cleanup4Count}`);
  console.log(`   Cleanup triggered: ${cleanup4Count > cleanup3Count ? 'YES' : 'NO'}`);
  
  if (cleanup4Count > cleanup3Count) {
    logTest(
      'TEST C.4: Cleanup triggered after cooldown expires',
      'PASS',
      `Cleanup count increased to ${cleanup4Count} after 31s (cooldown=30s)`
    );
  } else {
    logTest(
      'TEST C.4: Cleanup triggered after cooldown expires',
      'FAIL',
      `Cleanup should run after cooldown, count=${cleanup4Count}`
    );
  }
  
  console.log('\nStep 6: Verify cooldown resets');
  const result5 = limiter.checkRequest('192.168.1.8');
  const cleanup5Count = limiter.cleanupCallCount;
  
  console.log(`   Immediate retry: cleanup count=${cleanup5Count}`);
  console.log(`   Cleanup triggered: ${cleanup5Count > cleanup4Count ? 'YES (WRONG)' : 'NO (CORRECT)'}`);
  
  if (cleanup5Count === cleanup4Count) {
    logTest(
      'TEST C.5: Cooldown resets after cleanup',
      'PASS',
      'New 30s cooldown period started, immediate retry skipped cleanup'
    );
  } else {
    logTest(
      'TEST C.5: Cooldown resets after cleanup',
      'FAIL',
      'Cooldown should have reset after last cleanup'
    );
  }
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================

async function runAllTests() {
  await testA_FixedWindowExpiration();
  await testB_MaximumIPCapacity();
  await testC_CleanupCooldown();
  
  // Summary
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   UNIT TEST SUMMARY                                        ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const blocked = results.filter(r => r.status === 'BLOCKED').length;
  
  console.log(`Total Tests: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Blocked: ${blocked}`);
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('DETAILED RESULTS:');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  results.forEach((test, index) => {
    const icon = test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${index + 1}. ${icon} ${test.status}: ${test.name}`);
    console.log(`   ${test.details}\n`);
  });
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('LIMITATION REPORT:');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('⚠️  CURRENT PRODUCTION CODE CANNOT BE UNIT TESTED\n');
  
  console.log('Issues:');
  console.log('1. LoginRateLimiter class not exported');
  console.log('2. Uses Date.now() directly (cannot mock time)');
  console.log('3. Imports config globally (cannot inject test config)');
  console.log('4. Singleton pattern (cannot create isolated instances)\n');
  
  console.log('Impact:');
  console.log('- Cannot test fixed-window expiration (requires time mocking)');
  console.log('- Cannot test capacity with small limits (hardcoded to 50,000)');
  console.log('- Cannot test cleanup cooldown (requires time control)\n');
  
  console.log('RECOMMENDED CHANGES (minimal impact):');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('Change 1: Export the class');
  console.log('```javascript');
  console.log('export class LoginRateLimiter {');
  console.log('  // ... existing code');
  console.log('}');
  console.log('```\n');
  
  console.log('Change 2: Add constructor parameter for dependency injection');
  console.log('```javascript');
  console.log('constructor(options = {}) {');
  console.log('  this.config = options.config || config.rateLimit.login;');
  console.log('  this.clock = options.clock || Date;');
  console.log('  this.requests = new Map();');
  console.log('  this.lastCapacityCleanup = 0;');
  console.log('  this.capacityCleanupCooldown = 30000;');
  console.log('}');
  console.log('```\n');
  
  console.log('Change 3: Use injected clock');
  console.log('```javascript');
  console.log('checkRequest(ip) {');
  console.log('  const now = this.clock.now(); // Instead of Date.now()');
  console.log('  // ... rest of method');
  console.log('}');
  console.log('```\n');
  
  console.log('Benefits:');
  console.log('- Maintains backward compatibility (default parameters)');
  console.log('- Allows unit testing with mocked time');
  console.log('- Enables testing with custom configuration');
  console.log('- Does not change production behavior\n');
  
  console.log('Alternative (if minimizing changes):');
  console.log('Export class and create factory function for production use\n');
  
  process.exit(failed > 0 ? 1 : 0);
}

runAllTests().catch(error => {
  console.error('\n❌ FATAL ERROR:', error);
  console.error(error.stack);
  process.exit(1);
});
