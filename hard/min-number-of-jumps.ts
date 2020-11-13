import evalFunctionPerformance from '../lib/evalFunctionPerformance';

function minNumberOfJumps(array: number[]): number {
  const minJumps = array.map(() => Infinity);
  minJumps[0] = 0;

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j <= i; j++) {
      const currentJumpDistance = array[j];
      if (currentJumpDistance + j >= i) {
        minJumps[i] = Math.min(minJumps[i], minJumps[j] + 1);
      }
    }
  }

  return minJumps[minJumps.length - 1];
}

console.log(minNumberOfJumps([3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]) === 4);
evalFunctionPerformance(minNumberOfJumps, [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]);
