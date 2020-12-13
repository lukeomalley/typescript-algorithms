import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Topological Sort
 * Category: Graph (Directed Aycyclic Graph)
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
 * Time: O (j+d)
 * Space: O (j+d)
 */
function topologicalSort(jobs: number[], deps: Dependency[]): number[] {
  const jobGraph = new JobGraph(jobs, deps);
  return getOrderedJobs(jobGraph);
}

function getOrderedJobs(graph: JobGraph): number[] {
  const orderedJobs: number[] = [];
  const { nodes } = graph;

  while (nodes.length) {
    const node = nodes.pop()!;
    const containsCycle = depthFirstTraverse(node, orderedJobs);
    if (containsCycle) {
      return [];
    }
  }

  return orderedJobs;
}

function depthFirstTraverse(node: JobNode, orderedJobs: number[]): boolean {
  if (node.visited) {
    return false; // skip the node
  }

  if (node.visiting) {
    return true;
  }

  node.visiting = true;
  let containsCycle = false;
  node.prereqs.forEach((prereqNode) => {
    containsCycle = depthFirstTraverse(prereqNode, orderedJobs);
  });
  if (containsCycle) {
    return true;
  }

  node.visited = true;
  node.visiting = false;
  orderedJobs.push(node.job);
  return false;
}

// =============================================================================
// Models
// =============================================================================

type Dependency = [number, number];

class JobGraph {
  public graph: { [key: number]: JobNode };

  public nodes: JobNode[];

  constructor(public jobs: number[], public deps: Dependency[]) {
    this.nodes = [];
    this.graph = {};

    jobs.forEach((j) => {
      this.addNode(j);
    });

    deps.forEach(([prereq, job]) => {
      this.addPrereq(job, prereq);
    });
  }

  private addPrereq(job: number, prereq: number) {
    const jobNode = this.getNode(job);
    const prereqNode = this.getNode(prereq);
    jobNode.prereqs.push(prereqNode);
  }

  private addNode(job: number) {
    const jobNode = new JobNode(job);
    this.graph[job] = jobNode;
    this.nodes.push(jobNode);
  }

  private getNode(job: number): JobNode {
    if (!this.graph[job]) {
      this.addNode(job);
    }

    return this.graph[job];
  }
}
class JobNode {
  public job: number;

  public prereqs: JobNode[];

  public visited: boolean;

  public visiting: boolean;

  constructor(job: number) {
    this.job = job;
    this.prereqs = [];
    this.visited = false;
    this.visiting = false;
  }
}

// =============================================================================
// Tests
// =============================================================================

const jobs = [1, 2, 3, 4, 5, 6, 7, 8];
const deps: Dependency[] = [
  [3, 1],
  [8, 1],
  [8, 7],
  [5, 7],
  [5, 2],
  [1, 4],
  [6, 7],
  [1, 2],
  [7, 6],
];

console.log(topologicalSort(jobs, deps));

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
