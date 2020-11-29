import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Three Number Sort
 *
 * You're given a non-empty array of arrays where each subarray holds three
 * integers and represents a disk. These integers denote each disk's width,
 * depth, and height, respectively. Your goal is to stack up the disks and to
 * maximize the total height of the stack. A disk must have a strictly smaller
 * width, depth, and height than any other disk below it.
 *
 * Write a function that returns an array of the disks in the final stack,
 * starting with the top disk and ending with the bottom disk. Note that you
 * can't rotate disks; in other words, the integers in each subarray must
 * represent [width, depth, height] at all times.
 *
 * You can assume that there will only be one stack with the greatest total height.
 *
 * Input: [[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]]
 * Output: [[2, 1, 2], [3, 2, 3], [4, 4, 5]]
 */
function threeNumberSort(array: number[], order: number[]): number[] {
  console.log(array);
  console.log(order);
  return [];
}

// =============================================================================
// Tests
// =============================================================================

console.log(threeNumberSort([0, 1, 1, 1, 1, -1, -1, -1, 1, 1, 0, -1, -1, 0, 0, 0], [-1, 0, 1]));
evalFunctionPerformance(threeNumberSort, [0, 1, 1, 1, 1, -1, -1, -1, 1, 1, 0, -1, -1, 0, 0, 0], [-1, 0, 1]);
