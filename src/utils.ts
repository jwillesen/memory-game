import { store } from "./pullstate"
import { nCards } from "./constants"
import cardStyles from "./components/Card.module.css"

export const getCardElements = (): HTMLElement[] => {
  const elts: NodeListOf<HTMLElement> = document.querySelectorAll(
    `.${cardStyles.card}`
  )
  return Array.from(elts)
}

export const moveCardFocus = (cardId: number, step: number) => {
  const cards = store.getRawState().cards
  const elts = getCardElements()
  let targetId = cardId + step
  let done = false
  while (!done && targetId >= 0 && targetId < nCards) {
    const card = cards[targetId]
    if (card.solved) targetId += step
    else {
      elts[targetId].focus()
      done = true
    }
  }
  return done
}
