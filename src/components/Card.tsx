import React, { useEffect, useRef } from "react"
import classnames from "classnames"
import { store } from "../pullstate"
import { nCols } from "../constants"
import { moveCardFocus } from "../utils"
import SrOnly from "./SrOnly"

import styles from "./Card.module.css"

export interface Props {
  cardId: number
}

export default function Card({ cardId }: Props) {
  const { faceup, solved, iconId, value, row, col } = store.useState(
    s => s.cards[cardId]
  )
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty("--row", row.toString())
    cardRef.current.style.setProperty("--col", col.toString())
  }, [col, row])

  function handleClick() {
    store.getRawState().gameState.clickCard(cardId)
  }

  const handleKeyDown: React.KeyboardEventHandler = e => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick()
    } else if (e.key === "ArrowDown") {
      moveCardFocus(cardId, nCols)
    } else if (e.key === "ArrowUp") {
      moveCardFocus(cardId, -nCols)
    } else if (e.key === "ArrowRight") {
      moveCardFocus(cardId, 1)
    } else if (e.key === "ArrowLeft") {
      moveCardFocus(cardId, -1)
    }
  }

  const frontStyles = classnames({
    [styles.face]: true,
    [styles.front]: true,
    [styles.faceup]: faceup,
  })

  const backStyles = classnames({
    [styles.face]: true,
    [styles.back]: true,
    [styles.faceup]: faceup,
  })

  return (
    <div
      ref={cardRef}
      className={styles.card}
      role={solved ? "" : "button"}
      tabIndex={solved ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-live="polite"
      aria-atomic
    >
      <div className={backStyles}>
        {!faceup && (
          <SrOnly>
            Face down card, row {row}, column {col}
          </SrOnly>
        )}
      </div>
      <div className={frontStyles}>
        <i className={`far fa-${iconId}`} aria-hidden />
        {faceup && (
          <SrOnly>
            Face up card, row {row}, column {col}: {value}
          </SrOnly>
        )}
      </div>
    </div>
  )
}
