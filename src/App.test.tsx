import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders initial dealing state", () => {
  render(<App />)
  const dealing = screen.getByText(/Dealing/i)
  expect(dealing).toBeInTheDocument()
})

it.todo("deals out cards")
it.todo("all cards start out face down")
it.todo("shuffles the order of the cards")
it.todo("navigates card focus with tab and arrow keys")
it.todo("does not reveal the front of the cards to screen readers")
it.todo("flips and reveals a card on click")
it.todo("flips a card on space")
it.todo("flips a card on enter")
it.todo("reveals the flipped card's identity to screen readers")
it.todo("does not reflip a faceup card")
it.todo("does not flip a solved card")
it.todo("flips a second card")
it.todo("flips cards back over and does not solve if they do not match")
it.todo("flips the cards over and sets them to solved if they do match")
it.todo("sets focus to prior card after a match")
it.todo("sets focus to next card after a match if there is no prior card")
it.todo("sets focus to play again button after winning")
it.todo("displays congratulations when all cards are solved")
it.todo("allows you to play again after winning")
