import type React from "react";

interface ICardProps {
  title: string;
  children: React.ReactNode;
}
const Card = (props: ICardProps) => {
  return (
    <div
      style={{
        border: "1px solid black",
      }}
    >
      <span>Title: {props.title}</span>

      <div>{props.children}</div>

      <div>Footer</div>
    </div>
  );
};

export function App() {
  return (
    <div>
      Hello World
      <Card title="Teste">Teste</Card>
      <Card title="Teste">Teste 1</Card>
      <Card title="Teste">Teste 2</Card>
      <Card title="Teste">Teste 3</Card>
      <Card title="Teste">Teste 4</Card>
      <Card title="Teste">Teste 5</Card>
    </div>
  );
}
