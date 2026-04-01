import type { CSSProperties } from 'react'
import type {
  BoardSize,
  Food as FoodType,
  GameStatus,
  ScoreGainEvent,
  Snake as SnakeType,
} from '../../types'
import { Food } from '../food/Food'
import { Snake } from '../snake/Snake'
import './Board.css'

interface BoardProps {
  board: BoardSize
  snake: SnakeType
  food: FoodType | null
  lastScoreGain?: ScoreGainEvent | null
  score?: number
  status?: GameStatus
  onPauseToggle?: () => void
  onRestart?: () => void
}

export function Board({
  board,
  snake,
  food,
  lastScoreGain,
  score,
  status,
  onPauseToggle,
  onRestart,
}: BoardProps) {
  const boardStyle = {
    '--board-columns': String(board.width),
    '--board-rows': String(board.height),
    '--board-width': `calc(${board.width} * var(--cell-size))`,
    '--board-height': `calc(${board.height} * var(--cell-size))`,
  } as CSSProperties

  const boardOverlay =
    status === 'gameOver'
      ? {
          badge: 'Run terminated',
          title: 'GAME OVER',
          caption: 'Presiona reiniciar y vuelve por otro high score.',
          modifierClassName: 'snake-board-overlay-game-over',
        }
      : status === 'paused'
        ? {
            badge: 'Game halted',
            title: 'PAUSA',
            caption: 'Retoma cuando quieras. Tu partida sigue intacta.',
            modifierClassName: 'snake-board-overlay-paused',
          }
        : null

  return (
    <section className="snake-board-shell">
      <div className="snake-board-layout">
        <aside className="snake-board-sidebar">
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

          <div className="snake-board-actions">
            <button
              className="snake-board-action snake-board-action-primary"
              onClick={onPauseToggle}
              type="button"
            >
              {status === 'playing' ? 'Pausar' : 'Jugar'}
            </button>
            <button
              className="snake-board-action"
              onClick={onRestart}
              type="button"
            >
              Reiniciar
            </button>
          </div>

          <footer className="snake-board-footer">
            <span>Flechas o WASD para moverte</span>
            <span>Espacio o P para pausar</span>
            <span>R para reiniciar</span>
          </footer>
        </aside>

        <div className="snake-board-stage">
          <div className="snake-board-frame">
            <div className="snake-board-grid" style={boardStyle}>
              <div className="snake-board-grid-lines" aria-hidden="true" />
              {lastScoreGain !== null && lastScoreGain !== undefined ? (
                <div
                  key={lastScoreGain.id}
                  className={`snake-score-gain snake-score-gain-${lastScoreGain.kind}`}
                  style={
                    {
                      '--gain-x': lastScoreGain.position.x,
                      '--gain-y': lastScoreGain.position.y,
                    } as CSSProperties
                  }
                >
                  +{lastScoreGain.amount}xp
                </div>
              ) : null}
              <Food food={food} />
              <Snake snake={snake} />
              {boardOverlay !== null ? (
                <div
                  className={`snake-board-overlay ${boardOverlay.modifierClassName}`}
                  role="status"
                  aria-live="polite"
                >
                  <span className="snake-board-overlay-badge">{boardOverlay.badge}</span>
                  <strong className="snake-board-overlay-title">{boardOverlay.title}</strong>
                  <p className="snake-board-overlay-caption">{boardOverlay.caption}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
