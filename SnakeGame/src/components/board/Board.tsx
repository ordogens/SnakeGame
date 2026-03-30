import type { CSSProperties } from 'react'
import type { BoardSize, Food as FoodType, GameStatus, Snake as SnakeType } from '../../types'
import { Food } from '../food/Food'
import { Snake } from '../snake/Snake'
import './Board.css'

interface BoardProps {
  board: BoardSize
  snake: SnakeType
  food: FoodType | null
  score?: number
  status?: GameStatus
}

export function Board({
  board,
  snake,
  food,
  score,
  status,
}: BoardProps) {
  const boardStyle = {
    '--board-columns': board.width,
    '--board-rows': board.height,
  } as CSSProperties

  return (
    <section className="snake-board-shell">
      <header className="snake-board-header">
        <div>
          <p className="snake-board-eyebrow">Snake Orchard</p>
          <h1 className="snake-board-title">Manzanas, ritmo y control</h1>
        </div>

        <div className="snake-board-stats" aria-label="Estado del juego">
          <div className="snake-board-pill">
            <span className="snake-board-pill-label">Score</span>
            <strong>{score ?? 0}</strong>
          </div>
          <div className="snake-board-pill">
            <span className="snake-board-pill-label">Estado</span>
            <strong>{status ?? 'paused'}</strong>
          </div>
        </div>
      </header>

      <div className="snake-board-frame">
        <div className="snake-board-grid" style={boardStyle}>
          <div className="snake-board-grid-lines" aria-hidden="true" />
          <Food food={food} />
          <Snake snake={snake} />
        </div>
      </div>
    </section>
  )
}
