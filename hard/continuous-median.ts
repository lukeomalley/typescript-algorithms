/**
 * Continuous Median
 *
 * Write a continuous median handler class that supports:
 *    - The continuous insertion of numbers with an `insert` method
 *    - The instant O(1) retrieval of the median of the numbers that have been
 *      inserted thus far with a `getMedian` method
 *
 * The median of a set of numbers is the "middle" number when the numbers are
 * ordered from least to greatest. If there's an odd number of numbers in the set
 * the median is the middle number. If there is an even number of numbers in the
 * set then the median is the average of the two numbers in the middle
 *
 * Sample Usage:
 *   const medianHandler = new MedianHandler()
 *   medianHandler.insert(5)
 *   medianHandler.insert(10)
 *   medianHandler.getMedian() ==> 7.5
 *   medianHandler.insert(100)
 *   medianHandler.getMedian() ==> 55
 *
 * Time: Insert: O(log(n))
 * Space:
 */

class ContinuousMedianHandler {
  lowerHalf: Heap;
  upperHalf: Heap;
  median: number | null;

  constructor() {
    this.lowerHalf = new Heap(MAX_HEAP_FUNC, []);
    this.upperHalf = new Heap(MIN_HEAP_FUNC, []);
    this.median = null;
  }

  insert(number: number) {
    if (!this.lowerHalf.length || number < this.lowerHalf.peek()) {
      this.lowerHalf.insert(number);
    } else {
      this.upperHalf.insert(number);
    }

    this.rebalanceHeaps();
    this.updateMedian();
  }

  getMedian() {
    return this.median;
  }

  private rebalanceHeaps() {
    if (this.lowerHalfHasTwoMore()) {
      this.upperHalf.insert(this.lowerHalf.remove()!);
    } else if (this.upperHalfHasTwoMore()) {
      this.lowerHalf.insert(this.upperHalf.remove()!);
    }
  }

  private updateMedian() {
    if (this.lowerHalf.length === this.upperHalf.length) {
      this.median = (this.lowerHalf.peek() + this.upperHalf.peek()) / 2;
    } else if (this.lowerHalf.length > this.upperHalf.length) {
      this.median = this.lowerHalf.peek();
    } else {
      this.median = this.upperHalf.peek();
    }
  }

  private lowerHalfHasTwoMore() {
    return this.lowerHalf.length - this.upperHalf.length === 2;
  }

  private upperHalfHasTwoMore() {
    return this.upperHalf.length - this.lowerHalf.length === 2;
  }
}

class Heap {
  heap: number[];
  comparisonFunc: (a: number, b: number) => boolean;
  length: number;

  constructor(comparisonFunc: (a: number, b: number) => boolean, array: number[]) {
    this.comparisonFunc = comparisonFunc;
    this.heap = this.buildHeap(array);
    this.length = this.heap.length;
  }

  buildHeap(array: number[]): number[] {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }

    return array;
  }

  peek() {
    return this.heap[0];
  }

  remove() {
    this.swap(0, this.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.length--;
    this.siftDown(0, this.length - 1, this.heap);
    return valueToRemove;
  }

  insert(number: number) {
    this.heap.push(number);
    this.length++;
    this.siftUp(this.length - 1, this.heap);
  }

  private siftDown(currentIdx: number, endIdx: number, heap: number[]) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap: number;
      if (childTwoIdx !== -1) {
        if (this.comparisonFunc(heap[childTwoIdx], heap[childOneIdx])) {
          idxToSwap = childTwoIdx;
        } else {
          idxToSwap = childOneIdx;
        }
      } else {
        idxToSwap = childOneIdx;
      }

      if (this.comparisonFunc(heap[idxToSwap], heap[currentIdx])) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  private siftUp(currentIdx: number, heap: number[]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0) {
      if (this.comparisonFunc(heap[currentIdx], heap[parentIdx])) {
        this.swap(currentIdx, parentIdx, heap);
        currentIdx = parentIdx;
        parentIdx = Math.floor((currentIdx - 1) / 2);
      } else {
        return;
      }
    }
  }

  private swap(i: number, j: number, heap: number[]) {
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }
}

function MAX_HEAP_FUNC(a: number, b: number): boolean {
  return a > b;
}

function MIN_HEAP_FUNC(a: number, b: number): boolean {
  return a < b;
}

// =============================================================================
// Tests
// =============================================================================

const medianHelper = new ContinuousMedianHandler();
medianHelper.insert(5);
medianHelper.insert(10);
medianHelper.insert(100);
medianHelper.insert(200);
medianHelper.insert(6);
medianHelper.insert(13);
medianHelper.insert(14);
console.log(medianHelper.getMedian()); // 10
medianHelper.insert(50);
console.log(medianHelper.getMedian()); // 55
