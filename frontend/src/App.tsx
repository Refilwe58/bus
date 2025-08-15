import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Success } from './pages/Success';
import { Cancel } from './pages/Cancel';
import { TopUp } from './pages/TopUp';
import { Notifications } from './pages/Notifications';
import { Feedback } from './pages/Feedback';
import { Login } from './pages/Login';
import { UserProfile } from './pages/UserProfile';
import { Routes as BusRoutes } from './pages/Routes';
import { Forum } from './pages/Forum';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'leaflet/dist/leaflet.css';

const PREVIEW_MODE = true;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isLoggedIn={PREVIEW_MODE || isLoggedIn} onLogout={handleLogout} />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
};

const TopUpWrapper = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const step = query.get('step');
  const session_id = query.get('session_id');
  const success = query.get('success');

  return (
    <TopUp
      step={step ? parseInt(step, 10) : undefined}
      sessionId={session_id || undefined}
      success={success || undefined}
    />
  );
};

export function App() {
  const { isLoggedIn } = useAuth();

  return (
    <AuthProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={PREVIEW_MODE || isLoggedIn ? <Dashboard /> : <Login />}
          />
          <Route
            path="/topup"
            element={PREVIEW_MODE || isLoggedIn ? <TopUpWrapper /> : <Login />}
          />
          <Route
            path="/topup/success"
            element={PREVIEW_MODE || isLoggedIn ? <TopUpWrapper /> : <Login />}
          />
          <Route
            path="/notifications"
            element={PREVIEW_MODE || isLoggedIn ? <Notifications /> : <Login />}
          />
          <Route
            path="/feedback"
            element={<Feedback />}
          />
          <Route
            path="/profile"
            element={PREVIEW_MODE || isLoggedIn ? <UserProfile /> : <Login />}
          />
          <Route
            path="/routes"
            element={PREVIEW_MODE || isLoggedIn ? <BusRoutes /> : <Login />}
          />
          <Route
            path="/forum"
            element={PREVIEW_MODE || isLoggedIn ? <Forum /> : <Login />}
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </AppLayout>
    </AuthProvider>
  );
}
