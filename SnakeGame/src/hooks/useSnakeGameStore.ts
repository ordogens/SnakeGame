import { useStore } from 'zustand'

import { snakeGameStore } from '../store/game.store'
import type { SnakeGameStore } from '../store/game-store.types'

export function useSnakeGameStore<T>(
  selector: (state: SnakeGameStore) => T,
): T {
  return useStore(snakeGameStore, selector)
}
