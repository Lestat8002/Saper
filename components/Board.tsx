
import React from 'react';
import type { Cell as CellType } from '../utils/types';
import Cell from './Cell';

interface BoardProps {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  onCellContextMenu: (e: React.MouseEvent<HTMLElement>, row: number, col: number) => void;
  imageUrl: string;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, onCellContextMenu, imageUrl }) => {
  const style: React.CSSProperties = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div
      className="inline-block rounded-md overflow-hidden shadow-lg border-2 border-slate-600"
      style={style}
    >
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
