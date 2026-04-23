import './shared/styles/variables.css';
import './shared/styles/base.css';
import './shared/styles/components.css';

import { AuthProvider } from './shared/contexts/AuthContext';
import { AppRoutes } from './Routes';

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
