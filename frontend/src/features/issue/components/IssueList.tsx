/**
 * Main Issue List Component
 * Container component for managing issues with filtering and pagination
 */

import { useState, useEffect } from 'react';
import { TableContainer, Paper, Box, CircularProgress, Typography } from '@mui/material';
import { Table } from '@mui/material';
import { useGetAllIssues, useDeleteIssue } from '../services/issueHooks';
import type { Issue } from '../api/issueApi';
import SearchComponent from './search';
import IssueDetailComponent from './IssueDetail';
import IssueTableHeader from './IssueTableHeader';
import IssueTableBody from './IssueTableBody';
import IssueActionsMenu from './IssueActionsMenu';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import PaginationControls from './PaginationControls';

export default function IssueListComponent() {
  // Organized state management
  const [filters, setFilters] = useState({
    search: '',
    debouncedSearch: '',
    status: null as string | null,
    priority: null as string | null,
    labels: [] as string[],
  });

  const [dialogs, setDialogs] = useState({
    deleteOpen: false,
    detailOpen: false,
    menuAnchor: null as null | HTMLElement,
  });

  const [selection, setSelection] = useState({
    issueId: null as string | null,
    issue: null as Issue | null,
    forMenu: null as string | null,
    rows: new Set<string>(),
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
  });

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({...prev, debouncedSearch: prev.search}));
      setPagination(prev => ({...prev, currentPage: 1}));
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const { data: issuesData, isLoading, isError, error } = useGetAllIssues({
    page: pagination.currentPage,
    limit: pagination.pageSize,
    search: filters.debouncedSearch || undefined,
    status: filters.status || undefined,
    priority: filters.priority || undefined,
    label: filters.labels && filters.labels.length > 0 ? filters.labels[0] : undefined,
  });

  const deleteIssueMutation = useDeleteIssue();

  const handleDeleteClick = (issue: Issue) => {
    setSelection(prev => ({
      ...prev,
      issueId: issue.issue_id,
      issue: issue,
    }));
    setDialogs(prev => ({...prev, deleteOpen: true}));
  };

  const handleEditClick = (issueId: string) => {
    setSelection(prev => ({...prev, issueId}));
    setDialogs(prev => ({...prev, detailOpen: true}));
  };  

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, issueId: string) => {
    setDialogs(prev => ({...prev, menuAnchor: event.currentTarget}));
    setSelection(prev => ({...prev, forMenu: issueId}));
  };

  const handleMenuClose = () => {
    setDialogs(prev => ({...prev, menuAnchor: null}));
    setSelection(prev => ({...prev, forMenu: null}));
  };

  const handleConfirmDelete = async () => {
    if (selection.issueId && selection.issue) {
      await deleteIssueMutation.mutateAsync({ issueId: selection.issueId, issue: selection.issue });
      setDialogs(prev => ({...prev, deleteOpen: false}));
      setSelection(prev => ({
        ...prev,
        issueId: null,
        issue: null,
      }));
    }
  };

  const handleRowSelect = (issueId: string) => {
    const newSelected = new Set(selection.rows);
    if (newSelected.has(issueId)) {
      newSelected.delete(issueId);
    } else {
      newSelected.add(issueId);
    }
    setSelection(prev => ({...prev, rows: newSelected}));
  };

  const handleSelectAll = () => {
    if (selection.rows.size === issues.length) {
      setSelection(prev => ({...prev, rows: new Set()}));
    } else {
      setSelection(prev => ({...prev, rows: new Set(issues.map((issue: Issue) => issue.issue_id))}));
    }
  };

  const handleCloseDetail = () => {
    setDialogs(prev => ({...prev, detailOpen: false}));
    setSelection(prev => ({...prev, issueId: null}));
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
          searchTerm={filters.search}
          setSearchTerm={(value: string) => setFilters(prev => ({...prev, search: value}))}
          statusFilter={filters.status}
          setStatusFilter={(value: string | null) => setFilters(prev => ({...prev, status: value}))}
          priorityFilter={filters.priority}
          setPriorityFilter={(value: string | null) => setFilters(prev => ({...prev, priority: value}))}
          labelFilter={filters.labels}
          setLabelFilter={(value: string[]) => setFilters(prev => ({...prev, labels: value}))}
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
        searchTerm={filters.search}
        setSearchTerm={(value: string) => setFilters(prev => ({...prev, search: value}))}
        statusFilter={filters.status}
        setStatusFilter={(value: string | null) => setFilters(prev => ({...prev, status: value}))}
        priorityFilter={filters.priority}
        setPriorityFilter={(value: string | null) => setFilters(prev => ({...prev, priority: value}))}
        labelFilter={filters.labels}
        setLabelFilter={(value: string[]) => setFilters(prev => ({...prev, labels: value}))}
      />
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <Table>
          <IssueTableHeader
            selectedRowsCount={selection.rows.size}
            totalIssues={issues.length}
            onSelectAll={handleSelectAll}
          />
          <IssueTableBody
            issues={issues}
            currentPage={pagination.currentPage}
            pageSize={pagination.pageSize}
            selectedRows={selection.rows}
            onRowSelect={handleRowSelect}
            onEdit={handleEditClick}
            onMenuOpen={handleMenuOpen}
          />
        </Table>
      </TableContainer>

      <PaginationControls
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        totalIssues={issuesData?.meta?.total || 0}
        onPageChange={(page) => setPagination(prev => ({...prev, currentPage: page}))}
        onPageSizeChange={(size) => {
          setPagination(prev => ({...prev, pageSize: size, currentPage: 1}));
        }}
      />

      <IssueActionsMenu
        anchorEl={dialogs.menuAnchor}
        selectedIssueId={selection.forMenu}
        issues={issues}
        onMenuClose={handleMenuClose}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmDialog
        open={dialogs.deleteOpen}
        isDeleting={deleteIssueMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDialogs(prev => ({...prev, deleteOpen: false}));
          setSelection(prev => ({...prev, issueId: null}));
        }}
      />

      <IssueDetailComponent
        open={dialogs.detailOpen}
        issueId={selection.issueId}
        onClose={handleCloseDetail}
      />
    </>
  );
}
