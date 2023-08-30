import type { CellType } from "./types";

export function generateEmptyBoard(
  rows: number,
  cols: number,
  fill = false
): Array<Array<CellType>> {
  const board = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

  if (fill) {
    for (let y = 0; y < board.length; y++) {
      const row = board[y];

      for (let x = 0; x < row.length; x++) {
        board[y][x] = Math.round(Math.random());
      }
    }

    return board;
  }

  return new Array(rows).fill(0).map(() => new Array(cols).fill(0));
}

export function updateBoard(
  rows: number,
  cols: number,
  board: CellType[][]
): CellType[][] {
  const newBoard = generateEmptyBoard(rows, cols);

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

  return newBoard;
}
