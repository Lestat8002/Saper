
export interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  isQuestioned: boolean;
  adjacentMines: number;
}

export enum GameStatus {
  Ready = 'ready',
  Playing = 'playing',
  Won = 'won',
  Lost = 'lost',
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export interface DifficultySetting {
  rows: number;
  cols: number;
  mines: number;
}