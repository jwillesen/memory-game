import { store } from "./pullstate"
import { dealAnimationDelay, nCols } from "./constants"
import { getCardElements, getFaceupCards, moveCardFocus } from "./utils"

export interface GameState {
  enter: () => void
  exit: () => void
  transition: (newGameState: GameState) => void
  gameStateMessage: () => string
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
  gameStateMessage = () => "« Base Game State »"
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
    gameStateMessage = () => "Dealing Cards"

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
      this.transition(SelectFirstCard)
    }
  })()
)

export const SelectFirstCard = Object.freeze(
  new (class extends BaseGameState {
    gameStateMessage = () => "Select your first card"

    clickCard = (cardId: number) => {
      const card = store.getRawState().cards[cardId]
      if (!card || card.faceup || card.solved) return
      store.update(s => {
        s.cards[cardId].faceup = true
      })
      this.transition(SelectSecondCard)
    }
  })()
)

export const SelectSecondCard = Object.freeze(
  new (class extends BaseGameState {
    gameStateMessage = () => "Select your second card"

    clickCard = (cardId: number) => {
      const state = store.getRawState()
      const card = state.cards[cardId]
      if (!card || card.faceup || card.solved) return
      store.update(s => {
        s.cards[cardId].faceup = true
      })
      this.transition(MatchCheck)
    }
  })()
)

export const MatchCheck = Object.freeze(
  new (class extends BaseGameState {
    enter = () => {
      const [firstCard, secondCard] = getFaceupCards()
      if (firstCard.value === secondCard.value) {
        this.transition(CardsMatch)
      } else {
        this.transition(CardsDoNotMatch)
      }
    }
  })()
)

export const CardsMatch = Object.freeze(
  new (class extends BaseGameState {
    gameStateMessage = () => "You found a match!"
    enter = () => {
      setTimeout(() => {
        const [firstCard, secondCard] = getFaceupCards()
        store.update(s => {
          s.cards[firstCard.id].col = 0
          s.cards[firstCard.id].row = 0
          s.cards[firstCard.id].faceup = false
          s.cards[firstCard.id].solved = true
          s.cards[secondCard.id].col = 0
          s.cards[secondCard.id].row = 0
          s.cards[secondCard.id].faceup = false
          s.cards[secondCard.id].solved = true
        })

        const cardElts = getCardElements()
        const focusedIndex = cardElts.findIndex(
          elt => elt === document.activeElement
        )
        const focused = moveCardFocus(focusedIndex, -1)
        if (!focused) moveCardFocus(focusedIndex, 1)

        if (store.getRawState().cards.every(card => card.solved)) {
          this.transition(GameOver)
        } else {
          this.transition(SelectFirstCard)
        }
      }, 2000)
    }
  })()
)

export const CardsDoNotMatch = Object.freeze(
  new (class extends BaseGameState {
    gameStateMessage = () => "Sorry, those do not match"
    enter = () => {
      setTimeout(() => {
        const [firstCard, secondCard] = getFaceupCards()
        store.update(s => {
          s.cards[firstCard.id].faceup = false
          s.cards[secondCard.id].faceup = false
        })
        this.transition(SelectFirstCard)
      }, 2000)
    }
  })()
)

export const GameOver = Object.freeze(
  new (class extends BaseGameState {
    gameStateMessage = () => "Congratulations, you win!"
  })()
)

export const FlipperState = Object.freeze(
  new (class extends BaseGameState {
    gameStateMessage = () => "Freestyle"

    clickCard = (cardId: number) => {
      store.update(s => {
        s.cards[cardId].faceup = !s.cards[cardId].faceup
      })
    }
  })()
)
