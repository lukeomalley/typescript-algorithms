import { RSA_PKCS1_OAEP_PADDING } from 'constants';
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

function mergeLinkedLists(headOne: LinkedList, headTwo: LinkedList): LinkedList {
  let p1 = headOne;
  let p1Prev = null;
  let p2 = headTwo;

  while (p1 !== null && p2 !== null) {
    if (p1.value < p2.value) {
      p1Prev = p1;
      p1 = p1.next!;
    } else {
      if (p1Prev !== null) {
        p1Prev.next = p2;
      }

      p1Prev = p2;
      p2 = p2.next!;
      p1Prev.next = p1;
    }
  }

  // Got to the end but there are nodes left in list two, append them to list one
  if (p1 === null) {
    p1Prev!.next = p2;
  }

  return headOne.value < headTwo.value ? headOne : headTwo;
}

// =============================================================================
// Tests
// =============================================================================

const listOne = new LinkedList(2);
listOne.next = new LinkedList(3);
listOne.next.next = new LinkedList(6);
listOne.next.next.next = new LinkedList(7);
listOne.next.next.next.next = null;

const listTwo = new LinkedList(1);
listTwo.next = new LinkedList(4);
listTwo.next.next = new LinkedList(5);
listTwo.next.next.next = new LinkedList(8);
listTwo.next.next.next.next = null;

printList(listOne, 'List One');
printList(listTwo, 'List Two');
printList(mergeLinkedLists(listOne, listTwo), 'Merged List');
// evalFunctionPerformance(mergeLinkedLists, listOne, listTwo);

// =============================================================================
// Util Funcitons
// =============================================================================

function printList(list: LinkedList, name: string) {
  let output = '';

  while (list !== null) {
    if (!list.next) {
      output += `${list.value}`;
    } else {
      output += `${list.value} --> `;
    }

    list = list.next!;
  }

  console.log(name + ': ' + output);
}
