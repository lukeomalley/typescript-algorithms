import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Remove Islands
 *
 * You're given a two-dimensional array (matrix) of potentially unequal height
 * and width containing only O's and 1's. The matrix represends a two-toned image,
 * where each 1 represents black and each 0 represents white. An island is defined
 * as any number of 1's that are horizontally or vertically adjacent (but not
 * diagonally adjacent) and that don't touch the border of the image. In other
 * words, a group of horizontally, or vertically adjacent 1's isn't an island
 * if any of those 1's are in teh first row, last row, first column, or last
 * column.
 *
 * Node than an island can twist. In other words, it doesn't have to be a straight
 * vertical line or a straight horizontal line. It can be L-shaped.
 *
 * Input: [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1]
  ]
 * Output: [
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1]
  ]
 *
 * Time: O(w * h)
 * Space: O (w * h)
 */
function removeIslands(matrix: number[][]): number[][] {
  const onesConnectedToBorder = matrix.map((_, i) => matrix[i].map(() => false));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const rowIsBorder = i === 0 || i === matrix.length - 1;
      const colIsBorder = j === 0 || j === matrix[i].length - 1;
      const isBorder = rowIsBorder || colIsBorder;
      if (isBorder && matrix[i][j] === 1) {
        findOnesConnectedToBorder(matrix, i, j, onesConnectedToBorder);
      }
    }
  }
  console.log(onesConnectedToBorder);

  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[i].length - 1; j++) {
      const currentNumber = matrix[i][j];
      if (currentNumber === 1 && !onesConnectedToBorder[i][j]) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
}

function findOnesConnectedToBorder(matrix: number[][], i: number, j: number, onesConnectedToBorder: boolean[][]) {
  const stack = [[i, j]];
  while (stack.length > 0) {
    const [currentRow, currentCol] = stack.pop()!;
    const alreadyVisited = onesConnectedToBorder[currentRow][currentCol];
    if (!alreadyVisited) {
      onesConnectedToBorder[currentRow][currentCol] = true;
      const neighbors = getNeighbors(matrix, currentRow, currentCol);
      neighbors.forEach(([neighborRow, neighborColumn]) => {
        if (matrix[neighborRow][neighborColumn] === 1) {
          stack.push([neighborRow, neighborColumn]);
        }
      });
    }
  }
}

function getNeighbors(matrix: number[][], row: number, col: number): number[][] {
  const neighbors = [];

  const numRows = matrix.length;
  const numCols = matrix[row].length;

  // Up
  if (row - 1 > 0) {
    neighbors.push([row - 1, col]);
  }

  // Down
  if (row + 1 < numRows) {
    neighbors.push([row + 1, col]);
  }

  // Left
  if (col - 1 > 0) {
    neighbors.push([row, col - 1]);
  }

  // Right
  if (col + 1 < numCols) {
    neighbors.push([row, col + 1]);
  }

  return neighbors;
}

// =============================================================================
// Solution Two
// =============================================================================

function removeIslandsTwo(matrix: number[][]): number[][] {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const rowIsBorder = i === 0 || i === matrix.length - 1;
      const colIsBorder = j === 0 || j === matrix[i].length - 1;
      const isBorder = rowIsBorder || colIsBorder;
      if (isBorder && matrix[i][j] === 1) {
        findOnesConnectedToBorderTwo(matrix, i, j);
      }
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const currentNumber = matrix[i][j];
      if (currentNumber > 0) {
        matrix[i][j]--;
      }
    }
  }

  return matrix;
}

function findOnesConnectedToBorderTwo(matrix: number[][], i: number, j: number) {
  const stack = [[i, j]];
  while (stack.length > 0) {
    const [currentRow, currentCol] = stack.pop()!;
    matrix[currentRow][currentCol] = 2;
    const neighbors = getNeighborsTwo(matrix, currentRow, currentCol);
    neighbors.forEach(([neighborRow, neighborColumn]) => {
      if (matrix[neighborRow][neighborColumn] === 1) {
        stack.push([neighborRow, neighborColumn]);
      }
    });
  }
}

function getNeighborsTwo(matrix: number[][], row: number, col: number): number[][] {
  const neighbors = [];

  const numRows = matrix.length;
  const numCols = matrix[row].length;

  // Up
  if (row - 1 > 0) {
    neighbors.push([row - 1, col]);
  }

  // Down
  if (row + 1 < numRows) {
    neighbors.push([row + 1, col]);
  }

  // Left
  if (col - 1 > 0) {
    neighbors.push([row, col - 1]);
  }

  // Right
  if (col + 1 < numCols) {
    neighbors.push([row, col + 1]);
  }

  return neighbors;
}

// =============================================================================
// Tests
// =============================================================================

const islandMatrix = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1],
  [0, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, 1],
];
console.log(removeIslands(islandMatrix));
console.log(removeIslandsTwo(islandMatrix));
evalFunctionPerformance(removeIslandsTwo, islandMatrix);
