// /**
//  * Comment React Query Hooks
//  */

// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import {
//   getIssueComments,
//   getUserComments,
//   createComment,
//   updateComment,
//   deleteComment,
//   type CreateCommentPayload,
//   type UpdateCommentPayload,
//   type DeleteCommentPayload,
// } from '../api/commentsApi';

// const COMMENTS_QUERY_KEY = ['comments'];

// /**
//  * Hook to fetch comments for a specific issue
//  */
// export const useGetIssueComments = (issueId: string | null) => {
//   return useQuery({
//     queryKey: [...COMMENTS_QUERY_KEY, 'issue', issueId],
//     queryFn: () => getIssueComments(issueId!),
//     enabled: !!issueId,
//     staleTime: 3 * 60 * 1000, // 3 minutes
//     gcTime: 10 * 60 * 1000, // 10 minutes
//   });
// };

// /**
//  * Hook to fetch all comments by a user
//  */
// export const useGetUserComments = (userId: string | null) => {
//   return useQuery({
//     queryKey: [...COMMENTS_QUERY_KEY, 'user', userId],
//     queryFn: () => getUserComments(userId!),
//     enabled: !!userId,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     gcTime: 10 * 60 * 1000, // 10 minutes
//   });
// };

// /**
//  * Hook to create a new comment
//  */
// export const useCreateComment = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: CreateCommentPayload) => createComment(payload),
//     onSuccess: (data) => {
//       // Invalidate issue comments
//       queryClient.invalidateQueries({ queryKey: [...COMMENTS_QUERY_KEY, 'issue', data.issue_id] });
//       console.log('Comment created successfully');
//     },
//     onError: (error: Error) => {
//       console.error('Failed to create comment:', error.message);
//     },
//   });
// };

// /**
//  * Hook to update a comment
//  */
// export const useUpdateComment = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: UpdateCommentPayload) => updateComment(payload),
//     onSuccess: () => {
//       // Invalidate all comments
//       queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY });
//       console.log('Comment updated successfully');
//     },
//     onError: (error: Error) => {
//       console.error('Failed to update comment:', error.message);
//     },
//   });
// };

// /**
//  * Hook to delete a comment
//  */
// export const useDeleteComment = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: DeleteCommentPayload) => deleteComment(payload),
//     onSuccess: () => {
//       // Invalidate all comments
//       queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY });
//       console.log('Comment deleted successfully');
//     },
//     onError: (error: Error) => {
//       console.error('Failed to delete comment:', error.message);
//     },
//   });
// };

// /**
//  * Hook to fetch comments by issue ID
//  */
// export const useGetCommentsByIssue = (params: any) => {
//   return useQuery({
//     queryKey: [...COMMENTS_QUERY_KEY, 'issue', params?.issue_id, params],
//     queryFn: () => getIssueComments(params?.issue_id),
//     enabled: !!params?.issue_id,
//     staleTime: 3 * 60 * 1000, // 3 minutes
//     gcTime: 10 * 60 * 1000, // 10 minutes
//   });
// };

// /**
//  * Hook to fetch comments by user ID
//  */
// export const useGetCommentsByUser = (params: any) => {
//   return useQuery({
//     queryKey: [...COMMENTS_QUERY_KEY, 'user', params?.user_id, params],
//     queryFn: () => getUserComments(params?.user_id),
//     enabled: !!params?.user_id,
//     staleTime: 3 * 60 * 1000,
//     gcTime: 10 * 60 * 1000,
//   });
// };
