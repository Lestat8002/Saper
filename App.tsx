import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Board from './components/Board';
import GameControls from './components/GameControls';
import GameStatusModal from './components/GameStatusModal';
import Help from './components/Help';
import { createBoard, revealCells, revealAllMines } from './utils/minesweeper';
import type { Cell } from './types';
import { GameStatus, Difficulty } from './types';
import { DIFFICULTY_SETTINGS } from './constants';
import { IMAGES } from './assets/images';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [board, setBoard] = useState<Cell[][]>(() => createBoard(DIFFICULTY_SETTINGS[Difficulty.Easy]));
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Ready);
  const [time, setTime] = useState<number>(0);
  const [firstClick, setFirstClick] = useState<boolean>(true);
  const [interactionMode, setInteractionMode] = useState<'reveal' | 'flag'>('reveal');
  const [backgroundImage, setBackgroundImage] = useState<string>(
    () => IMAGES[Math.floor(Math.random() * IMAGES.length)]
  );

  const mineCount = useMemo(() => DIFFICULTY_SETTINGS[difficulty].mines, [difficulty]);
  
  const flagsUsed = useMemo(() => {
    return board.flat().filter(cell => cell.isFlagged).length;
  }, [board]);

  const resetGame = useCallback((newDifficulty: Difficulty) => {
    setBackgroundImage(IMAGES[Math.floor(Math.random() * IMAGES.length)]);
    setDifficulty(newDifficulty);
    setBoard(createBoard(DIFFICULTY_SETTINGS[newDifficulty]));
    setGameStatus(GameStatus.Ready);
    setTime(0);
    setFirstClick(true);
    setInteractionMode('reveal');
  }, []);

  const startNewGame = useCallback(() => {
    resetGame(difficulty);
  }, [difficulty, resetGame]);

  useEffect(() => {
    if (gameStatus === GameStatus.Playing && !firstClick) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStatus, firstClick]);

  useEffect(() => {
    if (gameStatus !== GameStatus.Playing) return;

    const nonMineCells = board.flat().filter(cell => !cell.isMine);
    const revealedCount = nonMineCells.filter(cell => cell.isRevealed).length;
    
    if (nonMineCells.length > 0 && revealedCount === nonMineCells.length) {
      setGameStatus(GameStatus.Won);
      setBoard(prevBoard => prevBoard.map(row => row.map(cell => {
        if (cell.isMine && !cell.isFlagged) {
          return { ...cell, isFlagged: true };
        }
        return cell;
      })));
    }
  }, [board, gameStatus]);

  const handleToggleMark = useCallback((row: number, col: number) => {
    if (gameStatus === GameStatus.Lost || gameStatus === GameStatus.Won) return;

    const newBoard = board.map(r => r.map(c => ({ ...c })));
    const cell = newBoard[row][col];

    if (cell.isRevealed) return;

    if (!cell.isFlagged && !cell.isQuestioned) {
        if (flagsUsed < mineCount) {
            cell.isFlagged = true;
        }
    } else if (cell.isFlagged) {
        cell.isFlagged = false;
        cell.isQuestioned = true;
    } else if (cell.isQuestioned) {
        cell.isQuestioned = false;
    }
    setBoard(newBoard);
  }, [board, gameStatus, flagsUsed, mineCount]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameStatus === GameStatus.Lost || gameStatus === GameStatus.Won) return;

    if (interactionMode === 'flag') {
        handleToggleMark(row, col);
        return;
    }
    
    let currentBoard = board;
    if (gameStatus === GameStatus.Ready) {
        setGameStatus(GameStatus.Playing);
    }

    if (firstClick) {
      setFirstClick(false);
      if (currentBoard[row][col].isMine) {
          let newBoard: Cell[][];
          do {
            newBoard = createBoard(DIFFICULTY_SETTINGS[difficulty]);
          } while (newBoard[row][col].isMine);
          currentBoard = newBoard;
      }
    }

    const cell = currentBoard[row][col];
    if (cell.isRevealed || cell.isFlagged || cell.isQuestioned) return;

    if (cell.isMine) {
      setGameStatus(GameStatus.Lost);
      setBoard(revealAllMines(currentBoard));
      return;
    }

    setBoard(revealCells(currentBoard, row, col));
  }, [board, gameStatus, firstClick, difficulty, interactionMode, handleToggleMark]);

  const handleCellContextMenu = useCallback((e: React.MouseEvent<HTMLButtonElement>, row: number, col: number) => {
    e.preventDefault();
    handleToggleMark(row, col);
  }, [handleToggleMark]);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    resetGame(newDifficulty);
  };

  const handleInteractionModeChange = () => {
    setInteractionMode(prev => prev === 'reveal' ? 'flag' : 'reveal');
  }
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-100 tracking-wider">САПЕР</h1>
        <GameControls
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            onNewGame={startNewGame}
            gameStatus={gameStatus}
            mineCount={mineCount}
            flagsUsed={flagsUsed}
            time={time}
            interactionMode={interactionMode}
            onInteractionModeChange={handleInteractionModeChange}
        />
        <div 
          className="relative flex justify-center items-center my-4 p-2 rounded-lg overflow-hidden shadow-lg transition-all duration-500"
          style={{
              minHeight: '24rem',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
          }}
        >
            <Board
                board={board}
                onCellClick={handleCellClick}
                onCellContextMenu={handleCellContextMenu}
            />
        </div>
        <GameStatusModal status={gameStatus} onNewGame={startNewGame} />
        <Help />
        <footer className="text-slate-400 mt-8 text-center">
            <p>Сделано с ❤️ на React и Tailwind CSS.</p>
        </footer>
    </div>
  );
};

export default App;
