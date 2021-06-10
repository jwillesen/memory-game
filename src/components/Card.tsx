import { useState } from "react"
import classnames from "classnames"

import styles from "./Card.module.css"

export interface Props {
  value: string
}

export default function Card({ value }: Props) {
  const [faceup, setFaceup] = useState(false)

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
    <div onClick={() => setFaceup(fu => !fu)}>
      <div className={backStyles}>Back</div>
      <div className={frontStyles}>{value}</div>
    </div>
  )
}
