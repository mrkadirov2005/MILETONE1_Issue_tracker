/**
 * Create Comment Component
 * Form for adding new comments to an issue
 */

import {
  Paper,
  TextField,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useCreateComment } from '../services/commentHooks';
import { getUserId } from '../../auth/api/authApi';
import { toast } from 'react-toastify';
import { showWordLimitToast } from '../../../shared/utils/toast';

interface CreateCommentComponentProps {
  issueId: string;
}

export default function CreateCommentComponent({ issueId }: CreateCommentComponentProps) {
  const [commentText, setCommentText] = useState('');
  const createComment = useCreateComment();
  const userId = getUserId();

  const handleSubmit = async () => {
    if(commentText.length>500){
      showWordLimitToast("Comment cannot exceed 500 characters");
      return;
    }
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (!userId) {
      toast.error('User ID not found');
      return;
    }

    try {
      await createComment.mutateAsync({
        issue_id: issueId,
        comment_details: commentText.trim(),
        user_id: userId,
      });
      toast.success('Comment added successfully');
      setCommentText('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add comment');
    }
  };

  const charCount = commentText.length;
  const maxChars = 500;

  return (
    <Paper sx={{ p: 2, mt: 2, backgroundColor: '#fafafa' }}>
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Add a Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => {
            if (e.target.value.length <= maxChars) {
              setCommentText(e.target.value);
            }
          }}
          disabled={createComment.isPending}
          helperText={`${charCount}/${maxChars} characters`}
        />
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => setCommentText('')}
            disabled={createComment.isPending || !commentText}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={createComment.isPending || !commentText.trim()}
          >
            {createComment.isPending ? 'Posting...' : 'Post Comment'}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
