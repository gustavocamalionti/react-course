interface ITodoItemProps {
  id: string;
  label: string;
  complete: boolean;
  onComplete(): void;
  onDelete(): void;
}

export const TodoItem = ({ id, label, complete, onComplete, onDelete }: ITodoItemProps) => {
  const handleComplete = () => {
    onComplete();
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <li key={id}>
      {label}
      {complete ? 'Concluído' : ''}
      <button onClick={handleComplete}>Concluir</button>
      <button onClick={handleDelete}>Remover</button>
    </li>
  );
};
