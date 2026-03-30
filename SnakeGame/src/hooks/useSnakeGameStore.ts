import { useStore } from 'zustand'

import { snakeGameStore } from '../store'
import type { SnakeGameStore } from '../store'

export function useSnakeGameStore<T>(
  selector: (state: SnakeGameStore) => T,
): T {
  return useStore(snakeGameStore, selector)
}
