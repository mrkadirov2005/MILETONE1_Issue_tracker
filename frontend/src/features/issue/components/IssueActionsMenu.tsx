/**
 * Issue Actions Menu Component
 * Context menu for edit and delete actions
 */

import { Menu, MenuItem } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Issue } from '../api/issueApi';

interface IssueActionsMenuProps {
  anchorEl: HTMLElement | null;
  selectedIssueId: string | null;
  issues: Issue[];
  onMenuClose: () => void;
  onEdit: (issueId: string) => void;
  onDelete: (issue: Issue) => void;
}

export default function IssueActionsMenu({
  anchorEl,
  selectedIssueId,
  issues,
  onMenuClose,
  onEdit,
  onDelete,
}: IssueActionsMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={onMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem
        onClick={() => {
          if (selectedIssueId) onEdit(selectedIssueId);
          onMenuClose();
        }}
      >
        <EditIcon sx={{ mr: 1, fontSize: 18 }} /> Edit
      </MenuItem>
      <MenuItem
        onClick={() => {
          if (selectedIssueId) {
            const issue = issues.find((i) => i.issue_id === selectedIssueId);
            if (issue) onDelete(issue);
          }
          onMenuClose();
        }}
        sx={{ color: '#d32f2f' }}
      >
        <DeleteIcon sx={{ mr: 1, fontSize: 18 }} /> Delete
      </MenuItem>
    </Menu>
  );
}
