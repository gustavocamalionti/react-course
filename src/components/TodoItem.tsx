import { Link } from 'react-router';
import StylesTodoItem from './TodoItem.module.css';

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
    <li className={StylesTodoItem.ComponentItem}>
      <Link
        to={`/detalhe/${id}`}
        className={`${StylesTodoItem.ComponentSpan} ${complete ? StylesTodoItem.ComponentCompleteText : ''}`}
      >
        {label}
      </Link>

      <div className={StylesTodoItem.ComponentContainerButton}>
        {!complete && (
          <button className={`${StylesTodoItem.ComponentButton}`} onClick={handleComplete}>
            Concluir
          </button>
        )}

        <button className={StylesTodoItem.ComponentButton} onClick={handleRemove}>
          Remover
        </button>
      </div>
    </li>
  );
};
