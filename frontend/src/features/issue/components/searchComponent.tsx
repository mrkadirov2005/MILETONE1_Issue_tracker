import React from 'react';
import { Paper, TextField, Stack, InputAdornment, MenuItem, Select, FormControl, InputLabel, Box, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useGetAllLabels } from '../services/labelHooks';

interface SearchComponentProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  statusFilter?: string | null;
  setStatusFilter?: React.Dispatch<React.SetStateAction<string | null>>;
  priorityFilter?: string | null;
  setPriorityFilter?: React.Dispatch<React.SetStateAction<string | null>>;
  labelFilter?: string[];
  setLabelFilter?: React.Dispatch<React.SetStateAction<string[]>>;
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
    <Paper sx={{ p: 2, mb: 2, backgroundColor: '#ffffff' }}>
      <Stack spacing={2}>
        {/* Search Box and Filter Row 1 */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
          {/* Search Box */}
          <TextField
            placeholder="Filter tasks..."
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#999' }} />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, minWidth: '200px' }}
          />

          {/* Status Filter */}
          {setStatusFilter && (
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter || ''}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value || null)}
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
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityFilter || ''}
                label="Priority"
                onChange={(e) => setPriorityFilter(e.target.value || null)}
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
            <InputLabel sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 0 }}>Labels:</InputLabel>
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
