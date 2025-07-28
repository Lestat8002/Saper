
import React from 'react';
import type { Cell as CellType } from '../types';
import { CELL_NUMBER_COLORS } from '../constants';

interface CellProps {
  cell: CellType;
  onClick: (row: number, col: number) => void;
  onContextMenu: (e: React.MouseEvent<HTMLButtonElement>, row: number, col: number) => void;
}

const Cell: React.FC<CellProps> = ({ cell, onClick, onContextMenu }) => {
  const { row, col, isRevealed, isMine, isFlagged, isQuestioned, adjacentMines } = cell;

  const getCellContent = (): React.ReactNode => {
    if (isFlagged) {
      return '🚩';
    }
    if (isQuestioned) {
      return <span className="font-bold text-yellow-300">?</span>;
    }
    if (!isRevealed) {
      return null;
    }
    if (isMine) {
      return '💣';
    }
    if (adjacentMines > 0) {
      return <span className={`font-bold ${CELL_NUMBER_COLORS[adjacentMines]} [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]`}>{adjacentMines}</span>;
    }
    return null;
  };

  const baseClasses = 'w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xl select-none transition-colors duration-150';
  let cellClasses = '';

  if (!isRevealed) {
    cellClasses = 'bg-slate-500 hover:bg-slate-400 border-t-2 border-l-2 border-slate-600 active:border-0';
  } else {
    if (isMine) {
      cellClasses = 'bg-red-600/70';
    } else {
      cellClasses = 'bg-transparent border border-white/20';
    }
  }
  
  if (isFlagged || isQuestioned) {
    cellClasses += ' text-2xl';
  }

  return (
    <button
      className={`${baseClasses} ${cellClasses}`}
      onClick={() => onClick(row, col)}
      onContextMenu={(e) => onContextMenu(e, row, col)}
      disabled={isRevealed}
      aria-label={`Ячейка ${row+1}, ${col+1}`}
    >
      {getCellContent()}
    </button>
  );
};

export default Cell;
