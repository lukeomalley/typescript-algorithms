import evalFunctionPerformance from '../lib/evalFunctionPerformance';

class BinaryTree {
  value: number;

  left: BinaryTree | null;

  right: BinaryTree | null;

  parent: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

/**
 * Find Successor
 *
 * Write a function that takes in a Binary Tree (where nodes have an additional
 * pointer to their parent node) as well as a node contained in that tree and
 * returns the given node's successor.
 *
 * A node's successir is the next node to be visited (immediately after the given
 * node) when traversing its in-order tree traversal technique. A node has no
 * successor it it's the last nide to be visited in the in-order traversal.
 *
 * If a node has no successor, your function should return null.
 *
 * Input: BinaryTree, Node. (See example tree below)
 * Output: When given the root and the node 5 the successor is 1
 *
 * Example Tree:
 *           1
 *         /  \
 *        2    3
 *      / \
 *     4   5
 *
 * Time: O(h)
 * Space: O(1)
 */
function findSuccessor(tree: BinaryTree, node: BinaryTree): BinaryTree | null {
  if (node.right) {
    return getLeftmostChild(node.right);
  }

  return getRightmostParent(node);
}

function getLeftmostChild(node: BinaryTree): BinaryTree | null {
  let currentNode = node;
  while (currentNode.left) {
    currentNode = currentNode.left;
  }

  return currentNode;
}

function getRightmostParent(node: BinaryTree): BinaryTree | null {
  let currentNode = node;
  while (currentNode.parent !== null && currentNode.parent.right === currentNode) {
    currentNode = currentNode.parent;
  }

  return currentNode.parent;
}

// Naive solution Time: O(n), Space: O(n)
function findSuccessorNaive(tree: BinaryTree, node: BinaryTree): BinaryTree | null {
  const order = getInOrderTraversal(tree);

  for (let i = 0; i < order.length; i++) {
    if (order[i] === node) {
      return order[i + 1] || null;
    }
  }

  return null;
}

function getInOrderTraversal(node: BinaryTree | null, order: BinaryTree[] = []): BinaryTree[] {
  if (node === null) {
    return order;
  }

  getInOrderTraversal(node.left, order);
  order.push(node);
  return getInOrderTraversal(node.right, order);
}

// =============================================================================
// Tests
// =============================================================================

/**
 * Example Tree:
 *
 *           1
 *         /  \
 *        2    3
 *      / \
 *     4   5
 */

const root = new BinaryTree(1);
root.left = new BinaryTree(2);
root.left.right = new BinaryTree(5);
root.left.left = new BinaryTree(4);
root.right = new BinaryTree(3);

// Optimal Solution
console.log(findSuccessor(root, root.left.right));
evalFunctionPerformance(findSuccessor, root, root.left.right);

// Naive Solution
console.log(findSuccessorNaive(root, root.left.right));
evalFunctionPerformance(findSuccessorNaive, root, root.left.right);
