import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Array of Products
 *
 * Write a function that takes in an non-empty array of integers and returns
 * an array of the same length, where each element in the output array is
 * equal to the product of every other number in the input array
 *
 * Note: Do not use division to solve this problem
 *
 * Input: [5, 1, 4, 2]
 * Output: [8, 40, 10, 20]
 *
 * Time: O(n)
 * Space: O(1)
 */
function arrayOfProducts(array: number[]): number[] {
  // Forward pass
  const leftProducts = array.map(() => 1);
  let leftRunningProduct = 1;
  for (let i = 0; i < array.length; i++) {
    leftProducts[i] = leftRunningProduct;
    leftRunningProduct *= array[i];
  }

  // Reverse pass
  const rightProducts = array.map(() => 1);
  let rightRunningProduct = 1;
  for (let i = array.length - 1; i > -1; i--) {
    rightProducts[i] = rightRunningProduct;
    rightRunningProduct *= array[i];
  }

  return array.map((_, i) => leftProducts[i] * rightProducts[i]);
}

// =============================================================================
// Tests
// =============================================================================

console.log(arrayOfProducts([5, 1, 4, 2]));
evalFunctionPerformance(arrayOfProducts, [5, 1, 4, 2]);
