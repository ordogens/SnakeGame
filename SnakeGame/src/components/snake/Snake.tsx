import type { CSSProperties } from 'react'
import type { Snake as SnakeType } from '../../types'
import './Snake.css'

interface SnakeProps {
  snake: SnakeType
}

export function Snake({ snake }: SnakeProps) {
  return (
    <>
      {snake.segments.map((segment, index) => {
        const isHead = index === 0

        return (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className={isHead ? 'snake-segment snake-segment-head' : 'snake-segment'}
            style={
              {
                '--segment-x': segment.x,
                '--segment-y': segment.y,
              } as CSSProperties
            }
          >
            {isHead ? (
              <>
                <span className="snake-eye snake-eye-left" />
                <span className="snake-eye snake-eye-right" />
              </>
            ) : null}
          </div>
        )
      })}
    </>
  )
}
