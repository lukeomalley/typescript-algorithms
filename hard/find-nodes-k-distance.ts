import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Find Nodes K Distance
 *
 * You're given the root node of a Binary Tree, a target value of a
 * node that's contained in the tree, and a positive integer k. Write
 * a function that returns the values of all the nodes that are exactly
 * distance k from the node with the target value.
 *
 * The distance between two nodes is defined as the number of edges that
 * must be traversed to go fom one node to the other. For example, the
 * distance between a node and its immediate left or right child is 1.
 * The same holds in reverse: the distance between a node and its parent
 * is 1. In a tree of three nodes where the root node has a left and right
 * child, the left and right child are distance 2 from eachother.
 *
 * Note: All Binary Tree values will be unique, and your function can
 * return the output values in any order.
 *
 * Input:
 *
 *  Target: C
 *  K: 2
 *            A
 *         /     \
 *        B       C
 *      /  \     /  \
 *     D    E   F    G
 *   /  \
 *  H    I
 *
 * Output: [B]
 *
 * Time: O(n)
 * Space: O(n)
 */

// This is an input class. Do not edit.
class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

type Parents = { [value: number]: BinaryTree };
type BFSQueue = [BinaryTree, number][];

function findNodesDistanceK(tree: BinaryTree, target: number, k: number): number[] {
  const parents = findParents(tree, null, {});
  const targetNode = findTargetNode(tree, target, parents);
  return breathFirstSearchFromTarget(targetNode, parents, k);
}

function breathFirstSearchFromTarget(targetNode: BinaryTree, parents: Parents, k: number): number[] {
  const queue: BFSQueue = [[targetNode, 0]];
  const visitedNodes = new Set<number>();
  const nodesKDistance: number[] = [];

  while (queue.length) {
    const [currentNode, distance] = queue.shift()!;
    visitedNodes.add(currentNode.value);

    if (distance === k) {
      nodesKDistance.push(currentNode.value);
      return [currentNode.value, ...queue.map((pair) => pair[0].value)];
    }

    const nodesToAdd = [parents[currentNode.value], currentNode.right!, currentNode.left!]
      .filter((n) => n !== null)
      .filter((n) => !visitedNodes.has(n.value))
      .map((n) => [n, distance + 1] as [BinaryTree, number]);

    queue.push(...nodesToAdd);
  }

  return nodesKDistance;
}

function findParents(node: BinaryTree | null, parent: BinaryTree | null, parents: Parents): Parents {
  if (!node) {
    return parents;
  }

  findParents(node.left, node, parents);
  findParents(node.right, node, parents);

  parents[node.value] = parent!;

  return parents;
}

function findTargetNode(root: BinaryTree, target: number, parents: Parents): BinaryTree {
  const targetNodeParent = parents[target];

  if (targetNodeParent === null) {
    return root;
  }

  return targetNodeParent.left?.value === target ? targetNodeParent.left! : targetNodeParent.right!;
}

// =============================================================================
// Tests
// =============================================================================

const root = new BinaryTree(1);
root.left = new BinaryTree(2);
root.right = new BinaryTree(3);
root.right.right = new BinaryTree(4);
root.right.left = new BinaryTree(5);
root.right.right.right = new BinaryTree(6);
root.right.right.left = new BinaryTree(7);

console.log(findNodesDistanceK(root, 3, 2));
evalFunctionPerformance(findNodesDistanceK, root, 3, 2);
