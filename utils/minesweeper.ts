
import type { Cell, DifficultySetting } from './types';

export const createBoard = ({ rows, cols, mines }: DifficultySetting): Cell[][] => {
  // 1. Initialize empty board
  const board: Cell[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      isQuestioned: false,
      adjacentMines: 0,
    }))
  );

  // 2. Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // 3. Calculate adjacent mines for each cell
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let mineCount = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newRow = r + i;
          const newCol = c + j;
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol].isMine) {
            mineCount++;
          }
        }
      }
      board[r][c].adjacentMines = mineCount;
    }
  }

  return board;
};

export const revealCells = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const rows = newBoard.length;
  const cols = newBoard[0].length;
  const stack: [number, number][] = [[row, col]];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const [r, c] = stack.pop()!;
    const key = `${r},${c}`;

    if (visited.has(key) || r < 0 || r >= rows || c < 0 || c >= cols) {
      continue;
    }
    
    const cell = newBoard[r][c];
    if (cell.isFlagged || cell.isRevealed || cell.isQuestioned) {
        continue;
    }

    visited.add(key);
    cell.isRevealed = true;

    if (cell.isMine) {
      // Game over logic will be handled in App.tsx
      // For now, just reveal the clicked mine
      return newBoard;
    }

    if (cell.adjacentMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          stack.push([r + i, c + j]);
        }
      }
    }
  }

  return newBoard;
};

export const revealAllMines = (board: Cell[][]): Cell[][] => {
    return board.map(row => 
        row.map(cell => {
            if (cell.isMine) {
                return { ...cell, isRevealed: true };
            }
            return cell;
        })
    );
};