import { useEffect } from "react"
import { store } from "../pullstate"
import { FlipperState } from "../game-states"
import Card from "./Card"
import { nRows, nCols, dealAnimationDelay } from "../constants"

import styles from "./Grid.module.css"

const cardIndexes: number[] = []
for (let i = 0; i < nRows * nCols; ++i) {
  cardIndexes.push(i)
}

export default function Grid() {
  const dealingAnimationIndex = store.useState(s => s.dealingAnimationIndex)

  useEffect(() => {
    if (dealingAnimationIndex >= cardIndexes.length) {
      store.update(s => {
        s.gameState = FlipperState
      })
    } else if (dealingAnimationIndex >= 0) {
      setTimeout(() => {
        store.update(s => {
          s.dealingAnimationIndex += 1
        })
      }, dealAnimationDelay)
    } else {
      // do nothing
    }
  }, [dealingAnimationIndex])

  return (
    <div className={styles.grid}>
      {cardIndexes.map(index => {
        return (
          <Card
            key={index}
            cardId={index.toString()}
            row={
              dealingAnimationIndex > index ? Math.floor(index / nCols) + 1 : 0
            }
            col={dealingAnimationIndex > index ? Math.floor(index % nCols) : 0}
          />
        )
      })}
    </div>
  )
}
