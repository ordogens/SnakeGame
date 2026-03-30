import type { BoardSize, Position, Snake } from '../../types'

export function hasWallCollision(
  position: Position,
  board: BoardSize,
): boolean {
  return (
    position.x < 0 ||
    position.x >= board.width ||
    position.y < 0 ||
    position.y >= board.height
  )
}

export function hasSelfCollision(
  snake: Snake,
  headPosition: Position = snake.segments[0],
  options: { ignoreTail?: boolean } = {},
): boolean {
  const bodySegments = options.ignoreTail
    ? snake.segments.slice(1, -1)
    : snake.segments.slice(1)

  return bodySegments.some(
    (segment) =>
      segment.x === headPosition.x && segment.y === headPosition.y,
  )
}

export function detectCollision(
  snake: Snake,
  board: BoardSize,
  headPosition: Position = snake.segments[0],
  options: { ignoreTail?: boolean } = {},
): boolean {
  return (
    hasWallCollision(headPosition, board) ||
    hasSelfCollision(snake, headPosition, options)
  )
}
