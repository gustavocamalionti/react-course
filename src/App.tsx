import { Home } from './pages/Home';
import { AppLayout } from './shared/layout/AppLayout';
import './shared/styles/variables.css';
import './shared/styles/base.css';
import './shared/styles/components.css';
import { About } from './pages/About';

export function App() {
  return (
    <AppLayout>
      <Home />
      <About />
    </AppLayout>
  );
}
