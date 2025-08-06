// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// We will create these pages and context files in the next steps.
// For now, we write the code assuming they exist.
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Loader } from './components/core/Loader';

/**
 * A wrapper component to protect routes that require authentication.
 * If a user is not logged in, they will be redirected to the login page.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The component to render if the user is authenticated.
 * @returns {React.ReactNode} The protected component or a redirect.
 */
function PrivateRoute({ children }) {
  // The useAuth hook will provide us with the current user and loading state.
  // We will build this AuthContext next.
  const { currentUser, loading } = useAuth();

  // 1. If we are still trying to determine the auth state, show a full-screen loader.
  // This prevents a flicker from the login page to the dashboard on refresh.
  if (loading) {
    return <Loader fullScreen={true} />;
  }

  // 2. If loading is finished and a user exists, show the requested page.
  if (currentUser) {
    return children;
  }

  // 3. If loading is finished and there's no user, redirect to the login page.
  return <Navigate to="/login" />;
}

function App() {
  return (
    // 1. The AuthProvider wraps the entire app, making authentication state
    // (like currentUser) available to all components.
    <AuthProvider>
      {/* 2. The Router provides the foundation for all navigation. */}
      <Router>
        {/* 3. The Toaster component from react-hot-toast allows us to show
            notifications from anywhere in the app without extra setup. */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#2d3748', // gray-800
              color: '#ffffff',
            },
          }}
        />
        
        {/* 4. The Routes component defines all the possible navigation paths. */}
        <Routes>
          {/* Public Routes - Anyone can access these */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Private Route - The dashboard is wrapped in our PrivateRoute component */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          {/* Fallback Route - If no other route matches, redirect to the home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;