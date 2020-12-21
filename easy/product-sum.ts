import evalFunctionPerformance from '../lib/evalFunctionPerformance';

type SpecialArray = (number | SpecialArray)[];

/**
 * Product Sum
 *
 * Write a function that takes in a "special" array and returns its product sum.
 * A "special" array is a non-empty array that contains either integers of other
 * "special" arrays. The product sum of a "special" array is the sum of its
 * elements , where "special" arrays inside are summed themselves and then
 * multiplied by their level of depth.
 *
 * The depth of a "special" array is how far nested it is. For instance, the depth
 * of [] is 1; the depth of the inner array in [[]] is 2; the depth of the innermost
 * array in [[[]]] is 3.
 *
 * Therefore, the product sum of [x, y] is x + y; the product sum of [x, [y, z]] is
 * x + (2 * (y + z))
 *
 * Input: [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
 * Output: 12
 *
 * Time: O(n)
 * Space: O(depth)
 */
function productSum(array: SpecialArray, depth = 1): number {
  let sum = 0;
  for (const el of array) {
    if (Array.isArray(el)) {
      sum += productSum(el, depth + 1);
    } else {
      sum += <number>el;
    }
  }

  return depth * sum;
}

// =============================================================================
// Tests
// =============================================================================

console.log(productSum([5, 2, [7, -1], 3, [6, [-13, 8], 4]]));
evalFunctionPerformance(productSum, [5, 2, [7, -1], 3, [6, [-13, 8], 4]]);
