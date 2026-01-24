import { Box, Stack, Typography, Chip, Paper, Button, Card } from '@mui/material';
import IssueLabelComponent from './IssueLabel';

interface IssueDetailsSidebarProps {
  issue: {
    labels?: Array<{ label_id: string; label_name: string }>;
    issue_status: string;
    issue_priority: string;
    created_at: string;
    assigned_to?: string | null;
    issue_details: string;
  };
  showLabels: boolean;
  issueId: string;
  statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>;
  priorityColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>;
  onShowLabelsToggle: () => void;
}

export default function IssueDetailsSidebar({
  issue,
  showLabels,
  issueId,
  statusColors,
  priorityColors,
  onShowLabelsToggle,
}: IssueDetailsSidebarProps) {
  return (
    <Box
      sx={{
        width: 320,
        bgcolor: '#f5f7fa',
        borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
        p: 2.5,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 2.5,
          color: '#1a1a1a',
          fontSize: '0.9rem',
        }}
      >
        📋 Labels & Details
      </Typography>
      <Paper>
        {/* Issue Details Section */}
        <Box
          sx={{
            p: 2.5,
            mb: 2,
            bgcolor: 'white',
            borderRadius: '10px',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              display: 'block',
              mb: 1.5,
              color: '#1a1a1a',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Issue Details
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              color: '#333333',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {issue.issue_details || 'No details provided for this issue.'}
          </Typography>
        </Box>
      </Paper>

      {/* Labels Section */}
      <Paper
        sx={{
          p: 2.5,
          mb: 2,
          bgcolor: 'white',
          borderRadius: '10px',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        {/*view issue details here for the user to read it */}

       
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            display: 'block',
            mb: 1.5,
            color: '#1a1a1a',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Labels ({issue.labels?.length || 0})
        </Typography>
        {issue.labels && issue.labels.length > 0 ? (
          <Stack spacing={0.75}>
            {issue.labels.map((label) => (
              <Chip
                key={label.label_id}
                label={label.label_name}
                size="small"
                color="primary"
                variant="outlined"
                sx={{
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                }}
              />
            ))}
          </Stack>
        ) : (
          <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
            No labels assigned
          </Typography>
        )}
        <Button
          size="small"
          sx={{
            mt: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            color: '#1976d2',
            fontSize: '0.75rem',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
          }}
          onClick={onShowLabelsToggle}
        >
          {showLabels ? '✕ Close' : '+ Manage'}
        </Button>
      </Paper>

      {/* Labels Management Component */}
      {showLabels && <Box sx={{ mb: 2 }}><IssueLabelComponent issueId={issueId} issueLabels={issue?.labels} /></Box>}

      {/* Status & Priority Details */}
      <Paper
        sx={{
          p: 2.5,
          bgcolor: 'white',
          borderRadius: '10px',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            display: 'block',
            mb: 1.5,
            color: '#1a1a1a',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Status
        </Typography>
        <Box sx={{ mb: 2.5 }}>
          <Chip
            label={issue.issue_status.replace('-', ' ').toUpperCase()}
            color={statusColors[issue.issue_status]}
            variant="filled"
            sx={{
              width: '100%',
              fontWeight: 600,
              fontSize: '0.75rem',
              borderRadius: '8px',
            }}
          />
        </Box>

        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            display: 'block',
            mb: 1.5,
            color: '#1a1a1a',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Priority
        </Typography>
        <Chip
          label={`${issue.issue_priority.toUpperCase()} Priority`}
          color={priorityColors[issue.issue_priority]}
          variant="filled"
          sx={{
            width: '100%',
            fontWeight: 600,
            fontSize: '0.75rem',
            borderRadius: '8px',
          }}
        />
      </Paper>

      {/* Created Info */}
      <Paper
        sx={{
          p: 2.5,
          mt: 2,
          bgcolor: 'white',
          borderRadius: '10px',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            display: 'block',
            mb: 1,
            color: '#1a1a1a',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Created
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {new Date(issue.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>

        {issue.assigned_to && (
          <>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                display: 'block',
                mt: 2,
                mb: 1,
                color: '#1a1a1a',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Assigned To
            </Typography>
            <Chip
              label={issue.assigned_to}
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 600,
                fontSize: '0.75rem',
                borderRadius: '8px',
              }}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}
