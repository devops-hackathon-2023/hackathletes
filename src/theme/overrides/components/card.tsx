import { Theme } from '@mui/material/styles';

export const card = (theme: Theme) => ({
  MuiCard: {
    styleOverrides: {
      root: {
        position: 'relative' as const,
        borderRadius: theme.shape.borderRadius * 2,
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: theme.spacing(3, 3, 0),
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: theme.spacing(3),
      },
    },
  },
});
