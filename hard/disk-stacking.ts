import evalFunctionPerformance from '../lib/evalFunctionPerformance';

// Disk stores data in [width, depth, height]
type Disk = [number, number, number];

/**
 * Disk Stacking
 *
 * You're given a non-empty array of arrays where each subarray holds three
 * integers and represents a disk. These integers denote each disk's width,
 * depth, and height, respectively. Your goal is to stack up the disks and to
 * maximize the total height of the stack. A disk must have a strictly smaller
 * width, depth, and height than any other disk below it.
 *
 * Write a function that returns an array of the disks in the final stack,
 * starting with the top disk and ending with the bottom disk. Note that you
 * can't rotate disks; in other words, the integers in each subarray must
 * represent [width, depth, height] at all times.
 *
 * You can assume that there will only be one stack with the greatest total height.
 *
 * Input: [[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]]
 * Output: [[2, 1, 2], [3, 2, 3], [4, 4, 5]]
 */
function diskStacking(disks: Disk[]) {
  const disksSortedByHeight = disks.sort((a, b) => a[2] - b[2]);
  const heights = disksSortedByHeight.map((d) => d[2]);
  const sequence = new Array(heights.length);
  let maxHeightIndex = 0;

  for (let i = 1; i < disksSortedByHeight.length; i++) {
    const currentDisk = disksSortedByHeight[i];

    // Iterate through all the shorter disks
    for (let j = 0; j < i; j++) {
      const otherDisk = disksSortedByHeight[j];
      if (diskCanStack(currentDisk, otherDisk) && makesStackTaller(currentDisk, heights[i], heights[j])) {
        heights[i] = currentDisk[2] + heights[j];
        sequence[i] = j;
      }
    }

    if (heights[i] >= heights[maxHeightIndex]) {
      maxHeightIndex = i;
    }
  }
  console.log(heights);

  return findStackedDisks(disksSortedByHeight, sequence, maxHeightIndex);
}

// =============================================================================
// Helper Functions
// =============================================================================

function diskCanStack(baseDisk: Disk, potentialStack: Disk): boolean {
  return baseDisk[0] > potentialStack[0] && baseDisk[1] > potentialStack[1] && baseDisk[2] > potentialStack[2];
}

function makesStackTaller(currentDisk: Disk, currentHeight: number, otherHeight: number): boolean {
  return currentHeight <= currentDisk[2] + otherHeight;
}

function findStackedDisks(disks: Disk[], sequence: number[], startingIndex: number): Disk[] {
  const stackedDisks: Disk[] = [];

  let currentIndex = startingIndex;
  while (currentIndex !== undefined) {
    stackedDisks.unshift(disks[currentIndex]);
    currentIndex = sequence[currentIndex];
  }

  return stackedDisks;
}

// =============================================================================
// Tests
// =============================================================================

console.log(
  diskStacking([
    [2, 1, 2],
    [3, 2, 3],
    [2, 2, 8],
    [2, 3, 4],
    [1, 3, 1],
    [4, 4, 5],
  ]),
);

evalFunctionPerformance(diskStacking, [
  [2, 1, 2],
  [3, 2, 3],
  [2, 2, 8],
  [2, 3, 4],
  [1, 3, 1],
  [4, 4, 5],
]);
