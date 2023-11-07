import { Box, styled } from '@mui/material';

interface StatusDotProps {
  status: string;
}

const resolveDotColor = (status: string) => {
  if (status === 'SUCCESS') {
    return 'success';
  }
  if (status === 'FAILED') {
    return 'error';
  }
  return 'info';
};
export const StatusDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status', // Prevent status prop from being forwarded to the DOM element
})<StatusDotProps>(({ theme, status }) => ({
  width: theme.spacing(1),
  height: theme.spacing(1),
  borderRadius: '50%',
  backgroundColor: theme.palette[resolveDotColor(status)].main, // Use the resolveDotColor function here
  display: 'inline-block',
}));
