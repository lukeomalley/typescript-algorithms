import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Two Number Sum
 *
 * Write a function that takes in a non-empty array of distinct integers
 * and an integer representing a target sum. If any two numbers in the
 * input array sum up to the target sum, the function should return them
 * in an array, in any order. If no two numbers sum up to the target sum,
 * the function should return an empty array
 *
 * Input: [1, 2, 1, 1, 1, 1, 7], 9
 * Output: [2, 7]
 *
 * Time: O(n)
 * Space: O(n)
 */
function twoNumberSum(numbers: number[], targetSum: number): number[] {
  const seenNumbers: { [key: number]: boolean } = {};

  for (const num of numbers) {
    const remainingToTarget = targetSum - num;
    if (remainingToTarget in seenNumbers) {
      return [num, remainingToTarget];
    }

    seenNumbers[num] = true;
  }

  return [];
}

// =============================================================================
// Tests
// =============================================================================

console.log(twoNumberSum([1, 2, 1, 1, 1, 1, 7], 9));
evalFunctionPerformance(twoNumberSum, [1, 2, 1, 1, 1, 1, 7], 9);
