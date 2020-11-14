import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * You're given an array of non-negative integers where each non-zero
 * integer represents the height of a pillar of width 1.
 * Imagine water being poured over all of the pillars; write a function
 * that returns the surface area of the water trapped between the pillars
 * viewed from the front. Note that spilled water should be ignored.
 *
 * Sample Input: [0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3]
 * Sample Output: 48
 */
function waterArea(heights: number[]): number {
  let waterHeight = 0;

  heights.forEach((height, i) => {
    const leftMax = findMax(heights, i, 'left');
    const rightMax = findMax(heights, i, 'right');

    const currWaterHeight = Math.min(leftMax, rightMax) - height;
    waterHeight += Math.max(0, currWaterHeight);
  });

  return waterHeight;
}

function findMax(heights: number[], index: number, direction: 'left' | 'right'): number {
  let currMaxHeight = 0;
  if (direction === 'left') {
    for (let i = 0; i < index; i++) {
      if (heights[i] > currMaxHeight) {
        currMaxHeight = heights[i];
      }
    }
  } else {
    for (let i = index; i < heights.length; i++) {
      if (heights[i] > currMaxHeight) {
        currMaxHeight = heights[i];
      }
    }
  }

  return currMaxHeight;
}

console.log(waterArea([0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3]) === 48);
evalFunctionPerformance(waterArea);
