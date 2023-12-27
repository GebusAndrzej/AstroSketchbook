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
