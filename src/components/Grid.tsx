import { store } from "../pullstate"
import Card from "./Card"

import styles from "./Grid.module.css"

export default function Grid() {
  const cards = store.useState(s => s.cards)
  const gameState = store.useState(s => s.gameState)

  return (
    <div className={styles.grid}>
      <div className={styles.helpText} aria-live="polite" aria-atomic>
        {gameState.gameStateMessage()}
      </div>
      {cards.map((card, index) => {
        return <Card key={index} cardId={index} />
      })}
    </div>
  )
}
