import { Theme } from '@mui/material/styles';

const textField = (theme: Theme) => ({
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        '&.Mui-focused': {
          color: theme.palette.primary.main,
        },
      },
    },
  },
});

export default textField;
