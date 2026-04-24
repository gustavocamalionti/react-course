import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { TodoAPI, type ITodo } from '../../../shared/services/api/TodoAPI';
import { List } from '../../../components/List';
import { TodoItem } from '../../../components/TodoItem';
import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';
import HomeStyles from './Todo.module.css';

export const Todo = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<ITodo[]>([]);

  useEffect(() => {
    TodoAPI.getAll().then((data) => setList(data));
  }, []);

  const handleAdd = () => {
    navigate('/todos/detalhe/adicionar');
  };

  const handleComplete = (id: string) => {
    TodoAPI.updateById(id, { complete: true }).then(() => {
      setList([
        ...list.map((item) => ({
          ...item,
          complete: item.id === id ? true : item.complete,
        })),
      ]);
    });
  };

  const handleRemove = (id: string) => {
    TodoAPI.deleteById(id).then(() => {
      setList([
        ...list.filter((item) => {
          return item.id !== id;
        }),
      ]);
    });
  };

  return (
    <PageLayout title="Tarefas">
      <div className={HomeStyles.ButtonContainer}>
        <Link to="/todos/detalhe/adicionar" className={HomeStyles.ComponentButton}>
          Adicionar
        </Link>
      </div>

      <List>
        {list.map((listItem) => (
          <TodoItem
            key={listItem.id}
            id={listItem.id}
            label={listItem.label}
            complete={listItem.complete}
            onDelete={handleRemove}
            onComplete={handleComplete}
          />
        ))}
      </List>
    </PageLayout>
  );
};
