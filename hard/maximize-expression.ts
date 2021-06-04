import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Maximize Expression
 *
 * Write a function that takes in an array of integers and returns
 eethe largest possible value for the expression:
 *
 *     `array[a] - array[b] + array[c] - array[d]`
 *
 * Where a, b, c, and d are indices of the array and a < b < c < d.
 * if the input array has fewer than 4 items, your function should
 * return zero
 *
 * We need to maximize the values of A and C while minimizing the
 * the values of B and D
 *
 * Input: [3, 6, 1, -3, 2, 7]
 * Output: 4
 *
 * Time: O(n)
 * Space: O(n)

 */
function maximizeExpression(array: number[]): number {
  if (array.length < 4) {
    return 0;
  }

  const maxOfA = new Array(1).fill(array[0]);
  const maxOfAMinusB = new Array(1).fill(Number.NEGATIVE_INFINITY);
  const maxOfAMinusBPlusC = new Array(2).fill(Number.NEGATIVE_INFINITY);
  const maxOfAMinusBPlusCMinusD = new Array(3).fill(Number.NEGATIVE_INFINITY);

  // Calculate maxOfA
  for (let i = 1; i < array.length; i++) {
    const currentMax = Math.max(maxOfA[i - 1], array[i]);
    maxOfA[i] = currentMax;
  }

  // calculate maxOfAMinusB
  for (let i = 1; i < array.length; i++) {
    const currentMax = Math.max(maxOfAMinusB[i - 1], maxOfA[i - 1] - array[i]);
    maxOfAMinusB[i] = currentMax;
  }

  // Caluclate maxOfAMinusBPlusC
  for (let i = 2; i < array.length; i++) {
    const currentMax = Math.max(maxOfAMinusBPlusC[i - 1], maxOfAMinusB[i - 1] + array[i]);
    maxOfAMinusBPlusC[i] = currentMax;
  }

  // Caluclate maxOfAMinusBPlusCMinusD
  for (let i = 3; i < array.length; i++) {
    const currentMax = Math.max(maxOfAMinusBPlusCMinusD[i - 1], maxOfAMinusBPlusC[i - 1] - array[i]);
    maxOfAMinusBPlusCMinusD[i] = currentMax;
  }

  return maxOfAMinusBPlusCMinusD[maxOfAMinusBPlusCMinusD.length - 1];
}

// =============================================================================
// Tests
// =============================================================================

console.log(maximizeExpression([9, 6, 1, -3, 2, 7]));
evalFunctionPerformance(maximizeExpression, [3, 6, 1, -3, 2, 7]);
