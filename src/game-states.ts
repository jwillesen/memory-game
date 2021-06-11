import { store, Card } from "./pullstate"
import { dealAnimationDelay, nCols } from "./constants"
import { getCardElements, moveCardFocus } from "./utils"

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
      this.transition(SelectFirstCard)
    }
  })()
)

type CardWithIndex = Card & { id: number }

export const SelectFirstCard = Object.freeze(
  new (class extends BaseGameState {
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
      setTimeout(() => {
        const [firstCard, secondCard] = store
          .getRawState()
          .cards.reduce((memo, card, index) => {
            if (card.faceup) memo.push({ id: index, ...card })
            return memo
          }, [] as CardWithIndex[])

        if (firstCard.value === secondCard.value) {
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
        } else {
          store.update(s => {
            s.cards[firstCard.id].faceup = false
            s.cards[secondCard.id].faceup = false
          })
        }
        this.transition(SelectFirstCard)
      }, 1000)
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
