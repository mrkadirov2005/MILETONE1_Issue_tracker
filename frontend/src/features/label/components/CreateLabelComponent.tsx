/**
 * Create Label Component
 * Dialog form for creating new labels
 */

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { useCreateLabel } from '../services/labelHooks';
import { getUserId } from '../../auth/api/authApi';
import { toast } from 'react-toastify';

interface CreateLabelComponentProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateLabelComponent({ open, onClose }: CreateLabelComponentProps) {
  const [labelName, setLabelName] = useState('');
  const createLabel = useCreateLabel();
  const userId = getUserId();

  const handleSubmit = async () => {
    if (!labelName.trim()) {
      toast.error('Label name is required');
      return;
    }

    if (!userId) {
      toast.error('User ID not found');
      return;
    }

    try {
      await createLabel.mutateAsync({
        label_name: labelName.trim(),
        user_id: userId,
      });
      toast.success('Label created successfully');
      setLabelName('');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create label');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Label</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Label Name"
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
            placeholder="e.g., Bug, Feature, Documentation"
            disabled={createLabel.isPending}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={createLabel.isPending}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={createLabel.isPending || !labelName.trim()}
        >
          {createLabel.isPending ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
