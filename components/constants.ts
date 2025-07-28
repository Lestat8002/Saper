
import type { DifficultySetting } from '../utils/types';
import { Difficulty } from '../utils/types';

export const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySetting> = {
  [Difficulty.Easy]: { rows: 9, cols: 9, mines: 10 },
  [Difficulty.Medium]: { rows: 16, cols: 16, mines: 40 },
  [Difficulty.Hard]: { rows: 16, cols: 30, mines: 99 },
};

export const CELL_NUMBER_COLORS: { [key: number]: string } = {
  1: 'text-blue-500',
  2: 'text-green-600',
  3: 'text-red-500',
  4: 'text-blue-800',
  5: 'text-red-800',
  6: 'text-teal-500',
  7: 'text-black',
  8: 'text-gray-500',
};