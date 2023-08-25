import { useState, useEffect } from "react";

const cols = 20;
const rows = 20;

type CellType = 1 | 0;

const generateEmptyBoard = (): Array<Array<CellType>> =>
  new Array(rows).fill(0).map(() => new Array(cols).fill(0));

let board = generateEmptyBoard();

export function useGame() {
  const forceUpdate = useState({})[1];
  const [isStopped, setIsStopped] = useState(true);

  const onCellClick = ({
    cellType,
    coordinates,
  }: {
    cellType: CellType;
    coordinates: [number, number];
  }) => {
    const [x, y] = coordinates;
    board[y][x] = cellType === 0 ? 1 : 0;

    forceUpdate({});
  };

  useEffect(() => {
    const updateBoard = () => {
      const newBoard = generateEmptyBoard();

      for (let y = 0; y < board.length; y++) {
        const row = board[y];

        for (let x = 0; x < row.length; x++) {
          const cellType = board[y][x];

          const topLeft = board[y - 1]?.[x - 1] ?? 0;
          const topCenter = board[y - 1]?.[x] ?? 0;
          const topRight = board[y - 1]?.[x + 1] ?? 0;

          const centerLeft = board[y]?.[x - 1] ?? 0;
          const centerRight = board[y]?.[x + 1] ?? 0;

          const bottomLeft = board[y + 1]?.[x - 1] ?? 0;
          const bottomCenter = board[y + 1]?.[x] ?? 0;
          const bootomRight = board[y + 1]?.[x + 1] ?? 0;

          const neighbors =
            topLeft +
            topCenter +
            topRight +
            centerLeft +
            centerRight +
            bottomLeft +
            bottomCenter +
            bootomRight;

          if (cellType === 0) {
            if (neighbors === 3) newBoard[y][x] = 1;
            continue;
          }

          if (neighbors === 0 || neighbors === 1) newBoard[y][x] = 0;
          if (neighbors >= 4) newBoard[y][x] = 0;
          if (neighbors === 2 || neighbors === 3) newBoard[y][x] = 1;
        }
      }

      board = newBoard;
    };

    const intervalId = setInterval(() => {
      if (isStopped) {
        clearInterval(intervalId);

        return;
      }

      updateBoard();
      forceUpdate({});
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isStopped, forceUpdate]);

  return {
    board,
    onCellClick,
    setIsStopped,
    isStopped,
  } as const;
}
