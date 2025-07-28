import React from 'react';
import { Difficulty, GameStatus } from '../types';

interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
  gameStatus: GameStatus;
  mineCount: number;
  flagsUsed: number;
  time: number;
  interactionMode: 'reveal' | 'flag';
  onInteractionModeChange: () => void;
}

const Face: React.FC<{gameStatus: GameStatus}> = ({ gameStatus }) => {
    switch (gameStatus) {
        case GameStatus.Playing:
            return <span>🙂</span>;
        case GameStatus.Won:
            return <span>😎</span>;
        case GameStatus.Lost:
            return <span>😵</span>;
        case GameStatus.Ready:
             return <span>🙂</span>;
        default:
            return <span>🙂</span>;
    }
};

const GameControls: React.FC<GameControlsProps> = ({
  difficulty,
  onDifficultyChange,
  onNewGame,
  gameStatus,
  mineCount,
  flagsUsed,
  time,
  interactionMode,
  onInteractionModeChange,
}) => {
  
  const getNewGameButtonTitle = () => {
    if (gameStatus === GameStatus.Ready) return "Начать новую игру";
    if (gameStatus === GameStatus.Playing) return "Начать заново";
    return "Сыграть еще раз";
  }

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow-lg mb-4 flex flex-col sm:flex-row justify-between items-center w-full max-w-4xl space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
            className="bg-slate-600 text-white p-2 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            aria-label="Выбор сложности"
          >
            <option value={Difficulty.Easy}>Легко</option>
            <option value={Difficulty.Medium}>Средне</option>
            <option value={Difficulty.Hard}>Сложно</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-slate-600 rounded-md p-1">
          <button
            onClick={onInteractionModeChange}
            className={`w-12 h-10 text-2xl rounded-md transition-colors ${interactionMode === 'reveal' ? 'bg-blue-500' : 'bg-transparent hover:bg-slate-500'}`}
            title="Режим открытия ячеек"
            aria-label="Режим открытия ячеек"
          >
            ⛏️
          </button>
          <button
            onClick={onInteractionModeChange}
            className={`w-12 h-10 text-2xl rounded-md transition-colors ${interactionMode === 'flag' ? 'bg-blue-500' : 'bg-transparent hover:bg-slate-500'}`}
            title="Режим установки флагов"
            aria-label="Режим установки флагов"
          >
            🚩
          </button>
        </div>
        <button
          onClick={onNewGame}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-transform duration-150 active:scale-95 text-2xl"
          title={getNewGameButtonTitle()}
          aria-label={getNewGameButtonTitle()}
        >
          <Face gameStatus={gameStatus} />
        </button>
      </div>

      <div className="flex items-center space-x-6">
        <div className="bg-slate-900 px-4 py-2 rounded-md font-mono text-2xl text-red-500 w-24 text-center">
          <span>🚩 </span>
          {String(mineCount - flagsUsed).padStart(3, '0')}
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-md font-mono text-2xl text-yellow-400 w-24 text-center">
          <span>⏱️ </span>
          {String(time).padStart(3, '0')}
        </div>
      </div>
    </div>
  );
};

export default GameControls;