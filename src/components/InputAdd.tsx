import { useState, useRef } from 'react';
import StylesInputAdd from './InputAdd.module.css';
interface IInputAddProps {
  onAdd(value: string): void;
}

export const InputAdd = (props: IInputAddProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const handleAdd = () => {
    props.onAdd(value);
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={StylesInputAdd.ComponentContainer}>
      <input
        value={value}
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
        className={StylesInputAdd.ComponentInput}
      />

      <button onClick={handleAdd} className={StylesInputAdd.ComponentButton}>
        Adicionar
      </button>
    </div>
  );
};
