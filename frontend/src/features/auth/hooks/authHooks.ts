/**
 * Authentication React Query Hooks with Toast Notifications
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import {
  loginUser,
  registerUser,
  logoutUser,
  verifyToken,
  type AuthResponse,
  type RegisterResponse,
} from '../api/authApi';
import { handleApiError, handleApiSuccess } from '../../../shared/utils/toast';

/**
 * Hook for user registration with toast notifications
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerUser(email, password),
    onSuccess: (data: RegisterResponse) => {
      handleApiSuccess(`Registration successful! Welcome ${data.user_email}`);
    },
    onError: (error: Error) => {
      handleApiError(error, 'Registration failed');
    },
  });
};

/**
 * Hook for user login with toast notifications
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data: AuthResponse) => {
      handleApiSuccess(`Welcome back, ${data.user.user_email}!`);
    },
    onError: (error: Error) => {
      handleApiError(error, 'Login failed');
    },
  });
};

/**
 * Hook to verify token validity
 * Used for checking authentication on app load or route changes
 */
export const useVerifyToken = () => {
  return useQuery({
    queryKey: ['auth', 'verify-token'],
    queryFn: () => verifyToken(),
    retry: 1,
  });
};

/**
 * Hook for user logout with toast notifications
 */
export const useLogout = () => {
  return useMutation({
    mutationFn: () => {
      logoutUser();
      return Promise.resolve();
    },
    onSuccess: () => {
      handleApiSuccess('Logged out successfully');
      // Optionally redirect to login page
      window.location.href = '/login';
    },
    onError: (error: Error) => {
      handleApiError(error, 'Logout failed');
    },
  });
};


