import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders card values", () => {
  render(<App />)
  const A = screen.getByText(/A/i)
  expect(A).toBeInTheDocument()
})
