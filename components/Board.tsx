import React from 'react';
import type { Cell as CellType } from '../types';
import Cell from './Cell';

interface BoardProps {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  onCellContextMenu: (e: React.MouseEvent<HTMLButtonElement>, row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, onCellContextMenu }) => {
  return (
    <div className="p-1 inline-block rounded-md bg-transparent">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell) => (
            <Cell
              key={`${cell.row}-${cell.col}`}
              cell={cell}
              onClick={onCellClick}
              onContextMenu={onCellContextMenu}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;