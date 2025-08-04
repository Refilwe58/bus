import React, { useState, useEffect } from 'react';
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
import { Routes } from './pages/Routes';
import { Forum } from './pages/Forum';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'leaflet/dist/leaflet.css';

const PREVIEW_MODE = true;

const AppContent = () => {
  // Current page string like 'dashboard', 'topup', etc.
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Store parsed query params for step and sessionId for pages that need them (e.g. TopUp)
  const [queryParams, setQueryParams] = useState<{ step?: number; session_id?: string; success?: string }>({});

  const { isLoggedIn, logout } = useAuth();

  // On mount, read URL path and query params to set the current page and pass query to components
 useEffect(() => {
  const path = window.location.pathname.toLowerCase(); // e.g. "/topup" or "/topup/success"
  const params = new URLSearchParams(window.location.search);

  // Extract query params you care about (example: step, session_id, success)
  const step = params.get('step');
  const session_id = params.get('session_id');
  const success = params.get('success');

  // Map path to page key
  let page = 'landing'; // default fallback

  switch (path) {
    case '/':
    case '/landing':
      page = 'landing';
      break;
    case '/login':
      page = 'login';
      break;
    case '/dashboard':
      page = 'dashboard';
      break;
    case '/topup':
    case '/topup/success':   // <--- Add this line so /topup/success works
      page = 'topup';
      break;
    case '/notifications':
      page = 'notifications';
      break;
    case '/feedback':
      page = 'feedback';
      break;
    case '/profile':
      page = 'profile';
      break;
    case '/routes':
      page = 'routes';
      break;
    case '/forum':
      page = 'forum';
      break;
    default:
      page = 'landing';
  }

  setCurrentPage(page);

  // Store query params for passing to pages that need them
  setQueryParams({
    step: step ? parseInt(step, 10) : undefined,
    session_id: session_id || undefined,
    success: success || undefined,
  });
}, []);

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
  };

  // Render the page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'dashboard':
        return PREVIEW_MODE || isLoggedIn ? (
          <Dashboard onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case 'topup':
        return PREVIEW_MODE || isLoggedIn ? (
          <TopUp
            onNavigate={setCurrentPage}
            step={queryParams.step}
            sessionId={queryParams.session_id}
            success={queryParams.success}
          />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case 'notifications':
        return PREVIEW_MODE || isLoggedIn ? (
          <Notifications onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case 'feedback':
        return <Feedback onNavigate={setCurrentPage} />;
      case 'profile':
        return PREVIEW_MODE || isLoggedIn ? (
          <UserProfile onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case 'routes':
        return PREVIEW_MODE || isLoggedIn ? (
          <Routes onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case 'forum':
        return PREVIEW_MODE || isLoggedIn ? (
          <Forum onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        isLoggedIn={PREVIEW_MODE || isLoggedIn}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      <main className="flex-grow w-full">{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
