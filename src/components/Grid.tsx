import { store } from "../pullstate"
import Card from "./Card"
import { nRows, nCols } from "../constants"

import styles from "./Grid.module.css"

const cardIndexes: number[] = []
for (let i = 0; i < nRows * nCols; ++i) {
  cardIndexes.push(i)
}

export default function Grid() {
  const cards = store.useState(s => s.cards)

  return (
    <div className={styles.grid}>
      {cards.map((card, index) => {
        return <Card key={index} cardId={index} />
      })}
    </div>
  )
}
