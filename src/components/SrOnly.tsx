import { ReactNode } from "react"

import styles from "./SrOnly.module.css"

interface Props {
  children: ReactNode
}

export default function SrOnly({ children }: Props) {
  return <div className={styles.srOnly}>{children}</div>
}
