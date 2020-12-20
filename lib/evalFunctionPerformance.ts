import { performance } from 'perf_hooks';

export default function evalFunctionPerfoamance(fun: Function, ...args: any[]) {
  const t0 = performance.now();
  fun(...args);
  const t1 = performance.now();

  console.log(`Took ${(t1 - t0).toFixed(3)} ms to run.`);
}
