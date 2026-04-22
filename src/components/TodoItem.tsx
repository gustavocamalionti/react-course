interface ITodoItemProps {
  id: string;
  label: string;
  complete: boolean;
  onComplete(id: string): void;
  onDelete(id: string): void;
}

export const TodoItem = ({ id, label, complete, onComplete, onDelete }: ITodoItemProps) => {
  const handleComplete = () => {
    onComplete(id);
  };

  const handleDelete = () => {
    onDelete(id);
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
