import { useState, useEffect, useLayoutEffect, useMemo } from "react";

import { generateEmptyBoard, updateBoard } from "./utils";

import { useForceUpdate } from "./hooks";

import type { CellType } from "./types";

let board: CellType[][] = [];

type CellClickArgs = {
  cellType: CellType;
  coordinates: [number, number];
};

export function useGame(cols: number, rows: number) {
  const forceUpdate = useForceUpdate();

  useMemo(() => {
    board = generateEmptyBoard(rows, cols);

    forceUpdate();
  }, [cols, rows, forceUpdate]);

  const [time, setTime] = useState(1000);
  const [isStopped, setIsStopped] = useState(true);

  const onCellClick = ({ cellType, coordinates: [x, y] }: CellClickArgs) => {
    board[y][x] = cellType === 0 ? 1 : 0;

    forceUpdate();
  };

  const reset = () => {
    board = generateEmptyBoard(rows, cols);

    forceUpdate();
  };

  const generateRandomBoard = () => {
    board = generateEmptyBoard(rows, cols, true);

    forceUpdate();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isStopped) {
        clearInterval(intervalId);

        return;
      }

      board = updateBoard(rows, cols, board);
      forceUpdate();
    }, time);

    return () => clearInterval(intervalId);
  }, [isStopped, forceUpdate, time, cols, rows]);

  const values = {
    board,
    isStopped,
    time,
  };

  const handlers = {
    onCellClick,
    setIsStopped,
    reset,
    generateRandomBoard,
    setTime,
  };

  return [values, handlers] as const;
}
