import React from 'react';
import type { Cell as CellType } from '../utils/types';
import { CELL_NUMBER_COLORS } from './constants';

interface CellProps {
  cell: CellType;
  onClick: (row: number, col: number) => void;
  onContextMenu: (e: React.MouseEvent<HTMLElement>, row: number, col: number) => void;
}

const Cell: React.FC<CellProps> = ({ cell, onClick, onContextMenu }) => {
  const { row, col, isRevealed, isMine, isFlagged, isQuestioned, adjacentMines } = cell;

  const getCellContent = (): React.ReactNode => {
    if (isFlagged) return '🚩';
    if (isQuestioned) return <span className="font-bold text-yellow-300">?</span>;

    if (isRevealed) {
        if (isMine) return '💣';
        if (adjacentMines > 0) {
            return <span className={`font-bold ${CELL_NUMBER_COLORS[adjacentMines]} [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]`}>{adjacentMines}</span>;
        }
    }
    return null; // Ничего не показывать, если ячейка не раскрыта и без отметок
  };
  
  const baseClasses = 'w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xl select-none transition-all duration-200';
  let cellClasses = '';

  if (!isRevealed) {
      // ИЗМЕНЕНИЕ: Нераскрытые ячейки теперь полупрозрачные, чтобы фон был виден.
      cellClasses = 'bg-slate-500/40 backdrop-blur-sm hover:bg-slate-400/50 border-t-2 border-l-2 border-slate-400/60 active:border-0';
      if (isFlagged || isQuestioned) {
        cellClasses += ' text-2xl';
      }
  } else {
      if (isMine) {
        // Добавляем размытие и сюда для консистентности
        cellClasses = 'bg-red-600/70 backdrop-blur-sm';
      } else {
        // Фон для пустых раскрытых ячеек - еще более прозрачный для контраста
        cellClasses = 'bg-slate-900/30 backdrop-blur-sm';
      }
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