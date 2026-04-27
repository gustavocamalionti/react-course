import type React from 'react';
import { NavLink } from 'react-router';

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-slate-50">
      <header className="flex items-center justify-center gap-4 px-6 py-3 bg-indigo-600 text-white shadow-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-2 py-1 rounded font-medium transition ${
              isActive
                ? 'bg-white/15 text-white'
                : 'text-white/80 hover:bg-white/15 hover:text-white'
            }`
          }
        >
          Página Inicial
        </NavLink>

        <NavLink
          to="/todos"
          className={({ isActive }) =>
            `px-2 py-1 rounded font-medium transition ${
              isActive
                ? 'bg-white/15 text-white'
                : 'text-white/80 hover:bg-white/15 hover:text-white'
            }`
          }
        >
          Tarefas
        </NavLink>

        <NavLink
          to="/sobre"
          className={({ isActive }) =>
            `px-2 py-1 rounded font-medium transition ${
              isActive
                ? 'bg-white/15 text-white'
                : 'text-white/80 hover:bg-white/15 hover:text-white'
            }`
          }
        >
          Sobre
        </NavLink>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
};
