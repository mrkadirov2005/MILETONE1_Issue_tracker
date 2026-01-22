/**
 * ProtectedRoute Component
 * Protects routes from unauthorized access
 * Checks token validity before allowing access
 */

import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useVerifyToken } from '../../features/auth/hooks/authHooks';
import { getAuthToken } from '../../features/auth/api/authApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Check if token exists in localStorage
  const token = getAuthToken();

  // If no token, redirect to login immediately
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Verify token with backend
  const { isLoading, isError } = useVerifyToken();

  // Show loading spinner while verifying token
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If token verification failed, redirect to login
  if (isError) {
    // Clear invalid token
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    return <Navigate to="/login" replace />;
  }

  // Token is valid, render protected component
  return <div style={{ height: '100vh', width: '100vw' }}>{children}</div>;
};
