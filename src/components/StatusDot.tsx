import { Box, styled } from '@mui/material';
import { resolveStatusColor } from '@/utils';

interface StatusDotProps {
  status: string;
}

export const StatusDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status', // Prevent status prop from being forwarded to the DOM element
})<StatusDotProps>(({ theme, status }) => ({
  width: theme.spacing(1),
  height: theme.spacing(1),
  borderRadius: '50%',
  backgroundColor: theme.palette[resolveStatusColor(status)].main, // Use the resolveDotColor function here
  display: 'inline-block',
}));
