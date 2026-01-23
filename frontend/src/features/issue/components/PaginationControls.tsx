/**
 * Pagination Controls Component
 * Handles pagination and items per page selection
 */

import { Paper, Stack, Typography, Button } from '@mui/material';

interface PaginationControlsProps {
  currentPage: number;
  pageSize: number;
  totalIssues: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function PaginationControls({
  currentPage,
  pageSize,
  totalIssues,
  onPageChange,
  onPageSizeChange,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(totalIssues / pageSize);

  return (
    <Paper sx={{ p: 2, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" color="textSecondary">
          Page {currentPage} of {totalPages} | Total: {totalIssues} issues
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            sx={{ textTransform: 'none' }}
          >
            ← Previous
          </Button>
          <Button
            variant="outlined"
            size="small"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            sx={{ textTransform: 'none' }}
          >
            Next →
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2" color="textSecondary">Items per page:</Typography>
        <input
          type="number"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(parseInt(e.target.value, 10));
          }}
          min={10}
          style={{ width: 60, padding: '4px 8px' }}
        />
      </Stack>
    </Paper>
  );
}
