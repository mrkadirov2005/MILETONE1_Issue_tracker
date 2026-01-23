import { Box, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';

interface IssueEditFormProps {
  formData: {
    issue_details: string;
    issue_status: 'todo' | 'in-progress' | 'done' | 'cancelled';
    issue_priority: 'low' | 'medium' | 'high';
  };
  errors: {
    issue_details: string;
  };
  isPending: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => void;
  onSelectChange: (e: any) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function IssueEditForm({
  formData,
  errors,
  isPending,
  onInputChange,
  onSelectChange,
  onCancel,
  onSave,
}: IssueEditFormProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        overflow: 'auto',
        backgroundColor: '#fafbfc',
      }}
    >
      <Stack spacing={2.5}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Issue Details"
          name="issue_details"
          value={formData.issue_details}
          onChange={onInputChange}
          error={!!errors.issue_details}
          helperText={errors.issue_details || `${formData.issue_details.length}/500`}
          disabled={isPending}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              },
              '&.Mui-focused': {
                boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
              },
            },
          }}
        />

        <FormControl fullWidth size="small" disabled={isPending}>
          <InputLabel>Status</InputLabel>
          <Select
            name="issue_status"
            value={formData.issue_status}
            onChange={onSelectChange}
            label="Status"
            sx={{
              borderRadius: '8px',
              backgroundColor: '#ffffff',
            }}
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small" disabled={isPending}>
          <InputLabel>Priority</InputLabel>
          <Select
            name="issue_priority"
            value={formData.issue_priority}
            onChange={onSelectChange}
            label="Priority"
            sx={{
              borderRadius: '8px',
              backgroundColor: '#ffffff',
            }}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            onClick={onCancel}
            disabled={isPending}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={onSave}
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={16} /> : undefined}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
            }}
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
