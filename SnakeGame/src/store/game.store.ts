import { createStore } from 'zustand/vanilla'

import { advanceGameState } from '../features/game'
import { changeSnakeDirection } from '../features/snake'
import type {
  SnakeGameStore,
  SnakeGameStoreConfig,
} from './game-store.types'
import {
  createInitialState,
  fromGameState,
  toGameState,
} from './game-state.adapters'

export function createSnakeGameStore(config: SnakeGameStoreConfig = {}) {
  const initialState = createInitialState(config)
  const defaultRandom = config.random ?? Math.random

  return createStore<SnakeGameStore>()((set, get) => ({
    ...initialState,

    setDirection: (direction) => {
      set((state) => {
        if (state.status === 'gameOver') {
          return {}
        }

        return {
          snake: changeSnakeDirection(state.snake, direction),
        }
      })
    },

    tick: (random = defaultRandom) => {
      const nextState = fromGameState(advanceGameState(toGameState(get()), random))
      set(nextState)
      return nextState
    },

    startGame: () => {
      set((state) => {
        if (state.status === 'playing') {
          return {}
        }

        if (state.status === 'gameOver') {
          return createInitialState(config, 'playing')
        }

        return { status: 'playing' }
      })
    },

    pauseGame: () => {
      set((state) => (state.status === 'playing' ? { status: 'paused' } : {}))
    },

    resumeGame: () => {
      set((state) => (state.status === 'paused' ? { status: 'playing' } : {}))
    },

    togglePause: () => {
      set((state) => {
        if (state.status === 'playing') {
          return { status: 'paused' }
        }

        if (state.status === 'paused') {
          return { status: 'playing' }
        }

        return {}
      })
    },

    resetGame: () => {
      set(createInitialState(config, 'playing'))
    },
  }))
}

export const snakeGameStore = createSnakeGameStore()
