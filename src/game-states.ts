import { store } from "./pullstate"
import { dealAnimationDelay, nCols } from "./constants"

export interface GameState {
  enter: () => void
  exit: () => void
  transition: (newGameState: GameState) => void
  startGame: () => void
  clickCard: (cardId: number) => void
}

export class BaseGameState implements GameState {
  enter = () => {}
  exit = () => {}
  transition = (newGameState: GameState) => {
    store.getRawState().gameState.exit()
    store.update(s => {
      s.gameState = newGameState
    })
    newGameState.enter()
  }
  startGame = () => {}
  clickCard = (cardId: number) => {}
}

export const InitialGameState = Object.freeze(
  new (class extends BaseGameState {
    startGame = () => {
      this.transition(DealingState)
    }
  })()
)

export const DealingState = Object.freeze(
  new (class extends BaseGameState {
    enter = () => {
      store.update(s => {
        s.dealingAnimationIndex = 0
      })
      this.dealCard()
    }

    dealCard = () => {
      const state = store.getRawState()
      const index = state.dealingAnimationIndex
      if (index >= state.cards.length) this.finishDealing()
      else {
        store.update(s => {
          s.cards[s.dealingAnimationIndex].row =
            Math.floor(s.dealingAnimationIndex / nCols) + 1
          s.cards[s.dealingAnimationIndex].col = Math.floor(
            s.dealingAnimationIndex % nCols
          )
          s.dealingAnimationIndex += 1
        })
        setTimeout(this.dealCard, dealAnimationDelay)
      }
    }

    finishDealing = () => {
      this.transition(FlipperState)
    }
  })()
)

export const FlipperState = Object.freeze(
  new (class extends BaseGameState {
    clickCard = (cardId: number) => {
      store.update(s => {
        s.cards[cardId].faceup = !s.cards[cardId].faceup
      })
    }
  })()
)
