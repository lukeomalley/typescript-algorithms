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
 * Time: O(1) because there are only 2^32 possible IP addresses
 * Space: O(1)
 */
function validIpAddress(string: string): string[] {
  const foundIpAddress: string[] = [];

  for (let i = 1; i < Math.min(string.length, 4); i++) {
    const currentIpAddressParts = ['', '', '', ''];

    currentIpAddressParts[0] = string.slice(0, i);
    if (!valid(currentIpAddressParts[0])) {
      continue;
    }

    for (let j = i + 1; j < Math.min(string.length - i, 4); j++) {
      currentIpAddressParts[1] = string.slice(i, j);

      if (!valid(currentIpAddressParts[1])) {
        continue;
      }

      for (let k = j + 1; Math.min(string.length - i, 4); k++) {
        currentIpAddressParts[2] = string.slice(j, k);
        currentIpAddressParts[3] = string.slice(k);
        if (valid(currentIpAddressParts[2]) && valid(currentIpAddressParts[3])) {
          foundIpAddress.push(currentIpAddressParts.join('.'));
        }
      }
    }
  }

  return foundIpAddress;
}

function valid(ipPart: string): boolean {
  const stringAsInt = +ipPart;
  if (stringAsInt > 255) {
    return false;
  }

  // Check for any leading 0's
  return ipPart.length === stringAsInt.toString().length;
}

// =============================================================================
// Tests
// =============================================================================

console.log(validIpAddress('1921680'));
evalFunctionPerformance(validIpAddress, '1921680');
