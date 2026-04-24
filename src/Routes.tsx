import { AppLayout } from './shared/layout/AppLayout';
import { About } from './pages/private/todos/About';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { Todo } from './pages/private/todos/Todo';
import { TodoDetail } from './pages/private/todos/TodoDetail';
import { Login } from './pages/public/Login';
import { useIsAuthenticated } from './shared/contexts/AuthContext';
import { Home } from './pages/private/todos/Home';

export const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <BrowserRouter>
      {isAuthenticated && (
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/todos" element={<Todo />} />
            <Route path="/todos/detalhe/:id" element={<TodoDetail />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      )}
      {!isAuthenticated && (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};
