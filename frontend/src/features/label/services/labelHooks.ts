/**
 * Label React Query Hooks
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllLabels,
  createLabel,
  updateLabel,
  assignLabel,
  unassignLabel,
  deleteLabel,
  type CreateLabelPayload,
  type UpdateLabelPayload,
  type AssignLabelPayload,
  type UnassignLabelPayload,
  type DeleteLabelPayload,
} from '../api/labelApi';
import { handleApiError, handleApiSuccess } from '../../../shared/utils/toast';

const LABELS_QUERY_KEY = ['labels'];

/**
 * Hook to fetch all labels
 */
export const useGetAllLabels = () => {
  return useQuery({
    queryKey: LABELS_QUERY_KEY,
    queryFn: () => getAllLabels(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
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
      // Invalidate labels list to trigger refetch
      queryClient.invalidateQueries({ queryKey: LABELS_QUERY_KEY });
      handleApiSuccess('Label created successfully');
    },
    onError: (error: Error) => {
      handleApiError(error, 'Failed to create label');
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
      // Invalidate labels list
      queryClient.invalidateQueries({ queryKey: LABELS_QUERY_KEY });
      handleApiSuccess('Label updated successfully');
    },
    onError: (error: Error) => {
      handleApiError(error, 'Failed to update label');
    },
  });
};

/**
 * Hook to assign label to issue
 */
export const useAssignLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignLabelPayload) => assignLabel(payload),
    onSuccess: () => {
      // Invalidate both labels and issues
      queryClient.invalidateQueries({ queryKey: LABELS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      handleApiSuccess('Label assigned successfully');
    },
    onError: (error: Error) => {
      handleApiError(error, 'Failed to assign label');
    },
  });
};

/**
 * Hook to unassign label from issue
 */
export const useUnassignLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UnassignLabelPayload) => unassignLabel(payload),
    onSuccess: () => {
      // Invalidate both labels and issues
      queryClient.invalidateQueries({ queryKey: LABELS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      handleApiSuccess('Label unassigned successfully');
    },
    onError: (error: Error) => {
      handleApiError(error, 'Failed to unassign label');
    },
  });
};

/**
 * Hook to delete a label
 */
export const useDeleteLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteLabelPayload) => deleteLabel(payload),
    onSuccess: () => {
      // Invalidate labels list
      queryClient.invalidateQueries({ queryKey: LABELS_QUERY_KEY });
      handleApiSuccess('Label deleted successfully');
    },
    onError: (error: Error) => {
      handleApiError(error, 'Failed to delete label');
    },
  });
};
