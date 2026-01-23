/**
 * Issue Table Row Component
 * Displays a single issue row with all details
 */

import {
  TableRow,
  TableCell,
  Stack,
  Typography,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import type { Issue } from '../api/issueApi';
import { statusIcons, statusLabels, priorityIcons } from './IssueListHeader';

interface IssueTableRowProps {
  issue: Issue;
  index: number;
  currentPage: number;
  pageSize: number;
  isSelected: boolean;
  onRowSelect: (issueId: string) => void;
  onEdit: (issueId: string) => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, issueId: string) => void;
}

export default function IssueTableRow({
  issue,
  index,
  currentPage,
  pageSize,
  isSelected,
  onEdit,
  onMenuOpen,
}: IssueTableRowProps) {
  return (
    <TableRow
      sx={{
        backgroundColor: isSelected ? '#f0f7ff' : 'transparent',
        '&:hover': { backgroundColor: '#fafafa' },
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <TableCell sx={{ p: 1 }}>
        
      </TableCell>
      <TableCell sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#666' }}>
        {`ISSUE-${(currentPage - 1) * pageSize + index + 1}`}
      </TableCell>
      <TableCell sx={{ fontSize: '0.875rem' }}>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {issue.labels && issue.labels.length > 0 ? (
            issue.labels.map(label => (
              <Chip
                key={label.label_id}
                label={label.label_name}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))
          ) : (
            <Typography variant="caption" color="textSecondary">
              No labels
            </Typography>
          )}
        </Stack>
      </TableCell>
      <TableCell
        sx={{
          fontSize: '0.875rem',
          maxWidth: 400,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          cursor: 'pointer',
          '&:hover': { color: '#2196f3' },
        }}
        onClick={() => onEdit(issue.issue_id)}
      >
        {issue.issue_details}
      </TableCell>
      <TableCell align="center" sx={{ fontSize: '0.875rem' }}>
        <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
          <Box sx={{ fontSize: '1.2rem' }}>{statusIcons[issue.issue_status]}</Box>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {statusLabels[issue.issue_status]}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="center" sx={{ fontSize: '0.875rem' }}>
        <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
          {priorityIcons[issue.issue_priority]}
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {issue.issue_priority.charAt(0).toUpperCase() + issue.issue_priority.slice(1)}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="small"
          onClick={(e) => onMenuOpen(e, issue.issue_id)}
          sx={{ p: 0.5 }}
        >
          <MoreVertIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
