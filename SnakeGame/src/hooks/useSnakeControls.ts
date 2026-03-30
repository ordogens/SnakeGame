import { useEffect, useEffectEvent } from 'react'

import { snakeGameStore } from '../store'
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
    const direction = KEY_TO_DIRECTION[event.key]

    if (direction === undefined) {
      return
    }

    event.preventDefault()

    const { setDirection, status } = snakeGameStore.getState()

    if (status === 'gameOver') {
      return
    }

    setDirection(direction)
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}
