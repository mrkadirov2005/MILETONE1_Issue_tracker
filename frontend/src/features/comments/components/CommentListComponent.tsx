/**
 * Comment List Component
 * Displays all comments for an issue in a chat-like format
 */

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useGetIssueComments, useDeleteComment } from '../services/commentHooks';
import { getUserId } from '../../auth/api/authApi';
import CreateCommentComponent from './CreateCommentComponent';
import EditCommentComponent from './EditCommentComponent';
import type { Comment } from '../api/commentsApi';

interface CommentListComponentProps {
  issueId: string | null;
}

export default function CommentListComponent({ issueId }: CommentListComponentProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: commentsData, isLoading } = useGetIssueComments(issueId);
  const deleteComment = useDeleteComment();
  const userId = getUserId();

  const comments = commentsData?.data || [];

  const handleDeleteClick = (comment: Comment) => {
    setSelectedComment(comment);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (comment: Comment) => {
    setSelectedComment(comment);
    setEditDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedComment && userId) {
      await deleteComment.mutateAsync({
        comment_id: selectedComment.comment_id,
        user_id: userId,
      });
      setDeleteDialogOpen(false);
      setSelectedComment(null);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <>
      {/* Comments Section Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Comments ({comments.length})
        </Typography>
      </Box>

      {/* Comments List - Chat Style */}
      {comments.length > 0 ? (
        <Paper sx={{ p: 2, mb: 2, maxHeight: 400, overflow: 'auto', backgroundColor: '#f5f5f5' }}>
          <Stack spacing={2}>
            {comments.map((comment: Comment) => {
              const isOwnComment = comment.user_id === userId;
              
              return (
                <Box
                  key={comment.comment_id}
                  sx={{
                    display: 'flex',
                    justifyContent: isOwnComment ? 'flex-end' : 'flex-start',
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      display: 'flex',
                      flexDirection: isOwnComment ? 'row-reverse' : 'row',
                      alignItems: 'flex-end',
                      gap: 1,
                    }}
                  >
                    {/* Message Bubble */}
                    <Paper
                      sx={{
                        p: 1.5,
                        backgroundColor: isOwnComment ? '#4caf50' : '#e0e0e0',
                        color: isOwnComment ? 'white' : 'black',
                        borderRadius: 2,
                        wordBreak: 'break-word',
                        boxShadow: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        {comment.comment_details}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.7,
                          display: 'block',
                          textAlign: isOwnComment ? 'right' : 'left',
                        }}
                      >
                        {new Date(comment.created_at).toLocaleString()}
                      </Typography>
                    </Paper>

                    {/* Action Buttons - Only for own comments */}
                    {isOwnComment && (
                      <Stack direction="row" spacing={0.5}>
                        <IconButton
                          size="small"
                          onClick={() => handleEditClick(comment)}
                          sx={{
                            backgroundColor: '#f0f0f0',
                            '&:hover': { backgroundColor: '#e0e0e0' },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(comment)}
                          sx={{
                            backgroundColor: '#f0f0f0',
                            '&:hover': { backgroundColor: '#ffebee' },
                            color: 'error.main',
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Paper>
      ) : (
        <Paper sx={{ p: 2, textAlign: 'center', mb: 2, backgroundColor: '#f5f5f5' }}>
          <Typography color="textSecondary">No comments yet. Be the first to comment!</Typography>
        </Paper>
      )}

      {/* Add Comment Form */}
      {issueId && <CreateCommentComponent issueId={issueId} />}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this comment? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleteComment.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteComment.isPending}
          >
            {deleteComment.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Comment Dialog */}
      {selectedComment && (
        <EditCommentComponent
          open={editDialogOpen}
          comment={selectedComment}
          onClose={() => {
            setEditDialogOpen(false);
            setSelectedComment(null);
          }}
        />
      )}
    </>
  );
}
