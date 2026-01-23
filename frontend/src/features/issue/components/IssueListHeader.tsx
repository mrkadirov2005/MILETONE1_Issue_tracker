/**
 * Issue List Header Constants
 * Reusable status and priority icons/labels
 */

import { Box } from '@mui/material';
import { ArrowUpward as ArrowUpIcon, ArrowDownward as ArrowDownIcon } from '@mui/icons-material';

export const statusIcons: Record<string, string> = {
  todo: '○',
  'in-progress': '◐',
  done: '●',
  cancelled: '⊘',
};

export const priorityIcons: Record<string, React.ReactNode> = {
  low: <ArrowDownIcon sx={{ fontSize: 16 }} />,
  medium: <Box sx={{ fontSize: 16, fontWeight: 'bold' }}>→</Box>,
  high: <ArrowUpIcon sx={{ fontSize: 16 }} />,
};

export const statusLabels: Record<string, string> = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  done: 'Done',
  cancelled: 'Cancelled',
};
