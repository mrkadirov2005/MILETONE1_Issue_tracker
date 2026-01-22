import './App.css'
import AuthComponent from './features/auth/layout/AuthComponent.tsx'
import DashboardPage from './features/issue/layout/DashboardPage.tsx'
import LabelManagementPage from './features/label/layout/LabelManagementPage.tsx'
import {HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './shared/layout/ProtectedRoute.tsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthComponent />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/labels"
          element={
            <ProtectedRoute>
              <LabelManagementPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
