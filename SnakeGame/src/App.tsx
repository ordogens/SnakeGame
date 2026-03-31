import './App.css'
import { Board } from './components'
import { useSnakeControls, useSnakeGameLoop, useSnakeGameStore } from './hooks'
import { snakeGameStore } from './store'

function App() {
  useSnakeControls()
  useSnakeGameLoop()

  const board = useSnakeGameStore((state) => state.board)
  const food = useSnakeGameStore((state) => state.food)
  const lastScoreGain = useSnakeGameStore((state) => state.lastScoreGain)
  const score = useSnakeGameStore((state) => state.score)
  const snake = useSnakeGameStore((state) => state.snake)
  const status = useSnakeGameStore((state) => state.status)

  const handlePauseToggle = () => {
    const { pauseGame, startGame, togglePause } = snakeGameStore.getState()

    if (status === 'gameOver') {
      startGame()
      return
    }

    if (status === 'playing') {
      pauseGame()
      return
    }

    togglePause()
  }

  return (
    <main className="app-shell">
      <Board
        board={board}
        snake={snake}
        food={food}
        lastScoreGain={lastScoreGain}
        score={score}
        status={status}
        onPauseToggle={handlePauseToggle}
        onRestart={() => snakeGameStore.getState().resetGame()}
      />
    </main>
  )
}

export default App
