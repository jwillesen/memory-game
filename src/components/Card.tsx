import { useState, useEffect, useRef } from "react"
import classnames from "classnames"

import styles from "./Card.module.css"

export interface Props {
  value: string
  row: number
  col: number
}

export default function Card({ value, row, col }: Props) {
  const [faceup, setFaceup] = useState(false)
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
      onClick={() => setFaceup(fu => !fu)}
    >
      <div className={backStyles} />
      <div className={frontStyles}>{value}</div>
    </div>
  )
}
