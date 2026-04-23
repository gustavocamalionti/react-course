import type React from 'react';
import './AppLayout.css';
import { NavLink } from 'react-router';

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="layout-base">
      <header className="layout-header">
        <NavLink to={'/'}>Página Inicial</NavLink>
        <NavLink to={'/sobre'}>Sobre</NavLink>
      </header>

      <main className="layout-content">{children}</main>
    </div>
  );
};
