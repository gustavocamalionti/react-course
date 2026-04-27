import { Button } from '@/components/ui/button';
import type React from 'react';
import { NavLink } from 'react-router';

export const AppLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-slate-50">
      <header className="flex items-center justify-center gap-4 px-6 py-3 bg-indigo-600 text-white shadow-sm">
        <Button
          variant="ghost"
          asChild
          className="[.active]:bg.accent [.active]:text-accent-foreground"
        >
          <NavLink to="/">Página Inicial</NavLink>
        </Button>

        <Button
          variant="ghost"
          asChild
          className="[.active]:bg.accent [.active]:text-accent-foreground"
        >
          <NavLink to="/todos">Tarefas</NavLink>
        </Button>

        <Button
          variant="ghost"
          asChild
          className="[.active]:bg.accent [.active]:text-accent-foreground"
        >
          <NavLink to="/sobre">Sobre</NavLink>
        </Button>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
};
