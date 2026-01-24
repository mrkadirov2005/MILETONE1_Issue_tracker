/**
 * Issue Label Component
 * Component for managing labels for an issue
 */

import {
  Paper,
  TextField,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useGetAllLabels, useAssignLabel, useCreateLabel, useUnassignLabel } from '../../label/services/labelHooks';
import { getUserId } from '../../auth/api/authApi';
import { toast } from 'react-toastify';

interface IssueLabelComponentProps {
  issueId: string;
  issueLabels?: Array<{ label_id: string; label_name: string }>;
}

export default function IssueLabelComponent({ issueId, issueLabels = [] }: IssueLabelComponentProps) {
  const [selectedLabelId, setSelectedLabelId] = useState<string>('');
  const [assignedLabels, setAssignedLabels] = useState<string[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');

  const { data: labelsData, isLoading, refetch } = useGetAllLabels();
  const assignLabelMutation = useAssignLabel();
  const unassignLabelMutation = useUnassignLabel();
  const createLabelMutation = useCreateLabel();
  const userId = getUserId();

  // Initialize assigned labels from issueLabels prop
  useEffect(() => {
    if (issueLabels && issueLabels.length > 0) {
      setAssignedLabels(issueLabels.map(label => label.label_id));
    }
  }, [issueLabels]);

  const labels = labelsData?.data || [];

  const handleAssignLabel = async () => {
    if (!selectedLabelId || !userId) {
      toast.error('Please select a label');
      return;
    }

    try {
      await assignLabelMutation.mutateAsync({
        issue_id: issueId,
        label_id: selectedLabelId,
        user_id: userId,
      });
      setAssignedLabels([...assignedLabels, selectedLabelId]);
      setSelectedLabelId('');
      // toast.success('Label assigned successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to assign label');
    }
  };

  const handleRemoveLabel = async (labelId: string) => {
    try {
      await unassignLabelMutation.mutateAsync({
        issue_id: issueId,
        label_id: labelId,
      });
      setAssignedLabels(assignedLabels.filter(id => id !== labelId));
      toast.success('Label removed successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to remove label');
    }
  };

  const handleCreateLabel = async () => {
    if (!newLabelName.trim() || !userId) {
      toast.error('Please enter a label name');
      return;
    }

    try {
      await createLabelMutation.mutateAsync({
        label_name: newLabelName.trim(),
        user_id: userId,
      });
      toast.success('Label created successfully');
      setNewLabelName('');
      setCreateDialogOpen(false);
      // Refresh labels list
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create label');
    }
  };

  const availableLabels = labels.filter(label => !assignedLabels.includes(label.label_id));
  const selectedLabels = labels.filter(label => assignedLabels.includes(label.label_id));

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      {/* Assigned Labels */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Assigned Labels ({selectedLabels.length})
        </Typography>
        {selectedLabels.length > 0 ? (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {selectedLabels.map(label => (
              <Chip
                key={label.label_id}
                label={label.label_name}
                onDelete={() => handleRemoveLabel(label.label_id)}
                color="primary"
                variant="outlined"
                disabled={unassignLabelMutation.isPending}
              />
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No labels assigned yet
          </Typography>
        )}
      </Box>

      {/* Add Label Section */}
      <Paper sx={{ p: 2, backgroundColor: '#fafafa' }}>
        <Stack spacing={2}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Add Label
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              select
              fullWidth
              value={selectedLabelId}
              onChange={(e) => setSelectedLabelId(e.target.value)}
              disabled={assignLabelMutation.isPending || (availableLabels.length === 0 && selectedLabels.length > 0)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Choose a label...</option>
              {availableLabels.map(label => (
                <option key={label.label_id} value={label.label_id}>
                  {label.label_name}
                </option>
              ))}
              <option value="__create_new__">+ Add your Label</option>
            </TextField>
            <Button
              variant="contained"
              onClick={() => {
                if (selectedLabelId === '__create_new__') {
                  setCreateDialogOpen(true);
                  setSelectedLabelId('');
                } else {
                  handleAssignLabel();
                }
              }}
              disabled={assignLabelMutation.isPending || !selectedLabelId}
              sx={{ whiteSpace: 'nowrap' }}
            >
              {assignLabelMutation.isPending ? 'Creating...' : selectedLabelId === '__create_new__' ? 'Create Label' : 'Add'}
            </Button>
          </Box>

          {availableLabels.length === 0 && selectedLabels.length > 0 && (
            <Typography variant="caption" color="textSecondary">
              All available labels have been assigned
            </Typography>
          )}

          {labels.length === 0 && (
            <Typography variant="caption" color="textSecondary">
              No labels available. Create labels first in the Label management section.
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* Create Label Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Label</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Label Name"
            value={newLabelName}
            onChange={(e) => setNewLabelName(e.target.value)}
            disabled={createLabelMutation.isPending}
            placeholder="Enter label name"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)} disabled={createLabelMutation.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateLabel}
            variant="contained"
            disabled={createLabelMutation.isPending || !newLabelName.trim()}
          >
            {createLabelMutation.isPending ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
