import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Longest Common Subsequence
 *
 * Write a function that takes in two strings and returns their longest common
 * subsequence.
 *
 * A subsequence of a string is a set of characters that aren't necessarily adjacent
 * in the string but that are in the same order as they appear in the string. For
 * instance, the characters ["a", "b", "c"] form a subsequence of the string "abcd",
 * and so do the characters ["b", "d"]. Note that a single character in a string and
 * the string itself are both valid subsequences of the string.
 *
 * You can assume that there will only be one longest subsequence.
 *
 * Input: "ZXVVYZW", "XKYKZPW"
 * Output: ["X", "Y", "Z", "W"]
 *
 * Time:
 * Space:
 */
function longestCommonSubsequence(str1: string, str2: string): any {
  const lcs = Array(str2.length + 1)
    .fill(0)
    .map(() => {
      return Array(str1.length + 1).fill([]);
    });

  for (let i = 1; i < str2.length + 1; i++) {
    for (let j = 1; j < str1.length + 1; j++) {
      if (str2[i - 1] === str1[j - 1]) {
        lcs[i][j] = lcs[i - 1][j - 1].concat([str2[i - 1]]);
      } else {
        const left = lcs[i - 1][j];
        const up = lcs[i][j - 1];
        lcs[i][j] = left.length > up.length ? left : up;
      }
    }
  }

  return lcs[lcs.length - 1][lcs[0].length - 1];
}

// =============================================================================
// Tests
// =============================================================================

// console.log(longestCommonSubsequence('ZXVVYZW', 'XKYKZPW'));
console.log(longestCommonSubsequence('ABCDEFG', 'APPLES'));
// evalFunctionPerformance(longestCommonSubsequence, 'ZXVVYZW', 'XKYKZPW');
