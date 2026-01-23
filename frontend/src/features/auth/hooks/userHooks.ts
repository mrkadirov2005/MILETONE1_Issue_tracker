/**
 * User React Query Hooks
 */

import { useQuery } from '@tanstack/react-query';
import { getAllUsers, type UserOption } from '../api/userApi';

const USERS_QUERY_KEY = ['users'];

/**
 * Hook to fetch all users for assignment
 */
export const useGetAllUsers = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: () => getAllUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
