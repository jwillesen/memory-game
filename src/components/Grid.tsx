import Card from "./Card"

export default function Grid() {
  return (
    <div>
      <Card value="A" row={0} col={0} />
      <Card value="B" row={1} col={1} />
      <Card value="C" row={2} col={2} />
    </div>
  )
}
