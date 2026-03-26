export const DEFAULT_VALUES: number[][] = Array(9).fill(undefined).map(() => Array(9).fill(undefined))
export const POSSIBILITIES = [1,2,3,4,5,6,7,8,9]

export const countArray = (values: number[]): {[key: number]: number} => 
  values.reduce((acc,value) => {
    const obj = {
      ...acc,
      [value]: values.filter(x => x === value).length
    }
    // @ts-ignore
    delete(obj[undefined])

    return obj;
  },
  {}
)

export const transpose = (matrix: number[][]) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < row; column++) {
      let temp = matrix[row][column]
      matrix[row][column] = matrix[column][row]
      matrix[column][row] = temp
    }
  }
  return matrix;
}

export function xyToGridNo(x: number, y: number) {
  const horizontalGridNumber = Math.floor(x / 3);
  const verticalGridNumber = Math.floor(y / 3);

  return +`${horizontalGridNumber}${verticalGridNumber}`
}

export function intersection(array1: number[], array2: number[]): number[] {
  return array1.filter(function(n) {
    return array2.indexOf(n) !== -1;
  });
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function isValidPlacement(board: number[][], row: number, col: number, num: number): boolean {
  for (let j = 0; j < 9; j++) {
    if (board[row][j] === num) return false;
  }
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }
  return true;
}

function fillBoard(board: number[][]): boolean {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        for (const num of shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (isValidPlacement(board, i, j, num)) {
            board[i][j] = num;
            if (fillBoard(board)) return true;
            board[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function generateSudokuPuzzle(clues = 30): number[][] {
  const board: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));
  fillBoard(board);

  const positions = shuffleArray(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9] as [number, number])
  );

  let removed = 0;
  for (const [row, col] of positions) {
    if (removed >= 81 - clues) break;
    board[row][col] = 0;
    removed++;
  }

  return board.map(row => row.map(cell => (cell === 0 ? undefined : cell))) as unknown as number[][];
}
