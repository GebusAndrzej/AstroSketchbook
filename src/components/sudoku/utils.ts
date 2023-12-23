export const DEFAULT_VALUES: number[][] = Array(9).fill(undefined).map(() => Array(9).fill(undefined))
export const POSSIBILITIES = [1,2,3,4,5,6,7,8,9]

export function checkRow(values: number[][], x: number) {
    let temp = [...POSSIBILITIES];
  
    for (let i = 0; i < 9; i++) {
      const value = values[x][i]
  
      if (value) {
        temp = temp.filter(val => val !== value)
      }
    }
  
    return temp;
  }
    
export function checkColumn(values: number[][], y: number) {
    let temp = [...POSSIBILITIES];
  
    for (let i = 0; i < 9; i++) {
      const value = values[i][y]
  
      if (value) {
        temp = temp.filter(val => val !== value)
      }
    }
  
    return temp;
  }
  
export function checkGrid(values: number[][], x: number, y: number) {
    let temp = [...POSSIBILITIES];
    const horizontalGridNumber = Math.floor(x / 3) * 3;
    const verticalGridNumber = Math.floor(y / 3) * 3;
  
    for (let i = horizontalGridNumber; i < horizontalGridNumber + 3; i++) {
      for (let j = verticalGridNumber; j < verticalGridNumber + 3; j++) {
        const value = values[i][j]
  
        if (value) {
          temp = temp.filter(val => val !== value)
        }
      }
    }
  
    return temp;
  }
  
export function intersection(array1: number[], array2: number[]): number[] {
    return array1.filter(function(n) {
      return array2.indexOf(n) !== -1;
    });
  }