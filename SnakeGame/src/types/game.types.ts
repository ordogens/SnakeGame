export type Direction = 'up' | 'down' | 'left' | 'right'

export type GameStatus = 'playing' | 'paused' | 'gameOver'

export interface Position {
  x: number
  y: number
}

export type FoodKind = 'red' | 'gold'

export interface Food {
  position: Position
  kind: FoodKind
}

export interface ScoreGainEvent {
  id: number
  amount: number
  position: Position
  kind: FoodKind
}

export interface Snake {
  segments: Position[]
  direction: Direction
  nextDirection: Direction
  queuedDirection: Direction | null
}

export interface BoardSize {
  width: number
  height: number
}

export interface GameState {
  snake: Snake
  food: Food | null
  lastScoreGain: ScoreGainEvent | null
  score: number
  status: GameStatus
  board: BoardSize
  tickRateMs: number
}
