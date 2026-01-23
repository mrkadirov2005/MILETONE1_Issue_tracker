/**
 * Issue Table Body Component
 * Renders table body with all issue rows
 */

import { TableBody, TableRow, TableCell, Typography } from '@mui/material';
import type { Issue } from '../api/issueApi';
import IssueTableRow from './IssueTableRow';

interface IssueTableBodyProps {
  issues: Issue[];
  currentPage: number;
  pageSize: number;
  selectedRows: Set<string>;
  onRowSelect: (issueId: string) => void;
  onEdit: (issueId: string) => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, issueId: string) => void;
}

export default function IssueTableBody({
  issues,
  currentPage,
  pageSize,
  selectedRows,
  onRowSelect,
  onEdit,
  onMenuOpen,
}: IssueTableBodyProps) {
  if (issues.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={7} sx={{ textAlign: 'center', py: 3 }}>
            <Typography color="textSecondary">No issues found</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {issues.map((issue: Issue, index: number) => (
        <IssueTableRow
          key={issue.issue_id}
          issue={issue}
          index={index}
          currentPage={currentPage}
          pageSize={pageSize}
          isSelected={selectedRows.has(issue.issue_id)}
          onRowSelect={onRowSelect}
          onEdit={onEdit}
          onMenuOpen={onMenuOpen}
        />
      ))}
    </TableBody>
  );
}
