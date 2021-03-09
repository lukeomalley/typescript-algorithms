import evalFunctionPerformance from '../lib/evalFunctionPerformance';

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

class ContinuousMedianHAndler {
  median: number | null;

  constructor() {
    this.median = null;
  }

  insert() {
    // Write solution here
  }

  getMedian() {
    // Write solution here
    return this.median;
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
}

// =============================================================================
// Tests
// =============================================================================

// console.log(continuousMedian(''));
