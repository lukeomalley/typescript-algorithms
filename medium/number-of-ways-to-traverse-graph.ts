import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Number Of Ways To Traverse Graph
 *
 * You're given two positive integers representing the width and height of a
 * grid-shaped, rectangular graph. Write a function that returns the number of
 * ways to reach the bottom right corner of the graph when starting at the top
 * left corner. Each move you take must either go down or right. In other words,
 * you can never move up or left in the graph
 *
 * Note: You can assume that width * height >= 2
 *
 * input: width = 4, height = 3
 * output: 10
 *
 *  |_|_|
 *  |_|_|
 *  |_|_|
 *
 * Time: O(m * n)
 * Space: O(m * n)
 */
function numberOfWaysToTraverseGraph(width: number, height: number): number {
  return computeNumberOfWaysDP(height, width);
}

function numberOfWaysToTraverseGraphRecursive(width: number, height: number): number {
  const cache = new Array(height).fill(0).map(() => new Array(width).fill(0));

  return computeWaysMomo(height, width, cache);
}

// Memoized
function computeWaysMomo(height: number, width: number, cache: number[][]): number {
  const row = height - 1;
  const col = width - 1;
  if (cache[row][col] !== 0) {
    return cache[row][col];
  }

  if (height === 1 || width === 1) {
    cache[row][col] = 1;
  } else {
    cache[row][col] = computeWaysMomo(height - 1, width, cache) + computeWaysMomo(height, width - 1, cache);
  }

  return cache[row][col];
}

function computeNumberOfWaysDP(height: number, width: number): number {
  const dp = new Array(height).fill(0).map(() => new Array(width).fill(0));

  for (let i = 0; i < dp.length; i++) {
    for (let j = 0; j < dp[0].length; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[height - 1][width - 1];
}

// =============================================================================
// Tests
// =============================================================================

console.log('Dynamic Programing:');
console.log(numberOfWaysToTraverseGraph(4, 3));
evalFunctionPerformance(numberOfWaysToTraverseGraph, 4, 3);
console.log('\n');

console.log('Recursive');
console.log(numberOfWaysToTraverseGraphRecursive(4, 3));
evalFunctionPerformance(numberOfWaysToTraverseGraphRecursive, 4, 3);
