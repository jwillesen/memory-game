import { store } from "../pullstate"
import Card from "./Card"
import { DealingState } from "../game-states"
import styles from "./Grid.module.css"

export default function Grid() {
  const cards = store.useState(s => s.cards)
  const gameState = store.useState(s => s.gameState)

  function handlePlayAgain() {
    gameState.transition(DealingState)
  }

  return (
    <div className={styles.grid}>
      <div className={styles.helpTextAlign} aria-live="polite" aria-atomic>
        <div>{gameState.gameStateMessage()}</div>
        {gameState.gameOver() && (
          <div>
            <button
              className={styles.playAgainButton}
              onClick={handlePlayAgain}
            >
              Play again?
            </button>
          </div>
        )}
      </div>
      {cards.map((card, index) => {
        return <Card key={index} cardId={index} />
      })}
    </div>
  )
}
