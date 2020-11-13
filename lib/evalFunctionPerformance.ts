import { performance } from 'perf_hooks';

export default function evalFunctionPerfoamance(fun: Function, ...args: any[]) {
  const t0 = performance.now();
  fun(args);
  const t1 = performance.now();
  const used = process.memoryUsage().heapUsed / 1024 / 1024;

  console.log(`Took ${(t1 - t0).toFixed(3)} ms to run.`);
  console.log(`Used approximately ${Math.round(used * 100) / 100} MB\n`);
}
