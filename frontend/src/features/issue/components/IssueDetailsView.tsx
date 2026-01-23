import { Box, Stack, Typography, Chip } from '@mui/material';

interface IssueDetailsViewProps {
  details: string;
  status: string;
  priority: string;
  createdDate: string;
  assignedTo?: string;
  statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>;
  priorityColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>;
}

export default function IssueDetailsView({
  details,
  status,
  priority,
  createdDate,
  assignedTo,
  statusColors,
  priorityColors,
}: IssueDetailsViewProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        overflow: 'auto',
        backgroundColor: '#fafbfc',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          color: '#1a1a1a',
          fontWeight: 500,
        }}
      >
        {details}
      </Typography>

      {/* Status and Priority Badges */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip
          label={status.replace('-', ' ').toUpperCase()}
          color={statusColors[status]}
          size="small"
          variant="filled"
          sx={{
            fontWeight: 600,
            fontSize: '0.75rem',
            borderRadius: '8px',
          }}
        />
        <Chip
          label={`${priority.toUpperCase()} Priority`}
          color={priorityColors[priority]}
          size="small"
          variant="filled"
          sx={{
            fontWeight: 600,
            fontSize: '0.75rem',
            borderRadius: '8px',
          }}
        />
      </Stack>

      {/* Metadata */}
      <Stack spacing={0.5} direction="row" sx={{ fontSize: '0.75rem', color: '#999', fontWeight: 500 }}>
        <Typography variant="caption">
          📅 Created: {new Date(createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Typography>
        {assignedTo && (
          <Typography variant="caption">
            👤 Assigned to: {assignedTo.substring(0, 8)}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
