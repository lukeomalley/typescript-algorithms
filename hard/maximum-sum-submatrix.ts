import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Maximum Sum Submatrix
 *
 * You're given a two-dimensional array (matrix) of potentially unequal height
 * and width that's filled with integers. You're also given a positive integer
 * size. Write a function tha tresutns the maximum sum that can be generated
 * from a submatrix with dimensions size * size.
 *
 * Input:
 *  [
 *    [5, 3, -1, 5],
 *    [-7, 3, 7, 4],
 *    [12, 8, 0, 0],
 *    [1, -8, -8, 2],
 *  ]
 *  size = 2
 *
 * Output: 18
 *  [
 *    [., ., ., .],
 *    [., 3, 7, .],
 *    [., 8, 0, .],
 *    [., ., ., .],
 *  ]
 *
 * Time:
 * Space: O (n * m)
 */

function maximumSumSubmatrix(matrix: number[][], size: number): number {
  const sums = generateSumsArray(matrix);

  let maxSum = Number.MIN_SAFE_INTEGER;

  for (let i = size - 1; i < sums.length; i++) {
    for (let j = size - 1; j < sums[i].length; j++) {
      let currentSum = 0;

      if (i === size - 1 && j === size - 1) {
        // If top left cell
        currentSum = sums[i][j];
      } else if (i === size - 1 && j !== size - 1) {
        // If on the top most row
        currentSum = sums[i][j] - sums[i][j - size];
      } else if (i !== size - 1 && j === size - 1) {
        // If on the left most column
        currentSum = sums[i][j] - sums[i - size][j];
      } else {
        currentSum = sums[i][j] - sums[i][j - size] - sums[i - size][j] + sums[i - size][j - size];
      }

      if (currentSum > maxSum) {
        maxSum = currentSum;
      }
    }
  }

  return maxSum;
}

function generateSumsArray(matrix: number[][]): number[][] {
  const sums = new Array(matrix.length).fill([]).map(() => new Array(matrix[0].length).fill(0));

  // Fill in the first row
  for (let i = 0; i < sums[0].length; i++) {
    if (i === 0) {
      sums[0][i] = matrix[0][i];
    } else {
      sums[0][i] = matrix[0][i] + sums[0][i - 1];
    }
  }

  // Fill in the first column
  for (let i = 0; i < sums.length; i++) {
    if (i === 0) {
      sums[i][0] = matrix[i][0];
    } else {
      sums[i][0] = matrix[i][0] + sums[i - 1][0];
    }
  }

  // Fill out the rest of the array
  for (let i = 1; i < sums.length; i++) {
    for (let j = 1; j < sums[i].length; j++) {
      sums[i][j] = matrix[i][j] + sums[i - 1][j] + sums[i][j - 1] - sums[i - 1][j - 1];
    }
  }

  return sums;
}

// =============================================================================
// Tests
// =============================================================================
//

const testMatrix = [
  [5, 3, -1, 5],
  [-7, 3, 7, 4],
  [12, 8, 0, 0],
  [1, -8, -8, 2],
];

console.log(maximumSumSubmatrix(testMatrix, 2));
evalFunctionPerformance(maximumSumSubmatrix, testMatrix, 2);
