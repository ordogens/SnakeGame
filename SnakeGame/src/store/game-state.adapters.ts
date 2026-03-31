import { createFood } from '../features/food'
import type { GameState, Snake } from '../types'
import type { SnakeGameStoreConfig, SnakeGameStoreState } from './game-store.types'

const DEFAULT_BOARD = {
  width: 28,
  height: 16,
} as const

const DEFAULT_TICK_RATE_MS = 150

function createInitialSnake(board: { width: number; height: number }): Snake {
  const headX = Math.max(2, Math.floor(board.width / 2))
  const headY = Math.floor(board.height / 2)

  return {
    direction: 'right',
    nextDirection: 'right',
    queuedDirection: null,
    segments: [
      { x: headX, y: headY },
      { x: headX - 1, y: headY },
      { x: headX - 2, y: headY },
    ],
  }
}

export function createInitialState(
  config: SnakeGameStoreConfig = {},
  status: SnakeGameStoreState['status'] = 'paused',
): SnakeGameStoreState {
  const board = config.board ?? DEFAULT_BOARD
  const tickRateMs = config.tickRateMs ?? DEFAULT_TICK_RATE_MS
  const random = config.random ?? Math.random
  const snake = createInitialSnake(board)

  return {
    snake,
    food: createFood(board, snake, random),
    lastScoreGain: null,
    score: 0,
    status,
    board,
    tickRateMs,
  }
}

export function toGameState(state: SnakeGameStoreState): GameState {
  return {
    snake: state.snake,
    food: state.food,
    lastScoreGain: state.lastScoreGain,
    score: state.score,
    status: state.status,
    board: state.board,
    tickRateMs: state.tickRateMs,
  }
}

export function fromGameState(state: GameState): SnakeGameStoreState {
  return {
    snake: state.snake,
    food: state.food,
    lastScoreGain: state.lastScoreGain,
    score: state.score,
    status: state.status,
    board: state.board,
    tickRateMs: state.tickRateMs,
  }
}
