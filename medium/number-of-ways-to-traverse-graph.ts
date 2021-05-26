import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Number Of Ways To Traverse Graph.ts
 *
 * You're given two positive integers representing the width and height of a
 * grid-shaped, rectangular graph. Write a function that returns the number of
 * ways to reach the bottom right corner of the graph when starting at the top
 * left corner. Each move you take must either go down or right. In other words,
 * you can never move up or left in the graph
 *
 * Note: You can assume that width * height >= 2
 *
 * input: width = 2, height = 3
 * output: 10
 *
 *  |_|_|
 *  |_|_|
 *  |_|_|
 *
 * Time:
 * Space:
 */
function numberOfWaysToTraverseGraph(width: number, height: number): number {
  console.log(height, width);

  return height * width;
}

// =============================================================================
// Tests
// =============================================================================

console.log(numberOfWaysToTraverseGraph(2, 3));
evalFunctionPerformance(numberOfWaysToTraverseGraph, 2, 3);
