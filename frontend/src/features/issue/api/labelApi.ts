/**
 * Label API Services
 */

import { apiClient } from '../../../shared/api/client';
import { API_ROUTES } from '../../../shared/api/constants';

// Types
export interface Label {
  label_id: string;
  label_name: string;
  created_by: string;
  created_at?: string;
}

export interface CreateLabelPayload {
  label_name: string;
  created_by: string;
}

export interface UpdateLabelPayload {
  label_id: string;
  label_name: string;
}

export interface AssignLabelPayload {
  issue_id: string;
  label_id: string;
}

export interface LabelsResponse {
  success: boolean;
  data: Label[];
}

export interface LabelResponse {
  success: boolean;
  data: Label;
}

/**
 * Create a new label
 */
export const createLabel = async (payload: CreateLabelPayload): Promise<LabelResponse> => {
  try {
    const response = await apiClient.post(API_ROUTES.LABEL.CREATE, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all labels
 */
export const getAllLabels = async (): Promise<LabelsResponse> => {
  try {
    const response = await apiClient.get(API_ROUTES.LABEL.GET_ALL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export const getIssuesByLabelApi = async (label_name: string): Promise<LabelsResponse> => {
//   try {
//     const response = await apiClient.get(`${API_ROUTES.ISSUE.GET_BY_LABEL}`,
//     {headers: { label_name }}
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

/**
 * Update a label (owner only)
 */
export const updateLabel = async (payload: UpdateLabelPayload): Promise<LabelResponse> => {
  try {
    const response = await apiClient.put(API_ROUTES.LABEL.UPDATE, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a label (owner only)
 */
export const deleteLabel = async (labelId: string): Promise<{ success: boolean; data: boolean }> => {
  try {
    const response = await apiClient.delete(API_ROUTES.LABEL.DELETE, {
      data: { label_id: labelId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Assign label to issue
 */
export const assignLabelToIssue = async (payload: AssignLabelPayload): Promise<{ success: boolean; data: boolean }> => {
  try {
    const response = await apiClient.post(API_ROUTES.LABEL.ASSIGN, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
