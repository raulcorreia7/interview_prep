// https://leetcode.com/problems/move-zeroes/
function moveZeroes(nums: number[]): void {
  let read = 0;
  let write = 0;
  while (read < nums.length) {
    if (nums[read] !== 0) {
      if (read !== write && nums[read] !== nums[write]) {
        const temp = nums[write];
        nums[write] = nums[read];
        nums[read] = temp;
      }
      write++;
    }
    read++;
  }
}
