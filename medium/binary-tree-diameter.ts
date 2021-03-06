import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Binary Tree Diameter
 *
 * Write a function that takes a Binary Tree and returns its diameter.
 * The diameter of a binary tree is defined as the length of its longest
 * path, even if that path doesn't pass through the root of the tree.
 *
 * A path is a collection of connected nodes in a tree, where no node is
 * connected to more than two other nodes. The length of a path is the
 * number of edged between the path's first node and its last node.
 *
 * Each BinaryTree node has an integer value, a left child node and,
 * a right child node. Children nodes cna either be BinaryTree nodes
 * themselves or null
 *
 * Time: O(n)
 * Space: O(n)
 */
class BinaryTree {
  public right: BinaryTree | null;

  public left: BinaryTree | null;

  constructor(public value: number) {
    this.right = null;
    this.left = null;
  }
}

interface TreeInfo {
  diameter: number;
  height: number;
}

function binaryTreeDiameter(tree: BinaryTree): number {
  return getTreeInfo(tree).diameter;
}

function getTreeInfo(tree: BinaryTree | null): TreeInfo {
  if (!tree) {
    return { diameter: 0, height: 0 };
  }

  // Recurse down the tree (DFS)
  const leftTreeData = getTreeInfo(tree.left);
  const rightTreeData = getTreeInfo(tree.right);

  // Find the current height height and
  const longestPathThroughRoot = rightTreeData.height + leftTreeData.height;
  const maxDiameterSoFar = Math.max(leftTreeData.diameter, rightTreeData.diameter);

  const currentDiameter = Math.max(longestPathThroughRoot, maxDiameterSoFar);
  const currentHeight = 1 + Math.max(leftTreeData.height, rightTreeData.height);

  return { diameter: currentDiameter, height: currentHeight };
}

// =============================================================================
// Tests
// =============================================================================

const root = new BinaryTree(1);
root.left = new BinaryTree(3);
root.left.left = new BinaryTree(7);
root.left.left.left = new BinaryTree(8);
root.left.left.left.left = new BinaryTree(9);
root.left.right = new BinaryTree(4);
root.left.right.right = new BinaryTree(5);
root.left.right.right.right = new BinaryTree(6);
root.right = new BinaryTree(2);

console.log(binaryTreeDiameter(root));
evalFunctionPerformance(binaryTreeDiameter, root);
