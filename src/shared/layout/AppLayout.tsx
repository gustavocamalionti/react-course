import type React from 'react';
import './AppLayout.css';

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="layout-base">
      <header className="layout-header">
        <a href="">Página Inicial</a>
        <a href="">Sobre</a>
      </header>

      <main className="layout-content">{children}</main>
    </div>
  );
};
