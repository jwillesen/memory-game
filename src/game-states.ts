import { store } from "./pullstate"

export interface GameState {
  enter: () => void
  exit: () => void
  transition: (newGameState: GameState) => void
  startGame: () => void
  finishDealing: () => void
  clickCard: (cardId: string) => void
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
  finishDealing = () => {}
  clickCard = (cardId: string) => {}
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
    }

    finishDealing = () => {
      this.transition(FlipperState)
    }
  })()
)

export const FlipperState = Object.freeze(
  new (class extends BaseGameState {
    clickCard = (cardId: string) => {
      store.update(s => {
        s.cards[cardId].faceup = !s.cards[cardId].faceup
      })
    }
  })()
)
