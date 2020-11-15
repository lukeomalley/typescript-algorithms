import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Knapsack Problem
 *
 * You're given an array of arrays where each subarray holds two integer values
 * and represents an item; the first integer is the item's value, and the second
 * integer is the item's weight. You're also given an integer representing the
 * maximum capacity of a knapsack that you have.
 *
 * Your goal is to fit items in your knapsack without having the sum of their
 * weights exceed the knapsack's capacity, all the while maximizing their
 * combined value. Note that you only have one of each item at your disposal.
 *
 * Write a function that returns the maximized combined value of the items that
 * you should pick as well as an array of the indices of each item picked.
 *
 * If there are multiple combinations of items that maximize the total value in
 * the knapsack, your function can return any of them.
 *
 * Sample Input: [[1, 2], [4, 3], [5, 6], [6, 7]], 10
 * Sample Output: [10, [1, 3]]
 */
function knapsack(items: [number, number][], capacity: number): [number, number[]] {
  const knapsackValues: number[][] = [];
  for (let i = 0; i < items.length + 1; i++) {
    knapsackValues.push(new Array(capacity + 1).fill(0));
  }

  for (let i = 1; i < items.length + 1; i++) {
    const currentValue = items[i - 1][0];
    const currentWeight = items[i - 1][1];

    for (let c = 0; c < capacity + 1; c++) {
      if (currentWeight > c) {
        knapsackValues[i][c] = knapsackValues[i - 1][c];
      } else {
        knapsackValues[i][c] = Math.max(
          knapsackValues[i - 1][c],
          knapsackValues[i - 1][c - currentWeight] + currentValue,
        );
      }
    }
  }

  return [knapsackValues[items.length][capacity], getKnapsackItems(knapsackValues, items)];
}

function getKnapsackItems(knapsackValues: number[][], items: [number, number][]): number[] {
  const itemIndexes: number[] = [];
  let i = knapsackValues.length - 1;
  let c = knapsackValues[0].length - 1;
  console.log(i, c);

  while (i > 0) {
    if (knapsackValues[i][c] === knapsackValues[i - 1][c]) {
      i -= 1;
    } else {
      itemIndexes.unshift(i - 1);
      c -= items[i - 1][1];
      i -= 1;
    }

    if (c === 0) {
      break;
    }
  }

  return itemIndexes;
}

console.log(
  knapsack(
    [
      [1, 2],
      [4, 3],
      [5, 6],
      [6, 7],
    ],
    10,
  ),
);
evalFunctionPerformance(
  knapsack,
  [
    [1, 2],
    [4, 3],
    [5, 6],
    [6, 7],
  ],
  10,
);
