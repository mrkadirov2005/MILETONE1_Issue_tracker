/**
 * Main Issue List Component
 * Container component for managing issues with filtering and pagination
 */

import { useState, useEffect } from 'react';
import { TableContainer, Paper, Box, CircularProgress, Typography } from '@mui/material';
import { Table } from '@mui/material';
import { useGetAllIssues, useDeleteIssue } from '../services/issueHooks';
import type { Issue } from '../api/issueApi';
import SearchComponent from './searchComponent';
import IssueDetailComponent from './IssueDetailComponent';
import IssueTableHeader from './IssueTableHeader';
import IssueTableBody from './IssueTableBody';
import IssueActionsMenu from './IssueActionsMenu';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import PaginationControls from './PaginationControls';

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
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: issuesData, isLoading, isError, error } = useGetAllIssues({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearchTerm || undefined,
    status: statusFilter || undefined,
    priority: priorityFilter || undefined,
    label: labelFilter && labelFilter.length > 0 ? labelFilter[0] : undefined,
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

  const handleCloseDetail = () => {
    setDetailDialogOpen(false);
    setSelectedIssueId(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

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
        <SearchComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          labelFilter={labelFilter}
          setLabelFilter={setLabelFilter}
        />
        <Typography color="textSecondary">
          No issues found. Create your first issue to get started!
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <SearchComponent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        labelFilter={labelFilter}
        setLabelFilter={setLabelFilter}
      />
      <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
        <Table>
          <IssueTableHeader
            selectedRowsCount={selectedRows.size}
            totalIssues={issues.length}
            onSelectAll={handleSelectAll}
          />
          <IssueTableBody
            issues={issues}
            currentPage={currentPage}
            pageSize={pageSize}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onEdit={handleEditClick}
            onMenuOpen={handleMenuOpen}
          />
        </Table>
      </TableContainer>

      <PaginationControls
        currentPage={currentPage}
        pageSize={pageSize}
        totalIssues={issuesData?.meta?.total || 0}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      <IssueActionsMenu
        anchorEl={anchorEl}
        selectedIssueId={selectedForMenu}
        issues={issues}
        onMenuClose={handleMenuClose}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        isDeleting={deleteIssueMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setSelectedIssueId(null);
        }}
      />

      <IssueDetailComponent
        open={detailDialogOpen}
        issueId={selectedIssueId}
        onClose={handleCloseDetail}
      />
    </>
  );
}
