import evalFunctionPerformance from '../lib/evalFunctionPerformance';

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
class DoublyLinkedList {
  head: Node | null;

  tail: Node | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHead(node: Node): DoublyLinkedList {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return this;
    }

    return this.insertBefore(this.head, node);
  }

  // 1 <-> 2 <-> 3 <-> 4
  // 1 <-> 2 <-> 3 <-> 4 <-> 5
  setTail(node: Node) {
    if (!this.tail) {
      return this.setHead(node);
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;

    return this;
  }

  // 1 <-> 2 <-> 3 <-> 4
  // 1 <-> 5 <-> 2 <-> 3 <-> 4
  insertBefore(node: Node, nodeToInsert: Node): DoublyLinkedList {
    if (nodeToInsert === this.head && nodeToInsert === this.tail) {
      return this;
    }

    nodeToInsert.prev = node.prev;
    nodeToInsert.next = node;

    if (node.prev === null) {
      this.head = nodeToInsert;
    } else {
      node.prev.next = nodeToInsert;
    }

    node.prev = nodeToInsert;

    return this;
  }

  // 1 <-> 2 <-> 3 <-> 4
  // 1 <-> 2 <-> 3 <-> 5 <-> 4
  insertAfter(node: Node, nodeToInsert: Node): DoublyLinkedList {
    if (nodeToInsert === this.tail && nodeToInsert === this.head) {
      return this;
    }

    // TODO: First try to remove the node
    nodeToInsert.prev = node;
    nodeToInsert.next = node.next;

    if (!node.next) {
      this.tail = nodeToInsert;
    } else {
      node.next.prev = nodeToInsert;
    }

    node.next = nodeToInsert;

    return this;
  }

  insertAtPosition(position: number, nodeToInsert: Node): DoublyLinkedList {
    if (position === 1) {
      return this.setHead(nodeToInsert);
    }

    const node = this.findAtPosition(position);

    if (node !== null) {
      return this.insertBefore(node, nodeToInsert);
    }

    return this.setTail(nodeToInsert);
  }

  removeNodesWithValue(value: number): DoublyLinkedList {
    let node = this.head;
    while (node) {
      const nodeToRemove = node;
      node = node.next;

      if (nodeToRemove.value === value) {
        this.remove(nodeToRemove);
      }
    }

    return this;
  }

  remove(node: Node): DoublyLinkedList {
    if (node === this.head) {
      this.head = this.head.next;
    }

    if (node === this.tail) {
      this.tail = this.tail.prev;
    }

    return this.removeNodeBindings(node);
  }

  private removeNodeBindings(node: Node): DoublyLinkedList {
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }

    node.prev = null;
    node.next = null;

    return this;
  }

  containsNodeWithValue(value: number): boolean {
    let node = this.head;

    while (node && node.value !== value) {
      node = node.next;
    }

    return node !== null;
  }

  private findAtPosition(position: number): Node | null {
    let node = this.head;
    let currentPosition = 1;
    while (node !== null && currentPosition < position) {
      node = node.next;
      currentPosition += 1;
    }

    return node;
  }
}

// This is an input class. Do not edit.
class Node {
  value: number;

  prev: Node | null;

  next: Node | null;

  constructor(value: number) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// =============================================================================
// Tests
// =============================================================================

function bindNodes(nodeOne: Node, nodeTwo: Node) {
  nodeOne.next = nodeTwo;
  nodeTwo.prev = nodeOne;
}

const linkedList = new DoublyLinkedList();
const one = new Node(1);
const two = new Node(2);
const three = new Node(3);
const four = new Node(4);
const five = new Node(5);
bindNodes(one, two);
bindNodes(two, three);
bindNodes(three, four);
bindNodes(four, five);
linkedList.head = one;
linkedList.tail = five;
linkedList.setHead(four);

console.log(linkedList.head);
