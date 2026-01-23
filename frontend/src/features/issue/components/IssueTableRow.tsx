/**
 * Issue Table Row Component
 * Displays a single issue row with modern card-like design
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
  const priorityColorMap: Record<string, 'error' | 'warning' | 'success'> = {
    high: 'error',
    medium: 'warning',
    low: 'success',
  };

 

  return (
    <TableRow
      sx={{
        backgroundColor: isSelected ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(33, 150, 243, 0.04)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        },
        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
        height: 72,
      }}
    >
      <TableCell sx={{ p: 1 }}>
        
      </TableCell>
      <TableCell sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1976d2' }}>
        {`#${(currentPage - 1) * pageSize + index + 1}`}
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
                sx={{
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  border: '1px solid rgba(25, 118, 210, 0.3)',
                  '& .MuiChip-label': {
                    padding: '4px 8px',
                  },
                }}
              />
            ))
          ) : (
            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
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
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          color: '#333',
          fontWeight: 500,
          transition: 'color 0.2s ease',
          '&:hover': { color: '#1976d2', textDecoration: 'underline' },
        }}
        onClick={() => onEdit(issue.issue_id)}
      >
        {issue.issue_details.substring(0, 50)}...
      </TableCell>
      <TableCell align="center" sx={{ fontSize: '0.875rem' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.5,
            py: 0.75,
            borderRadius: '8px',
            backgroundColor: `var(--status-bg-${issue.issue_status}, rgba(25, 118, 210, 0.08))`,
          }}
        >
          <Box sx={{ fontSize: '1rem' }}>{statusIcons[issue.issue_status]}</Box>
          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
            {statusLabels[issue.issue_status]}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="center" sx={{ fontSize: '0.875rem' }}>
        <Chip
          {...(priorityIcons[issue.issue_priority] && { icon: priorityIcons[issue.issue_priority] as any })}
          label={issue.issue_priority.charAt(0).toUpperCase() + issue.issue_priority.slice(1)}
          size="small"
          color={priorityColorMap[issue.issue_priority]}
          variant="outlined"
          sx={{
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
      </TableCell>
      <TableCell sx={{ fontSize: '0.875rem' }}>
        {issue.assigned_to ? (
          <Chip
            label={issue.assigned_to}
            size="small"
            variant="outlined"
            sx={{
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 500,
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              borderColor: 'rgba(25, 118, 210, 0.3)',
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          />
        ) : (
          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
            Unassigned
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        <IconButton
          size="small"
          onClick={(e) => onMenuOpen(e, issue.issue_id)}
          sx={{
            p: 0.5,
            color: '#666',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              color: '#1976d2',
            },
          }}
        >
          <MoreVertIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
