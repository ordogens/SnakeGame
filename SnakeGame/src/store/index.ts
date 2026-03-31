export {
  createSnakeGameStore,
  snakeGameStore,
} from './game.store'
export {
  createInitialState,
  fromGameState,
  toGameState,
} from './game-state.adapters'
export type {
  SnakeGameStore,
  SnakeGameStoreActions,
  SnakeGameStoreConfig,
  SnakeGameStoreState,
} from './game-store.types'
