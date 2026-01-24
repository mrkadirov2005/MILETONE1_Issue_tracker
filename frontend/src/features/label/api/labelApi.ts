/**
 * Label API Services
 */

import { apiClient } from '../../../shared/api/client';
import { API_ROUTES } from '../../../shared/api/constants';

// Types
export interface Label {
  label_id: string;
  label_name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLabelPayload {
  label_name: string;
  user_id: string;
}

export interface UpdateLabelPayload {
  label_id: string;
  label_name: string;
  user_id: string;
}

export interface AssignLabelPayload {
  issue_id: string;
  label_id: string;
  user_id: string;
}

export interface DeleteLabelPayload {
  label_id: string;
  user_id: string;
}

export interface UnassignLabelPayload {
  issue_id: string;
  label_id: string;
}

export interface LabelsResponse {
  data: Label[];
}

/**
 * Get all labels for a user
 */
export const getAllLabels = async (): Promise<LabelsResponse> => {
  try {
    const response = await apiClient.get(API_ROUTES.LABEL.GET_ALL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new label
 */
export const createLabel = async (payload: CreateLabelPayload): Promise<Label> => {
  try {
    const response = await apiClient.post(API_ROUTES.LABEL.CREATE, payload);
    // Handle both direct response and wrapped response
    const data = response.data?.data || response.data;
    return data;
  } catch (error) {
    console.error('Error creating label:', error);
    throw error;
  }
};

/**
 * Update a label
 */
export const updateLabel = async (payload: UpdateLabelPayload): Promise<Label> => {
  try {
    const response = await apiClient.put(API_ROUTES.LABEL.UPDATE, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Assign label to issue
 */
export const assignLabel = async (payload: AssignLabelPayload): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post('/label/assign', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Unassign label from issue
 */
export const unassignLabel = async (payload: UnassignLabelPayload): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post('/label/unassign', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a label
 */
export const deleteLabel = async (payload: DeleteLabelPayload): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete(API_ROUTES.LABEL.DELETE, {
      data: payload,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
