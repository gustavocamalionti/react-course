import { Home } from './pages/Home';
import { AppLayout } from './shared/layout/AppLayout';
import './shared/styles/variables.css';
import './shared/styles/base.css';
import './shared/styles/components.css';
import { About } from './pages/About';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { Detail } from './pages/Detail';

export function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/detalhe/:id" element={<Detail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
