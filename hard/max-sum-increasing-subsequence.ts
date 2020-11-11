import { performance } from 'perf_hooks';

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

const t0 = performance.now();
console.log(maxSumIncreasingSubsequence([10, 70, 20, 30, 50, 11, 30]));
const t1 = performance.now();
console.log(`Took ${(t1 - t0).toFixed(3)} ms to run.`);
