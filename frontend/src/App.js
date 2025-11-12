import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumePreview from './pages/ResumePreview';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Context
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className="w-full">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/resume/new" 
                  element={
                    <PrivateRoute>
                      <ResumeBuilder />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/resume/edit/:id" 
                  element={
                    <PrivateRoute>
                      <ResumeBuilder />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/resume/preview/:id" 
                  element={
                    <PrivateRoute>
                      <ResumePreview />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;