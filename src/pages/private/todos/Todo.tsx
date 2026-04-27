import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { TodoAPI, type ITodo } from '../../../shared/services/api/TodoAPI';
import { List } from '../../../components/List';
import { TodoItem } from '../../../components/TodoItem';
import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';

import { Button } from '@/components/ui/button';
export const Todo = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<ITodo[]>([]);

  useEffect(() => {
    TodoAPI.getAll().then((data) => setList(data));
  }, []);

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
      <div className="flex justify-end items-center mb-2.5 mr-6">
        <Button variant="default" asChild>
          <Link to="/todos/detalhe/adicionar" className="btn ml-2.5">
            Adicionar
          </Link>
        </Button>
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
