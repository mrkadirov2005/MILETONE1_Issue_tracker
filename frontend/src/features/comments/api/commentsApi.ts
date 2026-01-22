/**
 * Comments API Services
 */

import { apiClient } from '../../../shared/api/client';
import { API_ROUTES } from '../../../shared/api/constants';

// Types
export interface Comment {
  comment_id: string;
  issue_id: string;
  comment_details: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCommentPayload {
  issue_id: string;
  comment_details: string;
  user_id: string;
}

export interface UpdateCommentPayload {
  comment_id: string;
  comment_details: string;
  user_id: string;
}

export interface DeleteCommentPayload {
  comment_id: string;
  user_id: string;
}

export interface CommentsResponse {
  data: Comment[];
}

export interface CommentResponse {
  data: Comment;
}

/**
 * Get all comments for an issue
 */
export const getIssueComments = async (issueId: string): Promise<CommentsResponse> => {
  try {
    const response = await apiClient.request({
      method: 'GET',
      url: API_ROUTES.COMMENT.GET_ISSUE_COMMENTS,
      headers: { issue_id: issueId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all comments by a user
 */
export const getUserComments = async (userId: string): Promise<CommentsResponse> => {
  try {
    const response = await apiClient.get(API_ROUTES.COMMENT.GET_USER_COMMENTS, {
      headers: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new comment
 */
export const createComment = async (payload: CreateCommentPayload): Promise<Comment> => {
  try {
    const response = await apiClient.post(API_ROUTES.COMMENT.CREATE, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update a comment
 */
export const updateComment = async (payload: UpdateCommentPayload): Promise<Comment> => {
  try {
    const response = await apiClient.put(API_ROUTES.COMMENT.UPDATE, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a comment
 */
export const deleteComment = async (payload: DeleteCommentPayload): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete(API_ROUTES.COMMENT.DELETE, {
      data: payload,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

