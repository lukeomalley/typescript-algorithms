import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * First Duplicate Value
 *
 * Given an array of integers between 1 and n, inclusive, where n is the length
 * of the array, white a function that returns the first integer that appears
 * more than once (when the array is read from left to right).
 *
 * In other words, out of all of the integers that might occur more than once
 * in the input array, your function should return the one whose first duplicate
 * value has the minimum index.
 *
 * If no integer appears more than once, your function should return -1.
 *
 * Note: you may mutat the input array.
 *
 * Input: [2, 1, 5, 3, 3, 2, 4]
 * Output: 3
 *
 * Time: O(n)
 * Space: O(n)
 */
function firstDuplicateValue(array: number[]): any {
  const numberCounts: { [key: number]: number } = {};
  for (const num of array) {
    if (numberCounts[num]) {
      return num;
    }

    numberCounts[num] = 1;
  }

  return -1;
}

// =============================================================================
// Tests
// =============================================================================

console.log(firstDuplicateValue([2, 1, 5, 2, 3, 3, 4]));
evalFunctionPerformance(firstDuplicateValue, [2, 1, 5, 2, 3, 3, 4]);
