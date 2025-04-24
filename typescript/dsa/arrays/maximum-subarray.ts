// https://leetcode.com/problems/maximum-subarray/
function maxSubArray(nums: number[]): number {
  if (nums.length == 1) return nums[0];
  let bestSum = nums[0];
  let currentSum = 0;
  for (let i = 0; i < nums.length; ++i) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    bestSum = Math.max(bestSum, currentSum);
  }
  return bestSum;
}
