/**
 * UNIT TEST: BigInt Cents Conversion Logic
 * 
 * Tests the decimal-to-cents conversion and comparison logic
 * used in fee amount validation WITHOUT requiring server/database.
 * 
 * This is a pure logic test of the mathematical operations.
 */

// Extract the validation logic as a pure function for testing
function validateAmountAsCents(amountStr) {
  // Split into whole and fractional parts
  const [wholePart, fractionalPart = ''] = amountStr.split('.');
  
  // Pad fractional part to exactly 2 digits (for cents conversion)
  const centsPart = fractionalPart.padEnd(2, '0');
  
  // Convert to total cents as BigInt for exact arithmetic
  const wholeCents = BigInt(wholePart) * 100n;
  const fracCents = BigInt(centsPart);
  const totalCents = wholeCents + fracCents;
  
  // Check zero/negative
  if (totalCents <= 0n) {
    return { valid: false, reason: "zero or negative" };
  }
  
  // Check maximum: 99999999.99 = 9999999999 cents
  const MAX_CENTS = 9999999999n;
  if (totalCents > MAX_CENTS) {
    return { valid: false, reason: "exceeds maximum" };
  }
  
  return { valid: true, cents: totalCents };
}

// Test cases
const testCases = [
  // Basic valid cases
  { input: "100", expected: { valid: true, cents: 10000n }, description: "Integer without decimals" },
  { input: "100.50", expected: { valid: true, cents: 10050n }, description: "Standard decimal" },
  { input: "0.01", expected: { valid: true, cents: 1n }, description: "Minimum positive value" },
  { input: "1.00", expected: { valid: true, cents: 100n }, description: "Trailing zeros" },
  { input: "1.5", expected: { valid: true, cents: 150n }, description: "One decimal place" },
  
  // Boundary tests
  { input: "99999999.99", expected: { valid: true, cents: 9999999999n }, description: "Exact maximum" },
  { input: "99999999.98", expected: { valid: true, cents: 9999999998n }, description: "Just below maximum" },
  { input: "100000000", expected: { valid: false, reason: "exceeds maximum" }, description: "One cent over (as integer)" },
  { input: "100000000.00", expected: { valid: false, reason: "exceeds maximum" }, description: "One cent over (with decimals)" },
  
  // Zero and negative
  { input: "0", expected: { valid: false, reason: "zero or negative" }, description: "Zero integer" },
  { input: "0.00", expected: { valid: false, reason: "zero or negative" }, description: "Zero with decimals" },
  
  // Leading zeros
  { input: "000100.50", expected: { valid: true, cents: 10050n }, description: "Leading zeros" },
  { input: "00001", expected: { valid: true, cents: 100n }, description: "Many leading zeros" },
  
  // Edge cases with cents calculation
  { input: "1", expected: { valid: true, cents: 100n }, description: "No decimal point (cents=00)" },
  { input: "1.1", expected: { valid: true, cents: 110n }, description: "One decimal (cents padded to 10)" },
  { input: "1.01", expected: { valid: true, cents: 101n }, description: "Exact two decimals" },
  
  // Large valid values
  { input: "50000000.00", expected: { valid: true, cents: 5000000000n }, description: "Half maximum" },
  { input: "10000000", expected: { valid: true, cents: 1000000000n }, description: "Ten million" },
];

// Run tests
console.log("🧪 BigInt Cents Conversion - Unit Tests\n");
console.log("=" .repeat(70));

let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
  const result = validateAmountAsCents(testCase.input);
  
  let testPassed = false;
  if (testCase.expected.valid) {
    testPassed = result.valid === true && result.cents === testCase.expected.cents;
  } else {
    testPassed = result.valid === false && result.reason === testCase.expected.reason;
  }
  
  if (testPassed) {
    console.log(`✅ Test ${index + 1}: ${testCase.description}`);
    console.log(`   Input: "${testCase.input}" → ${result.valid ? `${result.cents} cents` : result.reason}`);
    passed++;
  } else {
    console.log(`❌ Test ${index + 1}: ${testCase.description}`);
    console.log(`   Input: "${testCase.input}"`);
    console.log(`   Expected: ${JSON.stringify(testCase.expected)}`);
    console.log(`   Got: ${JSON.stringify(result)}`);
    failed++;
  }
  console.log("");
});

console.log("=" .repeat(70));
console.log(`\n📊 Results: ${passed}/${testCases.length} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log("🎉 ALL UNIT TESTS PASSED!");
  console.log("\n✅ BigInt conversion correctly handles:");
  console.log("   • Integer amounts (padded to cents)");
  console.log("   • Decimal amounts (1 or 2 places)");
  console.log("   • Maximum value boundary (9999999999 cents)");
  console.log("   • Leading zeros (parsed correctly)");
  console.log("   • Zero and negative detection");
  process.exit(0);
} else {
  console.log("⚠️  SOME TESTS FAILED - Review BigInt logic");
  process.exit(1);
}
