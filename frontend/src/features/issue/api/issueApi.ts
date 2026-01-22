/**
 * Issue API Services
 */

import { apiClient } from '../../../shared/api/client';
import { API_ROUTES } from '../../../shared/api/constants';

// Types
export interface IssueLabel {
  label_id: string;
  label_name: string;
}

export interface Issue {
  issue_id: string;
  issue_details: string;
  issue_status: 'todo' | 'in-progress' | 'done' | 'cancelled';
  issue_priority: 'low' | 'medium' | 'high';
  created_by: string;
  created_at: string;
  updated_at: string;
  labels?: IssueLabel[];
}

export interface CreateIssuePayload {
  issue_details: string;
  issue_status: 'todo' | 'in-progress' | 'done' | 'cancelled';
  issue_priority: 'low' | 'medium' | 'high';
  created_by: string;
}

export interface UpdateIssuePayload {
  issue_id: string;
  issue_details?: string;
  issue_status?: 'todo' | 'in-progress' | 'done' | 'cancelled';
  issue_priority?: 'low' | 'medium' | 'high';
  created_by: string;
}

export interface GetAllIssuesParams {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
  label?: string; // Label ID for filtering by single label
}

export interface IssuesResponse {
  data: Issue[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

/**
 * Create a new issue
 */
export const createIssue = async (payload: CreateIssuePayload): Promise<Issue> => {
  try {
    const response = await apiClient.post(API_ROUTES.ISSUE.CREATE, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all issues with pagination, filtering, and search
 */
export const getAllIssues = async (params?: GetAllIssuesParams): Promise<IssuesResponse> => {
  try {
    const response = await apiClient.get(API_ROUTES.ISSUE.GET_ALL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get issue by ID
 */
export const getIssueById = async (issueId: string): Promise<Issue> => {
  try {
    const response = await apiClient.get(API_ROUTES.ISSUE.GET_BY_ID, {
      headers: { issue_id: issueId },
    });
    // Handle both direct Issue response and wrapped response
    const data = response.data?.data || response.data;
    if (!data || !data.issue_id) {
      throw new Error('Invalid issue response format');
    }
    return data;
  } catch (error) {
    console.error('Error fetching issue:', error);
    throw error;
  }
};

/**
 * Update an issue
 */
export const updateIssue = async (payload: UpdateIssuePayload): Promise<Issue> => {
  try {
    const response = await apiClient.put(API_ROUTES.ISSUE.UPDATE, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface DeleteIssuePayload {
  issueId: string;
  issue: Issue;
}

/**
 * Delete an issue
 */
export const deleteIssue = async (payload: DeleteIssuePayload): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete(API_ROUTES.ISSUE.DELETE, {
      headers: { 'issue_id': payload.issueId },
      data: {
        issue_details: payload.issue.issue_details,
        issue_status: payload.issue.issue_status,
        issue_priority: payload.issue.issue_priority,
        created_by: payload.issue.created_by,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
