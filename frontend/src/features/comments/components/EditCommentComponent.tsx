/**
 * Edit Comment Component
 * Dialog form for editing existing comments
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
import { useUpdateComment } from '../services/commentHooks';
import { getUserId } from '../../auth/api/authApi';
import { toast } from 'react-toastify';
import type { Comment } from '../api/commentsApi';

interface EditCommentComponentProps {
  open: boolean;
  comment: Comment;
  onClose: () => void;
}

export default function EditCommentComponent({
  open,
  comment,
  onClose,
}: EditCommentComponentProps) {
  const [commentText, setCommentText] = useState('');
  const updateComment = useUpdateComment();
  const userId = getUserId();
    
  useEffect(() => {
    if (open) {
      setCommentText(comment.comment_details);
    }
  }, [open, comment]);

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (!userId) {
      toast.error('User ID not found');
      return;
    }

    try {
      await updateComment.mutateAsync({
        comment_id: comment.comment_id,
        comment_details: commentText.trim(),
        user_id: userId,
      });
      toast.success('Comment updated successfully');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update comment');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Comment</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={updateComment.isPending}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={updateComment.isPending}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={updateComment.isPending || commentText.trim() === comment.comment_details}
        >
          {updateComment.isPending ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
