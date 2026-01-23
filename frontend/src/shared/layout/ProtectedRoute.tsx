
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useVerifyToken } from '../../features/auth/hooks/authHooks';
import { getAuthToken } from '../../features/auth/api/authApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Verify token with backend
  const { isLoading, isError } = useVerifyToken();

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

  if (isError) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    return <Navigate to="/login" replace />;
  }

  // Token is valid, render protected component
  return <div style={{ height: '100vh', width: '100vw' }}>{children}</div>;
};
