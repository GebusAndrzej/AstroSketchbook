import { countArray, transpose, xyToGridNo } from "./utils";

export function checkRows(values: number[][]) {
    return values.map(countArray)
  }
  
  export function checkColumns(values: number[][]) {
    const matrixClone = structuredClone(values);
    return transpose(matrixClone).map(countArray)
  }
  
  export function checkGrids(values: number[][]) {
    const temp: number[][] = [];
  
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y ++) {
        const value = values[x][y];
        const gridNo = xyToGridNo(x,y);
  
        temp[gridNo] = [...(temp[gridNo] ?? []), value]
      }
    }
  
    return temp.map(countArray)
  }
  