import { useState, useEffect } from "react"
import Card from "./Card"
import { nRows, nCols, dealAnimationDelay } from "../constants"

import styles from "./Grid.module.css"

const cardIndexes: number[] = []
for (let i = 0; i < nRows * nCols; ++i) {
  cardIndexes.push(i)
}

const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]

export default function Grid() {
  const [animationIndex, setAnimationIndex] = useState(0)

  useEffect(() => {
    if (animationIndex >= cardIndexes.length) return
    setTimeout(() => setAnimationIndex(i => i + 1), dealAnimationDelay)
  }, [animationIndex])

  return (
    <div className={styles.grid}>
      {cardIndexes.map(index => {
        return (
          <Card
            key={index}
            value={cardValues[Math.floor(index / 2)]}
            row={animationIndex > index ? Math.floor(index / nCols) + 1 : 0}
            col={animationIndex > index ? Math.floor(index % nCols) : 0}
          />
        )
      })}
    </div>
  )
}
