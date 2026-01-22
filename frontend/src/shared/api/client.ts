/**
 * Axios API Client with JWT Interceptor
 */

import axios, { type AxiosInstance } from 'axios';
import { DEFAULT_ENDPOINT, STORAGE_KEYS } from './constants';

/**
 * Create API client with default configuration
 */
const createApiClient = (): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: DEFAULT_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Request interceptor - Add JWT token to all requests
   */
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * Response interceptor - Handle token expiration and errors
   */
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid - clear storage and redirect to login
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_ID);
        localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
        
        // Dispatch logout action or redirect - can be handled by Redux/Context
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export const apiClient = createApiClient();
export default apiClient;
