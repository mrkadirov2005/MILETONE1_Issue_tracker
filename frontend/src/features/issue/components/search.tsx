import { Paper, TextField, Stack, InputAdornment, MenuItem, Select, FormControl, InputLabel, Box, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useGetAllLabels } from '../services/labelHooks';

interface SearchComponentProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter?: string | null;
  setStatusFilter?: (value: string | null) => void;
  priorityFilter?: string | null;
  setPriorityFilter?: (value: string | null) => void;
  labelFilter?: string[];
  setLabelFilter?: (value: string[]) => void;
}

export default function SearchComponent({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  labelFilter = [],
  setLabelFilter,
}: SearchComponentProps) {
  // Get all available labels initially
  const { data: allLabelsData } = useGetAllLabels();
  const labels = allLabelsData?.data || [];

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.06)',
      }}
    >
      <Stack spacing={2.5}>
        {/* Search Box and Filter Row 1 */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
          {/* Search Box */}
          <TextField
            placeholder="🔍 Search issues..."
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#1976d2', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              minWidth: '200px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f5f7fa',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#f0f4f8',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                opacity: 0.6,
              },
            }}
          />

          {/* Status Filter */}
          {setStatusFilter && (
            <FormControl sx={{ minWidth: 140 }} size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter || ''}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value || null)}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#f5f7fa',
                  '&:hover': {
                    backgroundColor: '#f0f4f8',
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="todo">Todo</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          )}

          {/* Priority Filter */}
          {setPriorityFilter && (
            <FormControl sx={{ minWidth: 140 }} size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityFilter || ''}
                label="Priority"
                onChange={(e) => setPriorityFilter(e.target.value || null)}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#f5f7fa',
                  '&:hover': {
                    backgroundColor: '#f0f4f8',
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>

        {/* Labels Filter Row 2 */}
        {setLabelFilter && labels.length > 0 && (
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <InputLabel sx={{ fontSize: '0.8125rem', fontWeight: 600, mb: 0, color: '#1a1a1a' }}>
              Labels:
            </InputLabel>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {labels.map((label: any) => (
                <Button
                  key={label.label_id}
                  onClick={() => {
                    if (labelFilter.includes(label.label_id)) {
                      setLabelFilter(labelFilter.filter(id => id !== label.label_id));
                    } else {
                      setLabelFilter([...labelFilter, label.label_id]);
                    }
                  }}
                  variant={labelFilter.includes(label.label_id) ? 'contained' : 'outlined'}
                  color={labelFilter.includes(label.label_id) ? 'primary' : 'inherit'}
                  size="small"
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.8125rem',
                    px: 1.5,
                    transition: 'all 0.2s ease',
                    ...(labelFilter.includes(label.label_id)
                      ? {
                          backgroundColor: '#1976d2',
                          color: '#ffffff',
                          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
                        }
                      : {
                          borderColor: 'rgba(0, 0, 0, 0.12)',
                          color: '#666',
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.04)',
                            borderColor: '#1976d2',
                          },
                        }),
                  }}
                >
                  {label.label_name}
                </Button>
              ))}
            </Box>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
