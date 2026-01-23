import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';

interface IssueDetailHeaderProps {
  issueId: string;
  createdBy: string;
  isEditMode: boolean;
  onEditToggle: () => void;
  onClose: () => void;
}

export default function IssueDetailHeader({
  issueId,
  createdBy,
  isEditMode,
  onEditToggle,
  onClose,
}: IssueDetailHeaderProps) {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8f0f8 100%)',
        color: '#1a1a1a',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(25, 118, 210, 0.1)',
      }}
    >
      <Toolbar sx={{ py: 1.5 }}>
        <Avatar
          sx={{
            mr: 2,
            width: 44,
            height: 44,
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            fontWeight: 700,
            fontSize: '1.2rem',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
          }}
        >
          {createdBy.substring(0, 1).toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: '#1a1a1a',
              fontSize: '1.1rem',
            }}
          >
            Issue #{issueId.substring(0, 8)}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            📧 {createdBy}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={onEditToggle}
          title={isEditMode ? 'Cancel Edit' : 'Edit'}
          sx={{
            mr: 1,
            color: '#1976d2',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
            },
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            color: '#666',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              color: '#1976d2',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
