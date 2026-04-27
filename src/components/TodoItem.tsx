import { Link } from 'react-router';

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

  const handleRemove = () => {
    onDelete(id);
  };

  return (
    <li className="mb-4 px-3 py-2 rounded-md flex items-center justify-between gap-4 bg-[rgba(82,121,179,0.16)]">
      {/* Texto */}
      <Link
        to={`/todos/detalhe/${id}`}
        className={`flex-1 ${complete ? 'line-through text-[var(--color-muted)]' : ''}`}
      >
        {label}
      </Link>

      {/* Ações */}
      <div className="flex items-center gap-2">
        {!complete && (
          <button onClick={handleComplete} className="btn !px-3 !py-1.5 text-xs">
            Concluir
          </button>
        )}

        <button
          onClick={handleRemove}
          className="btn !px-3 !py-1.5 text-xs bg-red-500 hover:bg-red-600"
        >
          Remover
        </button>
      </div>
    </li>
  );
};
