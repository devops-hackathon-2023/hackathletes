import { Theme } from '@mui/material/styles';

export function listItemButton(theme: Theme) {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  };
}
