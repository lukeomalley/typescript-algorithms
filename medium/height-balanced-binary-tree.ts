import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Height Balanced Binary Tree
 *
 * You're given the root node of a Binary Tree. Write a function that returns
 * true if this Binary Tree is height balanced and false if it isnt.
 *
 * A Binary Tree is height balanced if for each node in the tree, the
 * difference between the height of its left subtree and the height of its
 * right subtree is at most 1.
 *
 * Input: Binary Tree
 * Output: true
 *
 * Time: O(n)
 * Space: O(h)
 */
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

interface TreeInfo {
  isBalanced: boolean;
  height: number;
}

function heightBalancedBinaryTree(tree: BinaryTree): boolean {
  return getTreeInfo(tree).isBalanced;
}

function getTreeInfo(tree: BinaryTree | null): TreeInfo {
  if (!tree) {
    return { isBalanced: true, height: -1 };
  }

  const leftTreeInfo = getTreeInfo(tree.left);
  const rightTreeInfo = getTreeInfo(tree.right);

  const isBalanced =
    leftTreeInfo.isBalanced && rightTreeInfo.isBalanced && Math.abs(leftTreeInfo.height - rightTreeInfo.height) <= 1;
  const height = Math.max(leftTreeInfo.height, rightTreeInfo.height) + 1;

  return { isBalanced, height };
}

// =============================================================================
// Tests
// =============================================================================

const root = new BinaryTree(1);
root.left = new BinaryTree(2);
root.right = new BinaryTree(3);

console.log(heightBalancedBinaryTree(root));
evalFunctionPerformance(heightBalancedBinaryTree, root);
