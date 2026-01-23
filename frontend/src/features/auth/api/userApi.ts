/**
 * User API Services
 */

import { apiClient } from '../../../shared/api/client';

export interface UserOption {
  user_id: string;
  user_email: string;
  created_at: string;
}

/**
 * Get all users for assignment purposes
 */
export const getAllUsers = async (): Promise<UserOption[]> => {
  try {
    const response = await apiClient.get('/auth/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
