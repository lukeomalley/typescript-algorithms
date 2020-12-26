import evalFunctionPerformance from '../lib/evalFunctionPerformance';

class SinglyLinkedList {
  value: number;

  next: SinglyLinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

function printList(head: SinglyLinkedList) {
  let currentNode = head;
  while (currentNode !== null) {
    console.log(currentNode.value);
    currentNode = currentNode.next!;
  }
}

/**
 * Reverse Linked List
 *
 * Write a function that takes in the head of a Singly Linked List, revreses the
 * list in place, and returns the new head.
 *
 * Input: 1 -> 2 -> 3 -> 4 -> 5
 * Output: 5 -> 4 -> 3 -> 2 -> 1
 *
 * Time: O(n)
 * Space: O(1)
 */
function reverseLinkedList(head: SinglyLinkedList): SinglyLinkedList {
  let prevNode = null;
  let node = head;

  while (node !== null) {
    const tmpNextNode = node.next;
    node.next = prevNode;
    prevNode = node;
    node = tmpNextNode!;
  }

  return prevNode!;
}

// =============================================================================
// Tests
// =============================================================================

let head = new SinglyLinkedList(1);
head.next = new SinglyLinkedList(2);
head.next.next = new SinglyLinkedList(3);
head.next.next.next = new SinglyLinkedList(4);
head.next.next.next.next = new SinglyLinkedList(5);

printList(head);

head = reverseLinkedList(head);
console.log('\n========\n');

printList(head);
