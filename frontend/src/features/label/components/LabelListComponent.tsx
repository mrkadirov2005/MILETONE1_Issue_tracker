/**
 * Label List Component
 * Displays all labels with options to edit, delete, and assign to issues
 */

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Typography,
  Paper,
  TextField,
  Stack,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useGetAllLabels, useDeleteLabel } from '../services/labelHooks';
import { getUserId } from '../../auth/api/authApi';
import CreateLabelComponent from './CreateLabelComponent';
import EditLabelComponent from './EditLabelComponent';
import type { Label } from '../api/labelApi';

export default function LabelListComponent() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: labelsData, isLoading, isError, error } = useGetAllLabels();
  const deleteLabel = useDeleteLabel();

  const labels = labelsData?.data || [];
  const userId = getUserId();

  const filteredLabels = labels.filter((label) =>
    label.label_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (label: Label) => {
    setSelectedLabel(label);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (label: Label) => {
    setSelectedLabel(label);
    setEditDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedLabel && userId) {
      await deleteLabel.mutateAsync({
        label_id: selectedLabel.label_id,
        user_id: userId,
      });
      setDeleteDialogOpen(false);
      setSelectedLabel(null);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Paper sx={{ p: 3, backgroundColor: '#ffebee' }}>
        <Typography color="error">
          Error loading labels: {error instanceof Error ? error.message : 'Unknown error'}
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      {/* Header and Search */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Labels
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setCreateDialogOpen(true)}>
            Add Label
          </Button>
        </Stack>

        <TextField
          placeholder="Search labels..."
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Labels List */}
      {filteredLabels.length > 0 ? (
        <Paper>
          <List>
            {filteredLabels.map((label) => (
              <ListItem key={label.label_id} divider>
                <ListItemText
                  primary={label.label_name}
                  secondary={`Created: ${new Date(label.created_at).toLocaleDateString()}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditClick(label)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(label)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="textSecondary">No labels found. Create one to get started!</Typography>
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Label</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{selectedLabel?.label_name}"? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleteLabel.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteLabel.isPending}
          >
            {deleteLabel.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Label Dialog */}
      <CreateLabelComponent
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />

      {/* Edit Label Dialog */}
      {selectedLabel && (
        <EditLabelComponent
          open={editDialogOpen}
          label={selectedLabel}
          onClose={() => {
            setEditDialogOpen(false);
            setSelectedLabel(null);
          }}
        />
      )}
    </>
  );
}
