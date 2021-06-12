import { useEffect } from "react"
import _shuffle from "lodash/shuffle"
import { store } from "./pullstate"
import Header from "./components/Header"
import Grid from "./components/Grid"

import "./App.css"
import "normalize.css"
import "@fortawesome/fontawesome-pro/css/all.css"

function App() {
  const gameState = store.useState(s => s.gameState)

  // Really only want this to run this effect once when the page loads
  useEffect(() => {
    store.update(s => {
      s.cards = _shuffle(s.cards)
    })
    gameState.startGame()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header />
      <Grid />
    </>
  )
}

export default App
