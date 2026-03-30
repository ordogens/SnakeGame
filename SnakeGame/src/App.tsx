import './App.css'
import { Board } from './components'
import { useSnakeControls, useSnakeGameStore } from './hooks'

function App() {
  useSnakeControls()

  const board = useSnakeGameStore((state) => state.board)
  const food = useSnakeGameStore((state) => state.food)
  const score = useSnakeGameStore((state) => state.score)
  const snake = useSnakeGameStore((state) => state.snake)
  const status = useSnakeGameStore((state) => state.status)

  return (
    <main className="app-shell">
      <Board
        board={board}
        snake={snake}
        food={food}
        score={score}
        status={status}
      />
    </main>
  )
}

export default App
