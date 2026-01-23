/**
 * Dashboard Page
 * Protected route - only accessible after successful authentication
 */

import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Paper,
  Fab,
} from '@mui/material';
import { Logout as LogOutIcon, Dashboard as DashboardIcon, Add as AddIcon, Label as LabelIcon } from '@mui/icons-material';
import { useLogout } from '../../auth/hooks/authHooks';
import { getUserEmail } from '../../auth/api/authApi';
import { useNavigate } from 'react-router-dom';
import CreateIssueComponent from '../components/CreateIssue';
import IssueListComponent from '../components/IssueList';

export default function DashboardPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const logoutMutation = useLogout();
  const userEmail = getUserEmail();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  const handleManageLabels = () => {
    navigate('/labels');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#fafafa', overflow: 'hidden',width:'100vw' }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ boxShadow: 2 }}>
        <Toolbar>
          <DashboardIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Issue Tracker Dashboard
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" sx={{ minWidth: '150px', textAlign: 'right' }}>
              {userEmail}
            </Typography>
            <Button
              color="inherit"
              startIcon={<LabelIcon />}
              onClick={handleManageLabels}
              sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
            >
              Labels
            </Button>
            <Button
              color="inherit"
              startIcon={<LogOutIcon />}
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
            >
              {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content - Full Screen */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {/* Header Section */}
      

        {/* Issues Table Section */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 4, height: 4, backgroundColor: '#2196f3', borderRadius: '50%', mr: 1 }} />
            All Issues
          </Typography>
          <Paper sx={{ boxShadow: 1, overflow: 'auto' }}>
            <IssueListComponent />
          </Paper>
        </Box>
      </Box>

      {/* Floating Action Button for Create Issue */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenCreateDialog}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#4caf50',
          '&:hover': { backgroundColor: '#45a049' },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Create Issue Dialog */}
      <CreateIssueComponent open={createDialogOpen} onClose={handleCloseCreateDialog} />
    </Box>
  );
}
