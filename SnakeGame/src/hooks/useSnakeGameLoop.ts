import { useEffect, useRef } from 'react'

import { createGameLoop } from '../features/game'
import { fromGameState, toGameState } from '../store/game-state.adapters'
import { snakeGameStore } from '../store/game.store'

export function useSnakeGameLoop() {
  const loopRef = useRef<{
    controller: ReturnType<typeof createGameLoop> | null
    isApplyingControllerState: boolean
  }>({
    controller: null,
    isApplyingControllerState: false,
  })

  useEffect(() => {
    const loopState = loopRef.current
    const controller = createGameLoop({
      initialState: toGameState(snakeGameStore.getState()),
      onStateChange: (nextState) => {
        loopState.isApplyingControllerState = true
        snakeGameStore.setState(fromGameState(nextState))
      },
    })

    loopState.controller = controller

    const syncController = () => {
      if (loopState.isApplyingControllerState) {
        loopState.isApplyingControllerState = false
        return
      }

      const currentStoreState = snakeGameStore.getState()

      controller.setState(toGameState(currentStoreState))

      if (currentStoreState.status === 'playing') {
        controller.start()
        return
      }

      controller.stop()
    }

    syncController()

    const unsubscribe = snakeGameStore.subscribe(syncController)

    return () => {
      unsubscribe()
      controller.stop()

      if (loopState.controller === controller) {
        loopState.controller = null
      }
    }
  }, [])
}
