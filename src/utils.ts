import { store } from "./pullstate"
import { nCards } from "./constants"
import { Card } from "./pullstate"
import cardStyles from "./components/Card.module.css"

export type CardWithIndex = Card & { id: number }

export function getFaceupCards(): CardWithIndex[] {
  return store.getRawState().cards.reduce((memo, card, index) => {
    if (card.faceup) memo.push({ id: index, ...card })
    return memo
  }, [] as CardWithIndex[])
}

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
