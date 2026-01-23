

import { toast, type ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};


export const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...defaultOptions, ...options });
};


export const showInfoToast = (message: string, options?: ToastOptions) => {
  toast.info(message, { ...defaultOptions, ...options });
};


export const showWarningToast = (message: string, options?: ToastOptions) => {
  toast.warning(message, { ...defaultOptions, ...options });
};


export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object') {
    const err = error as any;
    
    if (err.response?.data?.error) {
      return String(err.response.data.error);
    }

    if (err.response?.data?.message) {
      return String(err.response.data.message);
    }

    if (err.response?.statusText) {
      return err.response.statusText;
    }

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


export const handleApiError = (error: unknown, defaultMessage = 'An error occurred'): string => {
  const message = getErrorMessage(error) || defaultMessage;
  showErrorToast(message);
  return message;
};


export const handleApiSuccess = (message: string) => {
  showSuccessToast(message);
};
