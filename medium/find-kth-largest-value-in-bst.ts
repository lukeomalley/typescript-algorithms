import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Find Kth Largest Value In Bst
 *
 * Write a function that takes in a Binary Search Tree (BST) and a positive
 * integer k and returns the kth largest integer contained in the BST.
 *
 * You can assume that there will only be integer values in the BST and that
 * k is less than or equal to the number of nodes in the tree.
 *
 * Also, for the purpose of the question, duplicate integers will be treated
 * as distince values. In other words, the second largest value in the BST
 * containing values `{5, 7, 7}` is 7 not 5.
 *
 * Input:
 *
 *  K: 2
 *  Tree:     6
 *         /     \
 *        4       10
 *      /  \     /  \
 *     2    5   9    20
 *   /  \
 *  1    3
 *
 * Output: 10
 *
 * Time: O (h + k)
 * Space: O (h)
 */

class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

interface TreeInfo {
  numberOfNodesVisited: number;
  latestVisitedNodeValue: number;
}

function findKthLargestValueInBst(tree: BST, k: number): number {
  const treeInfo: TreeInfo = { numberOfNodesVisited: 0, latestVisitedNodeValue: -1 };
  reverseInOrderTraverse(tree, k, treeInfo);
  return treeInfo.latestVisitedNodeValue;
}

function reverseInOrderTraverse(node: BST | null, k: number, treeInfo: TreeInfo) {
  if (!node || treeInfo.numberOfNodesVisited >= k) {
    return;
  }

  reverseInOrderTraverse(node.right, k, treeInfo);
  if (treeInfo.numberOfNodesVisited < k) {
    treeInfo.numberOfNodesVisited++;
    treeInfo.latestVisitedNodeValue = node.value;
    reverseInOrderTraverse(node.left, k, treeInfo);
  }
}

// =============================================================================
// Tests
// =============================================================================

const root = new BST(6);
root.left = new BST(4);
root.left.left = new BST(2);
root.left.right = new BST(5);
root.left.left.left = new BST(1);
root.left.left.right = new BST(3);

root.right = new BST(10);
root.right.left = new BST(9);
root.right.right = new BST(20);

console.log(findKthLargestValueInBst(root, 2));
evalFunctionPerformance(findKthLargestValueInBst, root, 2);
