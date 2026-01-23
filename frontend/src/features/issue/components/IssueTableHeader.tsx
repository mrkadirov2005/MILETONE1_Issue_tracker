/**
 * Table Header Component
 * Displays column headers 
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
      <TableRow sx={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
        <TableCell sx={{ width: 40, p: 1 }}>
          
        </TableCell>
        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Task</TableCell>
        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Labels</TableCell>
        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Title</TableCell>
        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">
          Status
        </TableCell>
        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem' }} align="center">
          Priority
        </TableCell>
        <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', width: 50 }} align="center">
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
