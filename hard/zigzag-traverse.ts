import evalFunctionPerformance from '../lib/evalFunctionPerformance';

// O(n) Time | O(n) Space
function zigZagTraverse(array: number[][]): number[] {
  const height = array.length - 1;
  const width = array[0].length - 1;
  let row = 0;
  let col = 0;
  let goingDown = true;

  const result = [];

  while (!outOfBounds(row, col, height, width)) {
    result.push(array[row][col]);

    if (goingDown) {
      if (col === 0 || row === height) {
        goingDown = !goingDown;

        if (row === height) {
          col += 1;
        } else {
          row += 1;
        }
      } else {
        col -= 1;
        row += 1;
      }
    } else if (col === width || row === 0) {
      goingDown = !goingDown;
      if (col === width) {
        row += 1;
      } else {
        col += 1;
      }
    } else {
      row -= 1;
      col += 1;
    }
  }

  return result;
}

function outOfBounds(row: number, col: number, height: number, width: number): boolean {
  return row > height || row < 0 || col > width || col < 0;
}

console.log(
  zigZagTraverse([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
);
evalFunctionPerformance(zigZagTraverse, [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);
