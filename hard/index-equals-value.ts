import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Index Equals Value
 * Category: Arrays
 *
 * Write a function that takes in a sorted array of distinct integers and
 * returns the first index in the array that is equal to the value at that
 * index. In other words, your function should return the minimum index
 * where `index === array[index]
 *
 * If there is no such index, your function should return -1
 *
 * Time:
 * Space:
 */
function indexEqualsValue(array: number[]): number {
  for (let i = 0; i < array.length; i++) {
    if (i === array[i]) {
      return i;
    }
  }

  return -1;
}

// =============================================================================
// Tests
// =============================================================================

console.log(indexEqualsValue([1, 1, 3, 4, 5]));
evalFunctionPerformance(indexEqualsValue, [1, 2, 3, 4, 4]);
