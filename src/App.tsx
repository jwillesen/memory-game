import { store } from "./pullstate"
import Grid from "./components/Grid"

import "./App.css"
import "normalize.css"
import "@fortawesome/fontawesome-pro/css/all.css"
import { InitialGameState } from "./game-states"

function App() {
  const gameState = store.useState(s => s.gameState)

  return (
    <>
      {gameState === InitialGameState && (
        <button onClick={gameState.startGame}>Start Game</button>
      )}
      <Grid />
    </>
  )
}

export default App
