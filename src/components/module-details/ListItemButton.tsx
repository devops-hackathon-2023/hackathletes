import { styled, ListItemButton as MuiListItemButton } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const ListItemButton = styled(MuiListItemButton)(({ theme }: { theme: Theme }) => ({
  margin: '0.5rem',
  width: 'calc(100% - 1rem)',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.darker,
    '&:hover': {
      backgroundColor: theme.palette.primary.darker,
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
}));
