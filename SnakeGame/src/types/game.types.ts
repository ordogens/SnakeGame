export type Direction = 'up' | 'down' | 'left' | 'right'

export type GameStatus = 'playing' | 'paused' | 'gameOver'

export interface Position {
  x: number
  y: number
}

export interface Food {
  position: Position
}

export interface Snake {
  segments: Position[]
  direction: Direction
  nextDirection: Direction
}

export interface BoardSize {
  width: number
  height: number
}

export interface GameState {
  snake: Snake
  food: Food | null
  score: number
  status: GameStatus
  board: BoardSize
  tickRateMs: number
}
