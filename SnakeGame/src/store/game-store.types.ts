import type { BoardSize, Direction, Food, GameStatus, Snake } from '../types'

export interface SnakeGameStoreState {
  snake: Snake
  food: Food | null
  score: number
  status: GameStatus
  board: BoardSize
  tickRateMs: number
}

export interface SnakeGameStoreActions {
  setDirection: (direction: Direction) => void
  tick: (random?: () => number) => SnakeGameStoreState
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  resetGame: () => void
}

export type SnakeGameStore = SnakeGameStoreState & SnakeGameStoreActions

export interface SnakeGameStoreConfig {
  board?: BoardSize
  tickRateMs?: number
  random?: () => number
}
