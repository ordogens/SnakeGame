import { createStore } from 'zustand/vanilla'

import { createFood } from '../features/food'
import { advanceGameState } from '../features/game'
import { changeSnakeDirection } from '../features/snake'
import type { GameState, Snake } from '../types'
import type {
  SnakeGameStore,
  SnakeGameStoreConfig,
  SnakeGameStoreState,
} from './game-store.types'

const DEFAULT_BOARD = {
  width: 20,
  height: 20,
} as const

const DEFAULT_TICK_RATE_MS = 150

function createInitialSnake(): Snake {
  return {
    direction: 'right',
    nextDirection: 'right',
    segments: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ],
  }
}

function createInitialState(
  config: SnakeGameStoreConfig = {},
): SnakeGameStoreState {
  const board = config.board ?? DEFAULT_BOARD
  const tickRateMs = config.tickRateMs ?? DEFAULT_TICK_RATE_MS
  const random = config.random ?? Math.random
  const snake = createInitialSnake()

  return {
    snake,
    food: createFood(board, snake, random),
    score: 0,
    status: 'paused',
    board,
    tickRateMs,
  }
}

function toGameState(state: SnakeGameStoreState): GameState {
  return {
    snake: state.snake,
    food: state.food,
    score: state.score,
    status: state.status,
    board: state.board,
    tickRateMs: state.tickRateMs,
  }
}

function fromGameState(state: GameState): SnakeGameStoreState {
  return {
    snake: state.snake,
    food: state.food,
    score: state.score,
    status: state.status,
    board: state.board,
    tickRateMs: state.tickRateMs,
  }
}

export function createSnakeGameStore(config: SnakeGameStoreConfig = {}) {
  const initialState = createInitialState(config)
  const defaultRandom = config.random ?? Math.random

  return createStore<SnakeGameStore>()((set, get) => ({
    ...initialState,

    setDirection: (direction) => {
      set((state) => ({
        snake: changeSnakeDirection(state.snake, direction),
      }))
    },

    tick: (random = defaultRandom) => {
      const nextState = fromGameState(advanceGameState(toGameState(get()), random))
      set(nextState)
      return nextState
    },

    startGame: () => {
      set((state) => ({
        status: state.status === 'gameOver' ? 'paused' : 'playing',
      }))
    },

    pauseGame: () => {
      set((state) => (state.status === 'playing' ? { status: 'paused' } : {}))
    },

    resumeGame: () => {
      set((state) => (state.status === 'paused' ? { status: 'playing' } : {}))
    },

    resetGame: () => {
      set(createInitialState(config))
    },
  }))
}

export const snakeGameStore = createSnakeGameStore()
