import type React from 'react';
import StylesList from './List.module.css';
export const List = ({ children }: React.PropsWithChildren) => {
  return <ol className={StylesList.ComponentContainer}>{children}</ol>;
};
