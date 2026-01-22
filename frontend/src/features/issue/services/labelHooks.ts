/**
 * Label React Query Hooks
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createLabel,
  getAllLabels,
  updateLabel,
  deleteLabel,
  assignLabelToIssue,
  type CreateLabelPayload,
  type UpdateLabelPayload,
  type AssignLabelPayload,
} from '../api/labelApi';

const LABELS_QUERY_KEY = ['labels'];

/**
 * Hook to fetch all labels
 */
export const useGetAllLabels = () => {
  return useQuery({
    queryKey: LABELS_QUERY_KEY,
    queryFn: () => getAllLabels(),
    staleTime: 10 * 60 * 1000, // 10 minutes - labels rarely change
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};


/**
 * Hook to create a new label
 */
export const useCreateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLabelPayload) => createLabel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LABELS_QUERY_KEY });
      console.log('Label created successfully');
    },
    onError: (error: Error) => {
      console.error('Failed to create label:', error.message);
    },
  });
};

/**
 * Hook to update a label
 */
export const useUpdateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateLabelPayload) => updateLabel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LABELS_QUERY_KEY });
      console.log('Label updated successfully');
    },
    onError: (error: Error) => {
      console.error('Failed to update label:', error.message);
    },
  });
};

/**
 * Hook to delete a label
 */
export const useDeleteLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (labelId: string) => deleteLabel(labelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LABELS_QUERY_KEY });
      console.log('Label deleted successfully');
    },
    onError: (error: Error) => {
      console.error('Failed to delete label:', error.message);
    },
  });
};

/**
 * Hook to assign a label to an issue
 */
export const useAssignLabelToIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignLabelPayload) => assignLabelToIssue(payload),
    onSuccess: (_,) => {
      // Invalidate issues to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      console.log('Label assigned to issue successfully');
    },
    onError: (error: Error) => {
      console.error('Failed to assign label:', error.message);
    },
  });
};
