import { POSSIBILITIES } from "./utils";

export function rowPossibilities(values: number[][], x: number) {
    let temp = [...POSSIBILITIES];
  
    for (let i = 0; i < 9; i++) {
      const value = values[x][i]
  
      if (value) {
        temp = temp.filter(val => val !== value)
      }
    }
  
    return temp;
  }
      
  export function columnPossibilities(values: number[][], y: number) {
    let temp = [...POSSIBILITIES];
  
    for (let i = 0; i < 9; i++) {
      const value = values[i][y]
  
      if (value) {
        temp = temp.filter(val => val !== value)
      }
    }
  
    return temp;
  }
    
  export function gridPossibilities(values: number[][], x: number, y: number) {
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