import { useEffect, useState } from 'react';

import { TodoAPI, type ITodo } from '../shared/services/api/TodoAPI';
import { InputAdd } from '../components/InputAdd';
import { List } from '../components/List';
import { TodoItem } from '../components/TodoItem';

export const Home = () => {
  const [list, setList] = useState<ITodo[]>([]);

  useEffect(() => {
    TodoAPI.getAll().then((data) => setList(data));
  }, []);

  const handleAdd = (value: string) => {
    TodoAPI.create({ label: value, complete: false }).then((data) => {
      setList([...list, data]);
    });
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
    <div>
      <InputAdd onAdd={handleAdd} />

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
    </div>
  );
};
