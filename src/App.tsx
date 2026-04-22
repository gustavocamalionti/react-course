import { useState, useEffect } from 'react';
import { InputAdd } from './components/InputAdd';
import { TodoItem } from './components/TodoItem';
import { List } from './components/List';
import { TodoAPI, type ITodo } from './shared/services/api/TodoAPI';

// TodoAPI.create({ label: 'Fazer café', complete: false });

// TodoAPI.create({ label: 'Fazer janta', complete: false });

// TodoAPI.create({ label: 'Fazer almoço', complete: false });

export function App() {
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
}
