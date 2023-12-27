import { useMemo, type FC, useState, useCallback } from 'react'
import SudokuTile from './SudokuTile'
import { DEFAULT_VALUES, intersection, xyToGridNo } from './utils/utils'
import './Sudoku.css'
import { columnPossibilities, gridPossibilities, rowPossibilities } from './utils/possibilities'
import { checkColumns, checkGrids, checkRows } from './utils/rules'

const Sudoku: FC = () => {
  const [values, setValues] = useState(DEFAULT_VALUES)

  const preparePossibilities = useCallback(
    (x: number, y: number) => {
      const rows = rowPossibilities(values, x);
      const cols = columnPossibilities(values, y);
      const grid = gridPossibilities(values, x, y);

      const rowsAndCols = intersection(rows, cols)
      return intersection(rowsAndCols, grid);
    },
    [values]
  )

  const preparedValues = useMemo(
    () => {
      const rowsCheck = checkRows(values);
      const columnsCheck = checkColumns(values);
      const gridsCheck = checkGrids(values);
      
      const newValues = values
        .map((column, x) => column.map((value, y) => ({
          value,
          possibilities: preparePossibilities(x,y),
          x,
          y,
          invalid: 
            rowsCheck[x][value] > 1 ||
            columnsCheck[y][value] > 1 ||
            gridsCheck[xyToGridNo(x,y)][value] > 1
        })))

        return newValues;
    },
    [values]
  )

  
  const minPossibilities = useMemo(
    () => Math.min(
        ...preparedValues
          .flat()
          .filter(x => !x.value)
          .filter(x => x.possibilities.length > 1)
          .map(x => x.possibilities.length)
      ),
    [preparedValues]
  )

  const handleCollapse = useCallback(
    (x: number, y: number, value: number) => {
      setValues(prev => {
        const newValue = [...prev];
        newValue[x][y] = value;
        return newValue;
      })
    },
    [values, setValues]
  )

  return (
    // <div className='h-full w-full'>
      <div className='sudoku h-full w-full grid grid-rows-9 grid-cols-9 gap-1'>
        {preparedValues.flat().map((entry) => (
          <SudokuTile
            key={`${entry.x}${entry.y}${entry.value}`}
            value={entry.value}
            possibilities={entry.possibilities}
            x={entry.x}
            y={entry.y}
            onCollapse={handleCollapse}
            isLowestEntropy={
              !entry.value && 
              entry.possibilities.length === minPossibilities &&
              entry.possibilities.length < 9
            }
            invalid={entry.invalid}
          />
          ))}
      </div>
    // </div>
  )
}

export default Sudoku