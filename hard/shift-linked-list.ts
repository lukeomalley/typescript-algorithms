/**
 * Shift Linked List
 *
 * Write a function that takes in the head of a Singly Linked List and an integer
 * `k`, and shifts the linked list in place by `k` positions, and returns its new
 * head.
 *
 * Shifting a Linked List means moving its nodes forward or backward and wrapping
 * them around the list where appropriate. For example, shifting a Linked List
 * forward by one position would make its tail become the new head of the linked
 * list.
 *
 * Whether nodes are moved forward or backward is determined by whether k is
 * positive or negative.
 *
 * You can assume that the Linked list will have at least one node
 *
 * Input: 0 --> 1 --> 2 --> 3 --> 4 --> 5, k = 2
 * Output: 4 --> 5 --> 0 --> 1 --> 2 --> 3
 *
 * Time:
 * Space:
 */

class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

function shiftLinkedList(head: LinkedList, k: number): any {
  // Write solution here
}

// =============================================================================
// Tests
// =============================================================================
