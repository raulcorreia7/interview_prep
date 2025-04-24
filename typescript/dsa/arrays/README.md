# Arrays

## Summary

Arrays are one of the most fundamental data structures. They provide constant-time access by index
and are widely used in algorithms and system-level code.

They are useful for:

- Storing ordered data
- Efficient lookups by index
- Sliding window, prefix sum, and two-pointer techniques

## 📘 Pattern Recognition Cheat Sheet

Use this section to recognize common problem patterns and decide your approach quickly.

### Common Patterns and Recognition Questions

| Pattern             | Ask Yourself...                                                       | Study Resources                                                                                  |
| ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Two Pointers        | Do I need to move elements in-place or compare values from both ends? | [LeetCode Two Pointers](https://leetcode.com/tag/two-pointers/)                                  |
| Sliding Window      | Am I tracking a sum/min/max over a range or subarray?                 | [LeetCode Sliding Window](https://leetcode.com/tag/sliding-window/)                              |
| Hash Map / Set      | Do I need fast lookups or to track duplicates/complements?            | [LeetCode Hash Table](https://leetcode.com/tag/hash-table/)                                      |
| Reversal / Rotation | Am I reordering parts of the array with in-place constraints?         | [GFG Reversal Algorithm](https://www.geeksforgeeks.org/reversal-algorithm-right-rotation-array/) |
| Kadane’s Algorithm  | Am I tracking the best running total / max subarray?                  | [Kadane’s Algorithm](https://en.wikipedia.org/wiki/Maximum_subarray_problem)                     |
| Sorting + Scanning  | Can I simplify things by sorting and then walking left to right?      | [LeetCode Sorting](https://leetcode.com/tag/sorting/)                                            |
| Binary Search       | Is the array sorted or can I define a search space with conditions?   | [LeetCode Binary Search](https://leetcode.com/explore/learn/card/binary-search/)                 |

---

## 🧮 Big O Complexity Reference

For a full breakdown of time/space complexities across data structures and algorithms, visit:

🔗 [Big O Cheat Sheet](https://www.bigocheatsheet.com/)

## Cheat Sheet

| Operation           | Time Complexity  |
| ------------------- | ---------------- |
| Access by index     | O(1)             |
| Search (unsorted)   | O(n)             |
| Search (sorted)     | O(log n)         |
| Insert at end       | O(1) (amortized) |
| Insert at beginning | O(n)             |
| Delete at end       | O(1)             |
| Delete at beginning | O(n)             |

## Examples

### [Two Sum](https://leetcode.com/problems/two-sum/) — [Solution](./two-sum.ts)

- Pattern: Hash Map
- Ask Yourself:
  - Do I need to find a pair that sums to a target?
  - Can I track complements while scanning?

---

### [Move Zeroes](https://leetcode.com/problems/move-zeroes/) — [Solution](./move-zeroes.ts)

- Pattern: Two Pointers
- Ask Yourself:
  - Do I need to move items in one direction while keeping order?
  - Can I overwrite the array in-place without shifting all elements manually?

---

### [Maximum Subarray (Kadane’s Algorithm)](https://leetcode.com/problems/maximum-subarray/) — [Solution](./maximum-subarray.ts)

- Pattern: Dynamic Programming (Kadane’s), Sliding Window
- Ask Yourself:
  - Am I looking for the largest sum of a contiguous subarray?
  - Can I keep a running max while iterating?

---

### [Rotate Array](https://leetcode.com/problems/rotate-array/) — [Solution](./rotate-array.ts)

- Pattern: Reversal, In-place Rotation
- Ask Yourself:
  - Do I need to shift elements cyclically?
  - Can I reverse parts of the array to simulate a rotation?

---

### [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) — [Solution](./contains-duplicate.ts)

- Pattern: Hash Set
- Ask Yourself:
  - Do I need to check for duplicates quickly?
  - Can I use a set to track seen values without sorting?
