import type React from 'react';

export const List = ({ children }: React.PropsWithChildren) => {
  return <ol className="px-5 list-none">{children}</ol>;
};
