import { useState } from 'react';
import { InputAdd } from './components/InputAdd';
import { TodoItem } from './components/TodoItem';

export function App() {
  const [list, setList] = useState([
    { id: '1', label: 'Fazer cafée', complete: false },
    { id: '2', label: 'Fazer café', complete: false },
    { id: '3', label: 'Fazer almoço', complete: false },
    { id: '4', label: 'Fazer janta', complete: false },
  ]);

  const handleAdd = (value: string) => {
    setList([
      ...list,
      {
        id: (list.length + 1).toString(),
        complete: false,
        label: value,
      },
    ]);
  };

  const handleComplete = (id: string) => {
    setList([
      ...list.map((item) => ({
        ...item,
        complete: item.id === id ? true : item.complete,
      })),
    ]);
  };

  const handleDelete = (id: string) => {
    setList([
      ...list.filter((item) => {
        return item.id !== id;
      }),
    ]);
  };

  return (
    <div>
      <InputAdd onAdd={handleAdd} />

      <ol>
        {list.map((listItem) => (
          <TodoItem
            key={listItem.id}
            id={listItem.id}
            label={listItem.label}
            complete={listItem.complete}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </div>
  );
}
