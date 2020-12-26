import evalFunctionPerformance from '../lib/evalFunctionPerformance';

enum Direction {
  East = 'EAST',
  West = 'WEST',
}

/**
 * Sunset Views
 *
 * Given an array of buildings and a direction that all the buildings face,
 * return an array of the indices of the buildings that can see the sunset.
 *
 * A building can see the sunset if it's strictly taller than all of the
 * buildings that come after it in the direction that it faces.
 *
 * Indices in the output should be sorted in ascending order.
 *
 * Input: [3, 5, 4, 4, 3, 1, 3, 2], "EAST"
 * Output: [1, 3, 6, 7]
 *
 * Time:
 * Space:
 */
function sunsetViews(buildings: number[], direction: Direction): number[] {
  let currentMax = 0;
  const canSeeSunset: number[] = [];

  switch (direction) {
    case 'EAST':
      for (let i = buildings.length - 1; i >= 0; i--) {
        const currentBuildingHeight = buildings[i];
        if (currentBuildingHeight > currentMax) {
          currentMax = currentBuildingHeight;
          canSeeSunset.unshift(i);
        }
      }
      return canSeeSunset;
    case 'WEST':
      for (let i = 0; i < buildings.length; i++) {
        const currentBuildingHeight = buildings[i];
        if (currentBuildingHeight > currentMax) {
          currentMax = currentBuildingHeight;
          canSeeSunset.push(i);
        }
      }
      return canSeeSunset;

    default:
      return [];
  }
}

// =============================================================================
// Tests
// =============================================================================

console.log(sunsetViews([3, 5, 4, 4, 3, 1, 3, 2], Direction.East));
evalFunctionPerformance(sunsetViews, [3, 5, 4, 4, 3, 1, 3, 2], Direction.East);
