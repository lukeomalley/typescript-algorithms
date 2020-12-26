import evalFunctionPerformance from '../lib/evalFunctionPerformance';

class SinglyLinkedList {
  value: number;

  next: SinglyLinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

/**
 * Find Loop
 *
 * Write a function that takes in the head of a Singly Linked List that contains
 * a loop. The function should return the node from which the loop orginates in
 * constant space
 *
 * Input: Singly Linked List w/ Loop
 * Output: Node where loop originates
 *
 * Time: O(n)
 * Space: O(1)
 */
function findLoop(head: SinglyLinkedList): any {
  let slow = head.next!;
  let fast = head.next!.next!;

  while (slow !== fast) {
    slow = slow.next!;
    fast = fast.next!.next!;
  }

  // Set one of the pointers to the head and increment the pointers together
  slow = head;
  while (slow !== fast) {
    slow = slow.next!;
    fast = fast.next!;
  }

  return slow;
}

// =============================================================================
// Tests
// =============================================================================

const list = new SinglyLinkedList(1);
list.next = new SinglyLinkedList(2);
list.next.next = new SinglyLinkedList(3);
list.next.next.next = new SinglyLinkedList(4);
list.next.next.next.next = new SinglyLinkedList(5);
list.next.next.next.next.next = list.next;

console.log(findLoop(list));
evalFunctionPerformance(findLoop, list);
