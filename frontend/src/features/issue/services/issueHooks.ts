/**
 * Issue React Query Hooks
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  type CreateIssuePayload,
  type UpdateIssuePayload,
  type GetAllIssuesParams,
  type DeleteIssuePayload,
} from '../api/issueApi';
import { handleApiError, handleApiSuccess } from '../../../shared/utils/toast';

const ISSUES_QUERY_KEY = ['issues'];

/**
 * Hook to fetch all issues with pagination and filtering
 */
export const useGetAllIssues = (params?: GetAllIssuesParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...ISSUES_QUERY_KEY, params],
    queryFn: () => getAllIssues(params),
    enabled,
  });
};

/**
 * Hook to fetch a specific issue by ID
 */
export const useGetIssueById = (issueId: string | null) => {
  return useQuery({
    queryKey: [...ISSUES_QUERY_KEY, issueId],
    queryFn: () => getIssueById(issueId!),
    enabled: !!issueId, // Only run query if issueId is provided
    retry: false, // Don't retry on failure to show error immediately
  });
};

/**
 * Hook to create a new issue
 */
export const useCreateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateIssuePayload) => createIssue(payload),
    onSuccess: () => {
      // Invalidate issues list to trigger refetch
      queryClient.invalidateQueries({ queryKey: ISSUES_QUERY_KEY });
      handleApiSuccess('Issue created successfully');
    },
    onError: (error: Error) => {
      handleApiError(error, 'Failed to create issue');
    },
  });
};

/**
 * Hook to update an issue
 */
export const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateIssuePayload) => updateIssue(payload),
    onSuccess: (data) => {
      // Update specific issue in cache
      queryClient.setQueryData([...ISSUES_QUERY_KEY, data.issue_id], data);
      // Invalidate all issues list
      queryClient.invalidateQueries({ queryKey: ISSUES_QUERY_KEY });
      handleApiSuccess('Issue updated successfully');
    },
    onError: (error: Error) => {
      handleApiError(error, 'Failed to update issue');
    },
  });
};

/**
 * Hook to delete an issue
 */
export const useDeleteIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteIssuePayload) => deleteIssue(payload),
    onSuccess: () => {
      // Invalidate all issues to trigger refetch
      queryClient.invalidateQueries({ queryKey: ISSUES_QUERY_KEY });
      handleApiSuccess('Issue deleted successfully');
    },
    onError: (error: Error) => {
      handleApiError(error, 'Failed to delete issue');
    },
  });
};
