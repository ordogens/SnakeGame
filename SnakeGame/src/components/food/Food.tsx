import type { CSSProperties } from 'react'
import type { Food as FoodType } from '../../types'
import './Food.css'

interface FoodProps {
  food: FoodType | null
}

export function Food({ food }: FoodProps) {
  if (food === null) {
    return null
  }

  return (
    <div
      className="snake-food"
      style={
        {
          '--food-x': food.position.x,
          '--food-y': food.position.y,
        } as CSSProperties
      }
      aria-label="Manzana"
      role="img"
    >
      <span className="snake-food-leaf" />
      <span className="snake-food-stem" />
      <span className="snake-food-body" />
      <span className="snake-food-shine" />
    </div>
  )
}
