/**
 * Issue Detail Component
 * Dialog for viewing issue details with Telegram-like chat UI
 */

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
  Typography,
  Button,
} from '@mui/material';
import { useUpdateIssue, useGetIssueById } from '../services/issueHooks';
import { getUserId } from '../../auth/api/authApi';
import CommentListComponent from '../../comments/components/CommentListComponent';
import IssueDetailHeader from './IssueDetailHeader';
import IssueEditForm from './IssueEditForm';
import IssueDetailsSidebar from './IssueDetailsSidebar';
import { showWordLimitToast } from '../../../shared/utils/toast';

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
  const [showLabels, setShowLabels] = useState(false);
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
    // handle show word limit toast here
    
    const { name, value } = e.target;
    if((value as string).length > 500){
      showWordLimitToast("Issue details cannot exceed 500 characters");
      return;
    }
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
    setShowLabels(false);
    onClose();
  };

  if (isLoading && !issue) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (isError) {
    console.error('Error loading issue:', error);
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fafbfc',
        },
      }}
    >
      {/* Header - Issue Owner Info */}
      <IssueDetailHeader
        issueId={issue.issue_id}
        createdBy={issue.created_by}
        isEditMode={isEditMode}
        onEditToggle={() => setIsEditMode(!isEditMode)}
        onClose={handleClose}
      />

      {/* Main Content Area */}
      <DialogContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
          {/* Left Side - Issue Details & Comments */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid rgba(0, 0, 0, 0.08)' }}>
            {/* Issue Details Section */}
            {isEditMode && (
              <IssueEditForm
                formData={formData}
                errors={errors}
                isPending={updateIssueMutation.isPending}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onCancel={handleCancel}
                onSave={handleSave}
              />
            )}

            {/* Comments Section - Chat-like */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2.5, bgcolor: '#ffffff' }}>
              {issueId && <CommentListComponent issueId={issueId} />}
            </Box>
          </Box>

          {/* Right Side - Labels Sidebar */}
          <IssueDetailsSidebar
            issue={issue}
            showLabels={showLabels}
            issueId={issueId as string}
            statusColors={statusColors}
            priorityColors={priorityColors}
            onShowLabelsToggle={() => setShowLabels(!showLabels)}
          />
        </Box>
      </DialogContent>

      {/* Footer Actions */}
      <DialogActions
        sx={{
          p: 2,
          bgcolor: '#f5f7fa',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
