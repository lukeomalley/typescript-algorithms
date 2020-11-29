/**
 * Doubly Linked List
 *
 * Write a DoublyLinkedList class that has a head and a tail, both of which
 * point to either a linked list Node or null. The class should support:
 *   - Setting the head and tail of the linked list
 *   - Inserting ndoes before and after other nodes as well as at the given positions
 *   - Removing given nodes and removing nodes with given values
 *   - Searching for nodes with given values
 *
 * Note that the setHead, setTail, insertBefore, insertAfter, insertAtPosition, and
 * remove methods all take in actual Nodes as input parameters - not integers, execpt
 * for insert at position, which also takes an integer representing the position,
 * this means that you do not need to create and new nodes in these methods. The
 * input nodes can be either stand-alone nodes or nodes that are already in the linked
 * list. If they are nodes that are already in the linked list, the methods will
 * effectively be moving the nodes within the linked list. You will not be told if the
 * input nodes are alread in the linked list, so your code wil have to defensivelt handle
 * this scenario.
 *
 */

// This is an input class. Do not edit.
class LLNode {
  value: number;

  prev: LLNode | null;

  next: LLNode | null;

  constructor(value: number) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  head: LLNode | null;

  tail: LLNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHead(node: LLNode) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.insertBefore(this.head, node);
  }

  setTail(node: LLNode) {
    if (this.tail === null) {
      this.setHead(node);
      return;
    }

    this.insertAfter(this.tail, node);
  }

  insertBefore(node: LLNode, nodeToInsert: LLNode) {
    if (nodeToInsert === this.head && nodeToInsert === this.tail) {
      return;
    }

    this.remove(nodeToInsert);
    nodeToInsert.prev = node.prev;
    nodeToInsert.next = node;

    if (node.prev === null) {
      this.head = nodeToInsert;
    } else {
      node.prev.next = nodeToInsert;
    }

    node.prev = nodeToInsert;
  }

  insertAfter(node: LLNode, nodeToInsert: LLNode) {
    if (nodeToInsert === this.tail && nodeToInsert === this.head) {
      return;
    }

    this.remove(nodeToInsert);
    nodeToInsert.prev = node;
    nodeToInsert.next = node.next;

    if (node.next === null) {
      this.tail = nodeToInsert;
    } else {
      node.next.prev = nodeToInsert;
    }

    node.next = nodeToInsert;
  }

  insertAtPosition(position: number, nodeToInsert: LLNode) {
    if (position === 1) {
      this.setHead(nodeToInsert);
      return;
    }

    const node = this.findAtPosition(position);

    if (node !== null) {
      this.insertBefore(node, nodeToInsert);
      return;
    }

    this.setTail(nodeToInsert);
  }

  removeNodesWithValue(value: number) {
    let node = this.head;
    while (node !== null) {
      const nodeToRemove = node;
      node = node.next;

      if (nodeToRemove.value === value) {
        this.remove(nodeToRemove);
      }
    }
  }

  remove(node: LLNode) {
    if (node === this.head) {
      this.head = this.head.next;
    }

    if (node === this.tail) {
      this.tail = this.tail.prev;
    }

    removeNodeBindings(node);
  }

  containsNodeWithValue(value: number): boolean {
    let node = this.head;

    while (node !== null && node.value !== value) {
      node = node.next;
    }

    return node !== null;
  }

  private findAtPosition(position: number): LLNode | null {
    let node = this.head;
    let currentPosition = 1;
    while (node !== null && currentPosition < position) {
      node = node.next;
      currentPosition += 1;
    }

    return node;
  }
}

function removeNodeBindings(node: LLNode) {
  if (node.prev !== null) {
    node.prev.next = node.next;
  }
  if (node.next !== null) {
    node.next.prev = node.prev;
  }

  node.prev = null;
  node.next = null;
}

// =============================================================================
// Tests
// =============================================================================

function bindNodes(nodeOne: LLNode, nodeTwo: LLNode) {
  nodeOne.next = nodeTwo;
  nodeTwo.prev = nodeOne;
}

const linkedList = new DoublyLinkedList();
const one = new LLNode(1);
const two = new LLNode(2);
const three = new LLNode(3);
const four = new LLNode(4);
const five = new LLNode(5);
bindNodes(one, two);
bindNodes(two, three);
bindNodes(three, four);
bindNodes(four, five);
linkedList.head = one;
linkedList.tail = five;
linkedList.setHead(four);

console.log(linkedList.head);
