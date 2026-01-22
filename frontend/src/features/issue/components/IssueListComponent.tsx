/**
 * Issue List Component
 * Displays all issues in a professional table format with search and filters
 */

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  CircularProgress,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, MoreVert as MoreVertIcon, ArrowUpward as ArrowUpIcon, ArrowDownward as ArrowDownIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useGetAllIssues, useDeleteIssue } from '../services/issueHooks';
import type { Issue } from '../api/issueApi';
import IssueDetailComponent from './IssueDetailComponent';

import SearchComponent from './searchComponent';

const statusIcons: Record<string, string> = {
  todo: '○',
  'in-progress': '◐',
  done: '●',
  cancelled: '⊘',
};

const priorityIcons: Record<string, React.ReactNode> = {
  low: <ArrowDownIcon sx={{ fontSize: 16 }} />,
  medium: <Box sx={{ fontSize: 16, fontWeight: 'bold' }}>→</Box>,
  high: <ArrowUpIcon sx={{ fontSize: 16 }} />,
};

const statusLabels: Record<string, string> = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  done: 'Done',
  cancelled: 'Cancelled',
};

export default function IssueListComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [labelFilter, setLabelFilter] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedForMenu, setSelectedForMenu] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Single endpoint for all filtering - use /issue/all with optional label parameter
  const { data: issuesData, isLoading, isError, error } = useGetAllIssues({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearchTerm || undefined,
    status: statusFilter || undefined,
    priority: priorityFilter || undefined,
    label: labelFilter && labelFilter.length > 0 ? labelFilter[0] : undefined, // Use first label ID if any selected
  });

  const deleteIssueMutation = useDeleteIssue();

  const handleDeleteClick = (issue: Issue) => {
    setSelectedIssueId(issue.issue_id);
    setSelectedIssue(issue);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (issueId: string) => {
    setSelectedIssueId(issueId);
    setDetailDialogOpen(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, issueId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedForMenu(issueId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedForMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedIssueId && selectedIssue) {
      await deleteIssueMutation.mutateAsync({ issueId: selectedIssueId, issue: selectedIssue });
      setDeleteDialogOpen(false);
      setSelectedIssueId(null);
      setSelectedIssue(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedIssueId(null);
  };

  const handleCloseDetail = () => {
    setDetailDialogOpen(false);
    setSelectedIssueId(null);
  };

  const handleRowSelect = (issueId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(issueId)) {
      newSelected.delete(issueId);
    } else {
      newSelected.add(issueId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === issues.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(issues.map((issue: Issue) => issue.issue_id)));
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }



// search paper


  if (isError) {
    return (
      <Paper sx={{ p: 3, backgroundColor: '#ffebee' }}>
        <Typography color="error">
          Error loading issues: {error instanceof Error ? error.message : 'Unknown error'}
        </Typography>
      </Paper>
    );
  }

  const issues = issuesData?.data || [];

  if (issues.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
       <SearchComponent  searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} labelFilter={labelFilter} setLabelFilter={setLabelFilter} />
        <Typography color="textSecondary">
          No issues found. Create your first issue to get started!
        </Typography>
      </Paper>
    );
  }




  return (
    <>
      {/* Filter and Search Bar */}
     <SearchComponent  searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} labelFilter={labelFilter} setLabelFilter={setLabelFilter}  />
      {/* Issues Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
              <TableCell sx={{ width: 40, p: 1 }}>
                <Checkbox
                  size="small"
                  checked={selectedRows.size === issues.length && issues.length > 0}
                  onChange={handleSelectAll}
                />
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
          <TableBody>
            {issues.length > 0 ? (
              issues.map((issue: Issue, index: number) => (
                <TableRow
                  key={issue.issue_id}
                  sx={{
                    backgroundColor: selectedRows.has(issue.issue_id) ? '#f0f7ff' : 'transparent',
                    '&:hover': { backgroundColor: '#fafafa' },
                    borderBottom: '1px solid #e0e0e0',
                  }}
                >
                  <TableCell sx={{ p: 1 }}>
                    <Checkbox
                      size="small"
                      checked={selectedRows.has(issue.issue_id)}
                      onChange={() => handleRowSelect(issue.issue_id)}
                    />
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
                    onClick={() => handleEditClick(issue.issue_id)}
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
                      onClick={(e) => handleMenuOpen(e, issue.issue_id)}
                      sx={{ p: 0.5 }}
                    >
                      <MoreVertIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3 }}>
                  <Typography color="textSecondary">No issues found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Paper sx={{ p: 2, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="textSecondary">
            Page {currentPage} of {Math.ceil((issuesData?.meta?.total || 0) / pageSize)} | Total: {issuesData?.meta?.total || 0} issues
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              sx={{ textTransform: 'none' }}
            >
              ← Previous
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage >= Math.ceil((issuesData?.meta?.total || 0) / pageSize)}
              onClick={() => setCurrentPage(currentPage + 1)}
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
              setPageSize(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
            min={20}
          />
        </Stack>
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            if (selectedForMenu) handleEditClick(selectedForMenu);
            handleMenuClose();
          }}
        >
          <EditIcon sx={{ mr: 1, fontSize: 18 }} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedForMenu) {
              const issue = issues.find((i) => i.issue_id === selectedForMenu);
              if (issue) handleDeleteClick(issue);
            }
            handleMenuClose();
          }}
          sx={{ color: '#d32f2f' }}
        >
          <DeleteIcon sx={{ mr: 1, fontSize: 18 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this issue? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={deleteIssueMutation.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteIssueMutation.isPending}
          >
            {deleteIssueMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Issue Detail Dialog */}
      <IssueDetailComponent open={detailDialogOpen} issueId={selectedIssueId} onClose={handleCloseDetail} />
    </>
  );
}
