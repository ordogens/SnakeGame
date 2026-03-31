import { useEffect, useEffectEvent } from 'react'

import { snakeGameStore } from '../store/game.store'
import type { Direction } from '../types'

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
}

export function useSnakeControls() {
  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const {
      resetGame,
      startGame,
      resumeGame,
      setDirection,
      status,
      togglePause,
    } = snakeGameStore.getState()

    if (event.code === 'Space' || event.key === 'p' || event.key === 'P') {
      event.preventDefault()

      if (status === 'gameOver') {
        if (event.repeat) {
          return
        }

        startGame()
        return
      }

      togglePause()
      return
    }

    if (event.key === 'r' || event.key === 'R') {
      event.preventDefault()
      resetGame()
      return
    }

    const direction = KEY_TO_DIRECTION[event.key]

    if (direction === undefined) {
      return
    }

    event.preventDefault()

    if (status === 'gameOver') {
      if (event.repeat) {
        return
      }

      startGame()
      setDirection(direction)
      return
    }

    if (status === 'paused') {
      resumeGame()
    }

    setDirection(direction)
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}
