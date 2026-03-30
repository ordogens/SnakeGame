import { createFood } from '../food'
import { getNextHeadPosition } from '../snake'
import type { GameState, Position, Snake } from '../../types'
import { hasSelfCollision, hasWallCollision } from './collision.logic'

export interface GameLoopOptions {
  initialState: GameState
  onStateChange?: (state: GameState) => void
  random?: () => number
}

export interface GameLoopController {
  getState: () => GameState
  setState: (nextState: GameState) => void
  isRunning: () => boolean
  start: () => void
  stop: () => void
  tick: () => GameState
}

function isSamePosition(first: Position, second: Position): boolean {
  return first.x === second.x && first.y === second.y
}

function buildNextSnake(
  snake: Snake,
  nextHead: Position,
  shouldGrow: boolean,
): Snake {
  return {
    ...snake,
    direction: snake.nextDirection,
    nextDirection: snake.nextDirection,
    segments: shouldGrow
      ? [nextHead, ...snake.segments]
      : [nextHead, ...snake.segments.slice(0, -1)],
  }
}

export function advanceGameState(
  state: GameState,
  random: () => number = Math.random,
): GameState {
  if (state.status !== 'playing') {
    return state
  }

  const currentHead = state.snake.segments[0]
  const nextHead = getNextHeadPosition(currentHead, state.snake.nextDirection)

  if (hasWallCollision(nextHead, state.board)) {
    return {
      ...state,
      status: 'gameOver',
    }
  }

  const shouldGrow =
    state.food !== null && isSamePosition(nextHead, state.food.position)

  if (
    hasSelfCollision(state.snake, nextHead, {
      ignoreTail: !shouldGrow,
    })
  ) {
    return {
      ...state,
      status: 'gameOver',
    }
  }

  const nextSnake = buildNextSnake(state.snake, nextHead, shouldGrow)
  const nextScore = shouldGrow ? state.score + 1 : state.score
  const nextFood = shouldGrow ? createFood(state.board, nextSnake, random) : state.food

  return {
    ...state,
    snake: nextSnake,
    food: nextFood,
    score: nextScore,
  }
}

export function createGameLoop({
  initialState,
  onStateChange,
  random = Math.random,
}: GameLoopOptions): GameLoopController {
  let currentState = initialState
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const isRunning = (): boolean => timeoutId !== null

  const stop = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  const tick = (): GameState => {
    currentState = advanceGameState(currentState, random)
    onStateChange?.(currentState)

    if (currentState.status !== 'playing') {
      stop()
    }

    return currentState
  }

  const scheduleNextTick = (): void => {
    if (currentState.status !== 'playing') {
      stop()
      return
    }

    timeoutId = setTimeout(() => {
      timeoutId = null
      tick()

      if (currentState.status === 'playing') {
        scheduleNextTick()
      }
    }, currentState.tickRateMs)
  }

  const start = (): void => {
    if (isRunning() || currentState.status !== 'playing') {
      return
    }

    scheduleNextTick()
  }

  const setState = (nextState: GameState): void => {
    currentState = nextState

    if (currentState.status !== 'playing') {
      stop()
    }
  }

  const getState = (): GameState => currentState

  return {
    getState,
    setState,
    isRunning,
    start,
    stop,
    tick,
  }
}
