/**
 * Edit Label Component
 * Dialog form for editing existing labels
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
import { useState, useEffect } from 'react';
import { useUpdateLabel } from '../services/labelHooks';
import { getUserId } from '../../auth/api/authApi';
import { toast } from 'react-toastify';
import type { Label } from '../api/labelApi';

interface EditLabelComponentProps {
  open: boolean;
  label: Label;
  onClose: () => void;
}

export default function EditLabelComponent({ open, label, onClose }: EditLabelComponentProps) {
  const [labelName, setLabelName] = useState('');
  const updateLabel = useUpdateLabel();
  const userId = getUserId();

  useEffect(() => {
    if (open) {
      setLabelName(label.label_name);
    }
  }, [open, label]);

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
      await updateLabel.mutateAsync({
        label_id: label.label_id,
        label_name: labelName.trim(),
        user_id: userId,
      });
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update label');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Label</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Label Name"
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
            disabled={updateLabel.isPending}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={updateLabel.isPending}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={updateLabel.isPending || labelName.trim() === label.label_name}
        >
          {updateLabel.isPending ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
