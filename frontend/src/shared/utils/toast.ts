/**
 * Toast Notification Utility
 * Centralized toast notifications using react-toastify
 */

import { toast, type ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Show success toast
 */
export const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...defaultOptions, ...options });
};

/**
 * Show error toast
 */
export const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...defaultOptions, ...options });
};

/**
 * Show info toast
 */
export const showInfoToast = (message: string, options?: ToastOptions) => {
  toast.info(message, { ...defaultOptions, ...options });
};

/**
 * Show warning toast
 */
export const showWarningToast = (message: string, options?: ToastOptions) => {
  toast.warning(message, { ...defaultOptions, ...options });
};

/**
 * Extract error message from API response
 */
export const getErrorMessage = (error: unknown): string => {
  // Handle axios/AxiosError
  if (error && typeof error === 'object') {
    const err = error as any;
    
    // Priority 1: Check response.data.error (most common in our API)
    if (err.response?.data?.error) {
      return String(err.response.data.error);
    }

    // Priority 2: Check response.data.message
    if (err.response?.data?.message) {
      return String(err.response.data.message);
    }

    // Priority 3: Check response.statusText
    if (err.response?.statusText) {
      return err.response.statusText;
    }

    // Priority 4: Check error.message
    if (err.message) {
      return String(err.message);
    }
  }

  // Handle Error object
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
};

/**
 * Handle API errors and show toast
 */
export const handleApiError = (error: unknown, defaultMessage = 'An error occurred'): string => {
  const message = getErrorMessage(error) || defaultMessage;
  showErrorToast(message);
  return message;
};

/**
 * Handle API success and show toast
 */
export const handleApiSuccess = (message: string) => {
  showSuccessToast(message);
};
