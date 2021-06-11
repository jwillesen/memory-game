import { useEffect, useRef } from "react"
import classnames from "classnames"
import { store } from "../pullstate"

import styles from "./Card.module.css"

export interface Props {
  cardId: string
  row: number
  col: number
}

export default function Card({ cardId, row, col }: Props) {
  const { faceup, iconId } = store.useState(s => s.cards[cardId])
  const cardRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty("--row", row.toString())
    cardRef.current.style.setProperty("--col", col.toString())
  }, [col, row])

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onClick={() => store.getRawState().gameState.clickCard(cardId)}
    >
      <div className={backStyles} />
      <div className={frontStyles}>
        <i className={`far fa-${iconId}`} />
      </div>
    </div>
  )
}
