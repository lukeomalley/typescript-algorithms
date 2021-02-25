import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Merge Singly Linked Lists
 *
 * Write a function that takes in the heads of two Singly Linked Lists that are in sorted
 * order, respectively. The function should merge the lists in place (i.e, it shouldn't
 * create a brand new list) and return the head of the merged list; the merged list should
 * be in sorted order.
 *
 * Each `LinkedList` node has an integer value as well as a next node pointing to the next
 * node in the list or to None / null if is is the tail of the list.
 *
 * You can assume that the input linked lists will always have at least one node; in other
 * words, the heads will never be None / null
 *
 * Input:
 *     headOne = 2 -> 6 -> 7 -> 8
 *     headTwo = 1 -> 3 -> 4 -> 5 -> 9 -> 10
 * Output: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10
 *
 * Time:
 * Space:
 */

// This is an input class. Do not edit.
export class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export function mergeLinkedLists(headOne: LinkedList, headTwo: LinkedList) {
  // Write your code here.
  while (headOne.next !== null) {
    if (!headOne.value || !headTwo.value) {
      return headOne;
    }

    if (headTwo.value <= headOne.value) {
      // Merge the head of the list to merge into the list to iterate
      const [newHeadOne, newHeadTwo] = mergeHeadTwoIntoHeadOne(headOne, headTwo);
      headOne = newHeadOne;
      headTwo = newHeadTwo;
      continue;
    }

    headOne = headOne.next!;
  }

  return headOne;
}

function mergeHeadTwoIntoHeadOne(headOne: LinkedList, headTwo: LinkedList): [LinkedList, LinkedList] {
  const newHeadOne = new LinkedList(headTwo.value);
  newHeadOne.next = headOne;
  headTwo = headTwo.next!;
  return [newHeadOne, headTwo];
}

// =============================================================================
// Tests
// =============================================================================

console.log(mergeLinkedLists(new LinkedList(1), new LinkedList(2)));
evalFunctionPerformance(mergeLinkedLists, new LinkedList(1), new LinkedList(2));
