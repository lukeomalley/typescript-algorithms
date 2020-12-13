import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Topological Sort
 * Category:
 *
 * You're given a list of arbitrary jobs that need to be completed; these
 * jobs are represented bt distinct integers. You're also given a list of
 * dependencies. A dependency is represented as a pair of jobs where the
 * first job is a prerequisite of the second one. In other words, the second
 * job depends on the first one; it can only be completed once the first
 * job is completed
 *
 * Write a function that takes in a list of jobs and a list of dependencies
 * and returns a list containing a valid order in which the given jobs can be
 * completed. IF no such order exists, the function should return an empty
 * array
 *
 * Time:
 * Space:
 */
function topologicalSort(jobs: number[], deps: Dependency[]): number[] {}

type Dependency = [number, number];

// =============================================================================
// Tests
// =============================================================================

topologicalSort(
  [1, 2, 3, 4],
  [
    [1, 2],
    [1, 3],
    [3, 2],
    [4, 2],
    [4, 3],
  ],
);

evalFunctionPerformance(
  topologicalSort,
  [1, 2, 3, 4],
  [
    [1, 2],
    [1, 3],
    [3, 2],
    [4, 2],
    [4, 3],
  ],
);
