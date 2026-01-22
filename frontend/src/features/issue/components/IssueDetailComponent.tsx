/**
 * Issue Detail Component
 * Dialog for viewing and editing issue details
 */

import { useState, useEffect } from 'react';
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
  Typography,
  Divider,
  Chip,
  Tab,
  Tabs,
} from '@mui/material';
import { useUpdateIssue, useGetIssueById } from '../services/issueHooks';
import { getUserId } from '../../auth/api/authApi';
import CommentListComponent from '../../comments/components/CommentListComponent';
import IssueLabelComponent from './IssueLabelComponent';

interface IssueDetailComponentProps {
  open: boolean;
  issueId: string | null;
  onClose: () => void;
}

interface FormData {
  issue_details: string;
  issue_status: 'todo' | 'in-progress' | 'done' | 'cancelled';
  issue_priority: 'low' | 'medium' | 'high';
}

export default function IssueDetailComponent({ open, issueId, onClose }: IssueDetailComponentProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    issue_details: '',
    issue_status: 'todo',
    issue_priority: 'medium',
  });

  const [errors, setErrors] = useState({
    issue_details: '',
  });

  const { data: issue, isLoading, error, isError } = useGetIssueById(open ? issueId : null);
  const updateIssueMutation = useUpdateIssue();
  const userId = getUserId();

  // Populate form when issue data is fetched
  useEffect(() => {
    if (issue) {
      setFormData({
        issue_details: issue.issue_details,
        issue_status: issue.issue_status as 'todo' | 'in-progress' | 'done' | 'cancelled',
        issue_priority: issue.issue_priority as 'low' | 'medium' | 'high',
      });
      setIsEditMode(false);
      setErrors({ issue_details: '' });
    }
  }, [issue]);

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

  const handleSave = async () => {
    if (!validateForm() || !issueId || !userId) {
      return;
    }

    await updateIssueMutation.mutateAsync({
      issue_id: issueId,
      created_by: userId,
      ...formData,
    });

    setIsEditMode(false);
  };

  const handleCancel = () => {
    if (issue) {
      setFormData({
        issue_details: issue.issue_details,
        issue_status: issue.issue_status as 'todo' | 'in-progress' | 'done' | 'cancelled',
        issue_priority: issue.issue_priority as 'low' | 'medium' | 'high',
      });
    }
    setIsEditMode(false);
  };

  const handleClose = () => {
    setIsEditMode(false);
    onClose();
  };

  if (isLoading && !issue) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (isError) {
    console.error('Error loading issue:', error);
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography color="error">
            Error loading issue: {(error as any)?.message || 'Unknown error'}
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }

  if (!issue) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography color="error">Issue not found</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> = {
    todo: 'default',
    'in-progress': 'warning',
    done: 'success',
    cancelled: 'error',
  };

  const priorityColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> = {
    low: 'success',
    medium: 'warning',
    high: 'error',
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Issue Details</span>
          <Button
            variant={isEditMode ? 'outlined' : 'contained'}
            size="small"
            onClick={() => (isEditMode ? handleCancel() : setIsEditMode(true))}
            disabled={updateIssueMutation.isPending}
          >
            {isEditMode ? 'Cancel' : 'Edit'}
          </Button>
        </Box>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(_e, newValue) => setTabValue(newValue)}>
          <Tab label="Details" />
          <Tab label="Comments" />
          <Tab label="Labels" />
        </Tabs>
      </Box>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {/* Details Tab */}
          {tabValue === 0 && (
            <Stack spacing={3}>
              {/* Issue ID (Read-only) */}
              

              <Divider />

              {/* Issue Details */}
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Issue Details"
                name="issue_details"
                value={formData.issue_details}
                onChange={handleInputChange}
                error={!!errors.issue_details}
                helperText={errors.issue_details || `${formData.issue_details.length}/500`}
                disabled={!isEditMode || updateIssueMutation.isPending}
                variant={isEditMode ? 'outlined' : 'standard'}
                // color="primary"
              />

              {/* Status */}
              <FormControl fullWidth disabled={!isEditMode || updateIssueMutation.isPending}>
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
                <FormHelperText>Current status of the issue</FormHelperText>
              </FormControl>

              {/* Priority */}
              <FormControl fullWidth disabled={!isEditMode || updateIssueMutation.isPending}>
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
                <FormHelperText>Priority level of the issue</FormHelperText>
              </FormControl>

              <Divider />

              {/* Metadata (Read-only) */}
              <Box>
                <Stack spacing={1.5}>
                
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Created Date
                    </Typography>
                    <Typography variant="body2">
                      {new Date(issue.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Last Updated
                    </Typography>
                    <Typography variant="body2">
                      {new Date(issue.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Status Badges */}
              <Box>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                  Current Status
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={issue.issue_status.replace('-', ' ').toUpperCase()}
                    color={statusColors[issue.issue_status]}
                    variant="outlined"
                  />
                  <Chip
                    label={`Priority: ${issue.issue_priority.toUpperCase()}`}
                    color={priorityColors[issue.issue_priority]}
                    variant="filled"
                  />
                </Stack>
              </Box>
            </Stack>
          )}

          {/* Comments Tab */}
          {tabValue === 1 && issueId && <CommentListComponent issueId={issueId} />}

          {/* Labels Tab */}
          {tabValue === 2 && issueId && <IssueLabelComponent issueId={issueId} issueLabels={issue?.labels} />}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={updateIssueMutation.isPending}>
          Close
        </Button>
        {isEditMode && (
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={updateIssueMutation.isPending}
            startIcon={updateIssueMutation.isPending ? <CircularProgress size={20} /> : undefined}
          >
            {updateIssueMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
