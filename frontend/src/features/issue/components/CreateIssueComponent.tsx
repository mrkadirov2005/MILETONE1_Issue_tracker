/**
 * Create Issue Component
 * Dialog/Modal form for creating new issues
 */

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  CircularProgress,
  Stack,
  FormHelperText,
} from '@mui/material';
import { useCreateIssue } from '../services/issueHooks';
import { getUserId } from '../../auth/api/authApi';

interface CreateIssueComponentProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateIssueComponent({ open, onClose }: CreateIssueComponentProps) {
  const [formData, setFormData] = useState({
    issue_details: '',
    issue_status: 'todo' as const,
    issue_priority: 'medium' as const,
  });

  const [errors, setErrors] = useState({
    issue_details: '',
  });

  const createIssueMutation = useCreateIssue();
  const userId = getUserId();

  const validateForm = () => {
    const newErrors = { issue_details: '' };

    if (!formData.issue_details.trim()) {
      newErrors.issue_details = 'Issue details are required';
    } else if (formData.issue_details.trim().length > 500) {
      newErrors.issue_details = 'Issue details must not exceed 500 characters';
    }

    setErrors(newErrors);
    return newErrors.issue_details === '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
    // Clear error when user starts typing
    if (name === 'issue_details') {
      setErrors((prev) => ({ ...prev, issue_details: '' }));
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (!userId) {
      return;
    }

    await createIssueMutation.mutateAsync({
      ...formData,
      created_by: userId,
    });

    // Reset form and close dialog on success
    if (!createIssueMutation.isPending) {
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      issue_details: '',
      issue_status: 'todo',
      issue_priority: 'medium',
    });
    setErrors({ issue_details: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleReset} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Issue</DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Stack spacing={3}>
            {/* Issue Details Text Field */}
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Issue Details"
              name="issue_details"
              value={formData.issue_details}
              onChange={handleInputChange}
              placeholder="Describe the issue..."
              error={!!errors.issue_details}
              helperText={errors.issue_details || `${formData.issue_details.length}/500`}
              disabled={createIssueMutation.isPending}
              variant="outlined"
            />

            {/* Status Select */}
            <FormControl fullWidth disabled={createIssueMutation.isPending}>
              <InputLabel>Status</InputLabel>
              <Select
                name="issue_status"
                value={formData.issue_status}
                onChange={handleSelectChange}
                label="Status"
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
              <FormHelperText>Select the initial status of the issue</FormHelperText>
            </FormControl>

            {/* Priority Select */}
            <FormControl fullWidth disabled={createIssueMutation.isPending}>
              <InputLabel>Priority</InputLabel>
              <Select
                name="issue_priority"
                value={formData.issue_priority}
                onChange={handleSelectChange}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
              <FormHelperText>Set the priority level of the issue</FormHelperText>
            </FormControl>
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleReset}
          disabled={createIssueMutation.isPending}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={createIssueMutation.isPending}
          startIcon={createIssueMutation.isPending ? <CircularProgress size={20} /> : undefined}
        >
          {createIssueMutation.isPending ? 'Creating...' : 'Create Issue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
