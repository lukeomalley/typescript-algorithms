import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Minimum Waiting Time
 *
 * You're given a non-empty array of positive integers representing the amounts
 * of time that a specific queries take to execute. Only one query can be executed
 * at a time, but the queries can be executed in any order.
 *
 * A query's waiting time is defined as the amount of time that it must wait before
 * its execution starts. In other words, if a query is executed second, then its
 * waiting time is the duration of the first query; if a query is executed third,
 * then its waiting time is the sum of the durations of the first two queries.
 *
 * Write a function that returns the minimum amount of total waiting time for all
 * of the queries. For example, if you're given the queries [1, 4, 5], then the
 * total waiting time if the queries were executed in the order [5, 1, 4] would be
 * (0) + (5) + (5 + 1) = 11. The first query duration 5 would be executed immediately,
 * so its waiting time would be 0, the second query of duration 1 would have to wait 5
 * seconds (the duration of the first query) to be executed, and the last query would
 * have tr wait the duration of the first two queries before being executed.
 *
 * Input: [3, 2, 1, 2, 6]
 * Output: 17, 1 + (1 + 2) + (1 + 2 + 2) + (1 + 2 + 2 + 3)
 *
 * Time:
 * Space:
 */
function minimumWaitingTime(queries: number[]): number {
  let minWaitingTime = 0;
  const orderedQueries = queries.sort((a, b) => a - b);

  for (let i = 0; i < orderedQueries.length; i++) {
    const currentWait = queries[i];
    const qureiesLeftToExecute = queries.length - i - 1;
    minWaitingTime += currentWait * qureiesLeftToExecute;
  }

  return minWaitingTime;
}

// =============================================================================
// Tests
// =============================================================================

console.log(minimumWaitingTime([17, 4, 3]));
console.log(minimumWaitingTime([3, 2, 1, 2, 6]));
evalFunctionPerformance(minimumWaitingTime, [3, 2, 1, 2, 6]);
