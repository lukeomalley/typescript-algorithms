import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Cycle In Graph
 *
 * You're given a list of edges representing an unweighted,directed
 * graph with at least one node. Write a function that returns a
 * boolean representing whether the graph contains a cycle.
 *
 * For the purpose of this question, a cycle is defined as any number
 * of vertices, including just one vertex, that are connected in a
 * closed chain. A cycle can also be defined as a chain of at least
 * one vertex in which the first vertex is the same as the last.
 *
 * The given list is what's called an adjacency list, and it represents
 * a graph, The number of vertices in the graph is qeual to the length
 * of edges, where each index i in edges contains a vertex i's outbound edges,
 * in no particular order. Eac individual edge is represented by positive
 * integer that denotes an index (a destination vertex) in the list that
 * this vertex is connected to. Note that these edges are directed,
 * meaning that you can only travel from from a particular vertex to its
 * destination, not the other way around (unless the destination vertex
 * itself has an outbound edge to the original vertex).
 *
 * Also note that this graph may contain self-loops. A self-loop is an
 * edge that has the same destination and origin. A self-loop is
 * considered a cycle
 *
 * Input:
 * Output:
 *
 * Time:
 * Space:
 */
function cycleInGraph(edges: number[][]): any {
  // Write solution here
}

// =============================================================================
// Tests
// =============================================================================

console.log(cycleInGraph(''));
evalFunctionPerformance(cycleInGraph, '');
