import { Store } from "pullstate"
import * as States from "./game-states"

export interface Card {
  value: string
  iconId: string
  faceup: boolean
  solved: boolean
}

export const initialCard = {
  faceup: false,
  solved: false,
}

export interface State {
  gameState: States.GameState
  dealingAnimationIndex: number
  cards: {
    [id: string]: Card
  }
}

export const initialState: State = {
  gameState: States.InitialGameState,
  dealingAnimationIndex: -1,
  cards: {
    "0": { value: "apple", iconId: "apple-alt", ...initialCard },
    "1": { value: "apple", iconId: "apple-alt", ...initialCard },
    "2": { value: "bicycle", iconId: "bicycle", ...initialCard },
    "3": { value: "bicycle", iconId: "bicycle", ...initialCard },
    "4": { value: "cat", iconId: "cat", ...initialCard },
    "5": { value: "cat", iconId: "cat", ...initialCard },
    "6": { value: "dog", iconId: "dog", ...initialCard },
    "7": { value: "dog", iconId: "dog", ...initialCard },
    "8": {
      value: "elephant",
      iconId: "elephant",
      ...initialCard,
    },
    "9": {
      value: "elephant",
      iconId: "elephant",
      ...initialCard,
    },
    "10": { value: "fish", iconId: "fish", ...initialCard },
    "11": { value: "fish", iconId: "fish", ...initialCard },
    "12": { value: "glasses", iconId: "glasses", ...initialCard },
    "13": { value: "glasses", iconId: "glasses", ...initialCard },
    "14": { value: "hippo", iconId: "hippo", ...initialCard },
    "15": { value: "hippo", iconId: "hippo", ...initialCard },
    "16": {
      value: "ice cream",
      iconId: "ice-cream",
      ...initialCard,
    },
    "17": {
      value: "ice cream",
      iconId: "ice-cream",
      ...initialCard,
    },
    "18": {
      value: "jack-o-lantern",
      iconId: "jack-o-lantern",
      ...initialCard,
    },
    "19": {
      value: "jack-o-lantern",
      iconId: "jack-o-lantern",
      ...initialCard,
    },
    "20": { value: "kite", iconId: "kite", ...initialCard },
    "21": { value: "kite", iconId: "kite", ...initialCard },
    "22": {
      value: "lightbulb",
      iconId: "lightbulb-on",
      ...initialCard,
    },
    "23": {
      value: "lightbulb",
      iconId: "lightbulb-on",
      ...initialCard,
    },
  },
}

export const store = new Store(initialState)
