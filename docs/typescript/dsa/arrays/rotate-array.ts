// https://leetcode.com/problems/rotate-array/
function rotate(nums: number[], k: number): void {
  const normalized_k = k % nums.length;

  if (normalized_k === 0 || nums.length <= 1) {
    return;
  }

  const n = nums.length - 1;

  reverse(nums, 0, n);
  reverse(nums, 0, normalized_k - 1);
  reverse(nums, normalized_k, n);
}

function reverse(nums: number[], start: number, end: number): void {
  while (start < end) {
    const temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
}
