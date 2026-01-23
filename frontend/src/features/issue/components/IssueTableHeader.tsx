/**
 * Table Header Component
 * Displays column headers with modern styling
 */

import { TableHead, TableRow, TableCell } from '@mui/material';

interface IssueTableHeaderProps {
  selectedRowsCount: number;
  totalIssues: number;
  onSelectAll: () => void;
}

export default function IssueTableHeader({
}: IssueTableHeaderProps) {
  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: 'linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%)',
          borderBottom: '2px solid rgba(0, 0, 0, 0.08)',
          height: 56,
        }}
      >
        <TableCell sx={{ width: 40, p: 1 }}>
          
        </TableCell>
        <TableCell
          sx={{
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Task
        </TableCell>
        <TableCell
          sx={{
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Labels
        </TableCell>
        <TableCell
          sx={{
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Title
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Status
        </TableCell>
        <TableCell
          align="center"
          sx={{
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Priority
        </TableCell>
        <TableCell
          sx={{
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Assignee
        </TableCell>
        <TableCell
          sx={{
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: '#1a1a1a',
            width: 50,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
          align="center"
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
