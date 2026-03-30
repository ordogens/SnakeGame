import type { BoardSize, Food, Position, Snake } from '../../types'

export function isSnakeOnPosition(snake: Snake, position: Position): boolean {
  return snake.segments.some(
    (segment) => segment.x === position.x && segment.y === position.y,
  )
}

export function getAvailableFoodPositions(
  board: BoardSize,
  snake: Snake,
): Position[] {
  const availablePositions: Position[] = []

  for (let y = 0; y < board.height; y += 1) {
    for (let x = 0; x < board.width; x += 1) {
      const position = { x, y }

      if (!isSnakeOnPosition(snake, position)) {
        availablePositions.push(position)
      }
    }
  }

  return availablePositions
}

export function createFood(
  board: BoardSize,
  snake: Snake,
  random: () => number = Math.random,
): Food | null {
  const availablePositions = getAvailableFoodPositions(board, snake)

  if (availablePositions.length === 0) {
    return null
  }

  const randomIndex = Math.floor(random() * availablePositions.length)

  return {
    position: availablePositions[randomIndex],
  }
}
