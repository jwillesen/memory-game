import { useEffect } from "react"
import { store } from "./pullstate"
import Header from "./components/Header"
import Grid from "./components/Grid"

import "./App.css"
import "normalize.css"
import "@fortawesome/fontawesome-pro/css/all.css"

function App() {
  // Really only want this to run this effect once when the page loads
  useEffect(() => {
    store.getRawState().gameState.startGame()
  }, [])

  return (
    <>
      <Header />
      <Grid />
    </>
  )
}

export default App
