import { Theme } from '@mui/material/styles';

export const listItemButton = (theme: Theme) => ({
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
      },
    },
  },
});
