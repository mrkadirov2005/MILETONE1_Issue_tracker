/**
 * Label Management Page
 * Displays all labels with create, edit, and delete functionality
 */

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LabelListComponent from '../components/LabelListComponent';

export default function LabelManagementPage() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#fafafa' }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ boxShadow: 2 }}>
        <Toolbar>
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Label Management
          </Typography>
        </Toolbar>
        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Tab label="All Labels" />
        </Tabs>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Paper sx={{ p: 3, boxShadow: 1 }}>
          <LabelListComponent />
        </Paper>
      </Box>
    </Box>
  );
}
