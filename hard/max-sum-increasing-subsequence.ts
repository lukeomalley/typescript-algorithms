import evalFunctionPerformance from '../lib/evalFunctionPerformance';

function maxSumIncreasingSubsequence(array: number[]): [number, number[]] {
  const sums = array.map((n) => n);
  const sequences: (number | null)[] = array.map(() => null);

  array.forEach(() => {
    sequences.push(null);
  });

  for (let i = 0; i < array.length; i++) {
    const currentNum = array[i];
    sums[i] = array[i];

    for (let j = 0; j < i; j++) {
      const otherNum = array[j];
      const currentSum = currentNum + sums[j];
      if (otherNum < currentNum && currentSum >= sums[i]) {
        sums[i] = currentSum;
        sequences[i] = j;
      }
    }
  }

  const maxSum = Math.max(...sums);
  const indexOfMax = sums.indexOf(maxSum);
  const maxSequence = [];

  let nextNum: number | null = indexOfMax;
  while (nextNum != null) {
    maxSequence.unshift(array[nextNum]);
    nextNum = sequences[nextNum];
  }

  return [maxSum, maxSequence];
}

// =============================================================================
// Tests
// =============================================================================

console.log(maxSumIncreasingSubsequence([10, 70, 20, 30, 50, 11, 30]));
evalFunctionPerformance(maxSumIncreasingSubsequence, [10, 70, 20, 30, 50, 11, 30]);
