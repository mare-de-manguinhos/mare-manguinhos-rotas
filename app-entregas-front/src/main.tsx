import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './index.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DeliveryDetailsPage from './pages/DeliveryDetailsPage';
import HistoryPage from './pages/HistoryPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/details/:id' element={<DeliveryDetailsPage />} />
          <Route path='/history' element={<HistoryPage />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </ErrorBoundary>
  </StrictMode>,
);
