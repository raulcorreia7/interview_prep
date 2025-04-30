/**
 * Definition for a binary tree node.
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  return r_lca(root, Math.min(p.val, q.val), Math.max(p.val, q.val));
}

function r_lca(root: TreeNode | null, p: number, q: number): TreeNode | null {
  if (root == null) {
    return null;
  }

  const value = root.val;

  if (p < value && value < q) {
    return root;
  }

  if (p == value || q == value) {
    return root;
  }

  if (p <= value && q <= value) {
    return r_lca(root.left, p, q);
  }

  if (p >= value && q >= value) {
    return r_lca(root.right, p, q);
  }
  return null;
}
