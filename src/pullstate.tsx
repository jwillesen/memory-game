import { Store } from "pullstate"
import * as States from "./game-states"

export interface Card {
  value: string
  iconId: string
  faceup: boolean
  solved: boolean
  row: number
  col: number
}

export const initialCard = {
  faceup: false,
  solved: false,
  row: 0,
  col: 0,
}

export interface State {
  gameState: States.GameState
  dealingAnimationIndex: number
  cards: Card[]
}

export const initialState: State = {
  gameState: States.InitialGameState,
  dealingAnimationIndex: -1,
  cards: [
    { value: "apple", iconId: "apple-alt", ...initialCard },
    { value: "apple", iconId: "apple-alt", ...initialCard },
    { value: "bicycle", iconId: "bicycle", ...initialCard },
    { value: "bicycle", iconId: "bicycle", ...initialCard },
    { value: "cat", iconId: "cat", ...initialCard },
    { value: "cat", iconId: "cat", ...initialCard },
    { value: "dog", iconId: "dog", ...initialCard },
    { value: "dog", iconId: "dog", ...initialCard },
    {
      value: "elephant",
      iconId: "elephant",
      ...initialCard,
    },
    {
      value: "elephant",
      iconId: "elephant",
      ...initialCard,
    },
    { value: "fish", iconId: "fish", ...initialCard },
    { value: "fish", iconId: "fish", ...initialCard },
    { value: "glasses", iconId: "glasses", ...initialCard },
    { value: "glasses", iconId: "glasses", ...initialCard },
    { value: "hippo", iconId: "hippo", ...initialCard },
    { value: "hippo", iconId: "hippo", ...initialCard },
    {
      value: "ice cream",
      iconId: "ice-cream",
      ...initialCard,
    },
    {
      value: "ice cream",
      iconId: "ice-cream",
      ...initialCard,
    },
    {
      value: "jack-o-lantern",
      iconId: "jack-o-lantern",
      ...initialCard,
    },
    {
      value: "jack-o-lantern",
      iconId: "jack-o-lantern",
      ...initialCard,
    },
    { value: "kite", iconId: "kite", ...initialCard },
    { value: "kite", iconId: "kite", ...initialCard },
    {
      value: "lightbulb",
      iconId: "lightbulb-on",
      ...initialCard,
    },
    {
      value: "lightbulb",
      iconId: "lightbulb-on",
      ...initialCard,
    },
  ],
}

export const store = new Store(initialState)
