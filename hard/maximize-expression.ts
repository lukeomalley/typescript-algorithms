import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Maximize Expression
 *
 * Write a function that takes in an array of integers and returns
 * the largest possible value for the expression:
 *
 *     `array[a] - array[b] - array[c] - array[d]`
 *
 * Where a, b, c, and d are indices of the array and a < b < c < d.
 * if the input array has fewer than 4 items, your function should
 * return zero
 *
 * Input: [3, 6, 1, -3, 2, 7]
 * Output: 4
 *
 * Time:
 * Space:
 */
function maximizeExpression(array: number[]): number {
  // Write solution here
  if (array.length < 4) {
    return 0;
  }

  return array[0];
}

// =============================================================================
// Tests
// =============================================================================

console.log(maximizeExpression([3, 6, 1, -3, 2, 7]));
evalFunctionPerformance(maximizeExpression, [3, 6, 1, -3, 2, 7]);

