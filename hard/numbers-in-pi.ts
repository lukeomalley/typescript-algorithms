import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Numbers in Pi
 * Category: Dynamic Programming
 *
 * Given a string representation of the first n digits of Pi and a list of
 * positive integers (all in string format), write a function that returns
 * the smallest number os spaces that can be addes to the n digits of Pi
 * such that all resulting numbers are found in the list of integers.
 *
 * Note that a single number can appear multiple times in the resulting
 * numbers. For example, if Pi is "3141" and the numbers are ["1", "3", "4"],
 * the number "1" is allowed to appear twise in the list of resulting numbers
 * after three spaces are added: "3 | 1 | 4 | 1".
 *
 * If no number of spaces to obe added exists such that all resulting numbers
 * are found in the list of integers, the function should return -1.
 *
 * Time: O(n^3)
 * Space: O(n+m)
 */
function numbersInPi(pi: string, numbers: string[]): number {
  const numbersTable: NumbersTable = {};
  numbers.forEach((n) => {
    numbersTable[n] = true;
  });

  const minSpaces = getMinSpaces(pi, numbersTable, {}, 0);
  return minSpaces === Infinity ? -1 : minSpaces;
}

function getMinSpaces(pi: string, numbersTable: NumbersTable, cache: Cache, idx: number): number {
  if (idx === pi.length) {
    return -1;
  }

  if (cache[idx]) {
    return cache[idx];
  }

  let minSpaces = Infinity;
  for (let i = idx; i < pi.length; i++) {
    const prefix = pi.slice(idx, i + 1); // slice takes linear time
    if (prefix in numbersTable) {
      const minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
      minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
    }
  }

  cache[idx] = minSpaces;
  return minSpaces;
}

interface NumbersTable {
  [key: string]: boolean;
}

interface Cache {
  [key: number]: number;
}

numbersInPi('3141592653589793238462643383279', [
  '314159265358979323846',
  '26433',
  '8',
  '3279',
  '314159265',
  '35897932384626433832',
  '79',
]);

evalFunctionPerformance(numbersInPi, '3141592653589793238462643383279', [
  '314159265358979323846',
  '26433',
  '8',
  '3279',
  '314159265',
  '35897932384626433832',
  '79',
]);
