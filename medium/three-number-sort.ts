import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Three Number Sort
 *
 * You're given an array of integers and another array of three distinct integers.
 * The first array is guaranteed to only contain integers that are in the second
 * array, and the second array represents the desired order for the integers in
 * the first array. For example, a second array of [x, y, z] represents a desired
 * order of [x, x, ..., y, y, y, y ..., z, z, z]
 *
 * Write a function that sorts the first array according to the desired order
 * of the second array. The function should preform this in place, and it should
 * not use any auxiliary space.
 *
 * Input: [1, 0, 0, -1, -1, 0, 1, 1], [0, 1, -1]
 * Output: [0, 0, 0, 1, 1, 1, -1, -1]
 *
 * Time: O(n)
 * Space: O(1)
 */
function threeNumberSort(array: number[], order: number[]): number[] {
  // Forward pass
  let firstIdx = 0;
  for (let i = 0; i < array.length; i++) {
    const currentNumber = array[i];
    if (currentNumber === order[0]) {
      swapElements(array, firstIdx, i);
      firstIdx += 1;
    }
  }

  // Reverse pass
  let lastIdx = array.length - 1;
  for (let i = array.length - 1; i >= 0; i--) {
    const currentNumber = array[i];
    if (currentNumber === order[2]) {
      swapElements(array, lastIdx, i);
      lastIdx -= 1;
    }
  }

  return array;
}

function swapElements(array: number[], i: number, j: number): number[] {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
  return array;
}

// =============================================================================
// Tests
// =============================================================================

console.log(threeNumberSort([1, 0, 0, -1, -1, 0, 1, 1], [0, 1, -1]));
// evalFunctionPerformance(threeNumberSort, [1, 0, 0, -1, -1, 0, 1, 1], [0, 1, -1])
