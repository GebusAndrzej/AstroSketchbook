import { useCallback, type FC, useEffect } from "react";

type Props = {
    value?: number | undefined;
    possibilities?: number[];
    x: number,
    y: number;
    onCollapse?: (x: number, y: number, value: number) => void;
    isLowestEntropy?: boolean;
    invalid?: boolean;
}

const SudokuTile: FC<Props> = ({
    possibilities = [], 
    value,
    x,
    y,
    invalid = false,
    onCollapse,
    isLowestEntropy = false,
}) => {
    const conditionalCss = [
        'w-full h-full overflow-hidden',
        'border rounded',
        value
            ? "flex justify-center items-center"
            : "grid grid-rows-3 grid-cols-3",
        isLowestEntropy 
            ? 'border-green-700 bg-green-900'
            : 'border-slate-800',
        !possibilities.length && !value && 'bg-red-900',
        invalid && 'bg-red-900'
    ].join(' ')

    const handleCollapse = useCallback(
        (value: number) => {
            onCollapse?.(x,y,value);
        },
        [onCollapse]
    )

    useEffect(
        () => {
            if (!value && possibilities.length === 1) {
                if (!possibilities[0]) return;

                handleCollapse(possibilities[0])
            }
        },
        [possibilities, value]
    )

  return (
    <div 
        className={conditionalCss}
        data-x={x}
        data-y={y}
    >
        {!!value
            ? value
            : (
                possibilities.map(number => (
                    <div 
                        key={number}
                        className="sudokuTile flex justify-center items-center cursor-pointer"
                        onClick={() => handleCollapse(number)}
                    >
                        {number}
                    </div>
                ))
            )}
    </div>
  )
}

export default SudokuTile