import { useMemo, type FC, useState, useCallback } from 'react'
import SudokuTile from './SudokuTile'
import './Sudoku.css'
import { DEFAULT_VALUES, checkColumn, checkGrid, checkRow, intersection } from './utils'

const Sudoku: FC = () => {
  const [values, setValues] = useState(DEFAULT_VALUES)

  const preparePossibilities = useCallback(
    (x: number, y: number) => {
      const rows = checkRow(values, x);
      const cols = checkColumn(values, y);
      const grid = checkGrid(values, x, y);

      const rowsAndCols = intersection(rows, cols)
      return intersection(rowsAndCols, grid);
    },
    [values]
  )

  const preparedValues = useMemo(
    () => {
      const a = values
        .map((column, x) => column.map((value, y) => ({
          value,
          possibilities: preparePossibilities(x,y),
          x,
          y,
        })))

        return a;
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
    <div className='h-full w-full'>
      <div className='sudoku grid grid-rows-9 grid-cols-9 gap-1'>
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
          />
          ))}
      </div>
    </div>
  )
}

export default Sudoku