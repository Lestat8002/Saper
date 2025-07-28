
import React from 'react';
import { GameStatus } from '../types';

interface GameStatusModalProps {
  status: GameStatus;
  onNewGame: () => void;
}

const GameStatusModal: React.FC<GameStatusModalProps> = ({ status, onNewGame }) => {
  if (status === GameStatus.Playing || status === GameStatus.Ready) {
    return null;
  }

  const isWin = status === GameStatus.Won;
  const message = isWin ? 'Вы победили!' : 'Вы проиграли!';
  const emoji = isWin ? '🎉😎🎉' : '💥😵💥';
  const bgColor = isWin ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-slate-700 rounded-xl p-8 text-center shadow-2xl animate-fade-in-up">
        <h2 className="text-5xl font-bold mb-4">{message}</h2>
        <p className="text-7xl mb-6">{emoji}</p>
        <button
          onClick={onNewGame}
          className={`text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform duration-150 active:scale-95 ${bgColor} hover:opacity-90`}
        >
          Новая игра
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GameStatusModal;
