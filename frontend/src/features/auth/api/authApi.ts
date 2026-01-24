/**
 * Authentication API Services
 */

import { apiClient } from '../../../shared/api/client';
import { API_ROUTES, STORAGE_KEYS } from '../../../shared/api/constants';

// Types
export interface AuthRequestProps {
  user_email: string;
  user_password: string;
}

export interface User {
  user_id: string;
  user_email: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  user_id: string;
  user_email: string;
  created_at: string;
}

export interface VerifyTokenResponse {
  message: string;
}

/**
 * Register a new user
 */
export const registerUser = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post(API_ROUTES.AUTH.REGISTER, {
      user_email: email,
      user_password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Login user and get JWT token
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post(API_ROUTES.AUTH.LOGIN, {
      user_email: email,
      user_password: password,
    });


    // Handle both direct response and wrapped response
    const data = (response.data?.data || response.data) as AuthResponse;

    // Validate that we have the required fields
    if (!data.accessToken || !data.user?.user_id) {
      console.error('Invalid response format - missing token or user data', data);
      throw new Error('Invalid response format from server');
    }

    // Store tokens in localStorage
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_ID, data.user.user_id);
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, data.user.user_email);

    // Verify tokens were actually saved
    // const savedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Verify JWT token validity
 */
export const verifyToken = async (): Promise<VerifyTokenResponse> => {
  try {
    const response = await apiClient.get(API_ROUTES.AUTH.VERIFY);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout user
 */
export const logoutUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_ID);
  localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
};

/**
 * Get stored auth token
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Get stored user ID
 */
export const getUserId = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.USER_ID);
};

/**
 * Get stored user email
 */
export const getUserEmail = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
