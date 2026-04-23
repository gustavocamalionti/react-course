import { useState } from 'react';
import StylesInputAdd from './InputAdd.module.css';
interface IInputAddProps {
  onAdd(value: string): void;
}

export const InputAdd = (props: IInputAddProps) => {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    props.onAdd(value);
    setValue('');
  };

  return (
    <div className={StylesInputAdd.ComponentContainer}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={StylesInputAdd.ComponentInput}
      />

      <button onClick={handleAdd} className={StylesInputAdd.ComponentButton}>
        Adicionar
      </button>
    </div>
  );
};
