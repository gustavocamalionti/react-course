import type React from 'react';

export const List = ({ children }: React.PropsWithChildren) => {
  return <ol>{children}</ol>;
};
