import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders learn react link", () => {
  render(<App />)
  const front = screen.getByText(/Front/i)
  const back = screen.getByText(/Back/i)
  expect(front).toBeInTheDocument()
  expect(back).toBeInTheDocument()
})
