import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Valid Ip Address
 *
 * You're given a string of length 12 or smaller, containing only digits. Write
 * a function that returns all the possible IP address that can be created by
 * inserting three .'s in the string.
 *
 * An IP adress is a sequence of four positive integers that are separated by
 * .'s, where each individual integer is within the range 0 - 255, inclusive
 *
 * An IP address isn't valid if any of the individual integers contains
 * leading 0's. For example, "192.168.0.1" is a valid address, but
 * "192.168.00.1" is invalid because it contains 00.
 *
 * The function should return the IP address in string format and in no
 * particular order. If no valid IP address are found the function should return
 * an empty list.
 *
 * Input: "1921680"
 * Output: [
 *    "1.9.216.80",
 *    "1.92.16.80",
 *    "1.92.168.0",
 *    "19.2.16.80",
 *    "19.2.168.0",
 *    "19.21.6.80",
 *    "19.21.68.0",
 *    "19.216.8.0",
 *    "192.1.6.80",
 *    "192.1.68.0",
 *    "192.16.8.0"
 *  ]
 *
 * Time:
 * Space:
 */
function validIpAddress(string: string): string[] {
  console.log(string);
  return [];
}

// =============================================================================
// Tests
// =============================================================================

console.log(validIpAddress('1921680'));
evalFunctionPerformance(validIpAddress, '1921680');
