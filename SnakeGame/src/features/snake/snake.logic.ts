import type { Direction, Position, Snake } from '../../types'

const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

export function getNextHeadPosition(
  currentHead: Position,
  direction: Direction,
): Position {
  switch (direction) {
    case 'up':
      return { x: currentHead.x, y: currentHead.y - 1 }
    case 'down':
      return { x: currentHead.x, y: currentHead.y + 1 }
    case 'left':
      return { x: currentHead.x - 1, y: currentHead.y }
    case 'right':
      return { x: currentHead.x + 1, y: currentHead.y }
  }
}

export function moveSnake(snake: Snake): Snake {
  const head = snake.segments[0]
  const nextHead = getNextHeadPosition(head, snake.nextDirection)

  return {
    ...snake,
    direction: snake.nextDirection,
    nextDirection: snake.nextDirection,
    segments: [nextHead, ...snake.segments.slice(0, -1)],
  }
}

export function growSnake(snake: Snake): Snake {
  const tail = snake.segments[snake.segments.length - 1]

  return {
    ...snake,
    segments: [...snake.segments, { ...tail }],
  }
}

export function changeSnakeDirection(
  snake: Snake,
  nextDirection: Direction,
): Snake {
  if (OPPOSITE_DIRECTIONS[snake.direction] === nextDirection) {
    return snake
  }

  return {
    ...snake,
    nextDirection,
  }
}
