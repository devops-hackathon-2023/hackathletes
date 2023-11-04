import { alpha } from '@mui/material/styles';

// Example of palette
// TODO: customize
const GREY = {
  0: '#ffffff',
  100: '#f7f9fc',
  200: '#edf1f7',
  300: '#dfe3e8',
  400: '#c5c9cc',
  500: '#afb3b9',
  600: '#909499',
  700: '#72767d',
  800: '#4d5358',
  900: '#343a40',
};

const SECONDARY = {
  lighter: '#e8f0fe',
  light: '#9bb4ff',
  main: '#1e88e5',
  dark: '#0f5bd8',
  darker: '#0a48b5',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#e8f4fd',
  light: '#a7d4fe',
  main: '#29b6f6',
  dark: '#039be5',
  darker: '#0277bd',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#e9f8f2',
  light: '#a6e4c8',
  main: '#66bb6a',
  dark: '#388e3c',
  darker: '#2e7d32',
  contrastText: '#fff',
};

const WARNING = {
  lighter: '#fff8e1',
  light: '#ffecb3',
  main: '#ffc107',
  dark: '#ffa000',
  darker: '#ff8f00',
  contrastText: 'rgba(0, 0, 0, 0.87)',
};

const ERROR = {
  lighter: '#ffebee',
  light: '#ffcdd2',
  main: '#f44336',
  dark: '#d32f2f',
  darker: '#b71c1c',
  contrastText: '#fff',
};

const PRIMARY = {
  lighter: '#e1f5fe',
  light: '#03a9f4',
  main: '#0288d1',
  dark: '#01579b',
  darker: '#01579b',
  contrastText: '#fff',
};

const COMMON = {
  common: {
    black: '#000',
    white: '#fff',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  action: {
    hover: alpha(GREY[600], 0.08),
  },
};

/**
 * Modifies palette for MUI theme.
 *
 * @param {string} mode - light (default), dark
 * @returns palette with preferred mode
 */
export function palette(mode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: '#000000',
      secondary: '#5f6368',
      disabled: '#80868b',
    },
    background: {
      paper: '#ffffff',
      default: '#f1f3f4',
      neutral: '#f1f3f4',
    },
    action: {
      active: '#000000',
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#ffffff',
      secondary: '#8e8e8e',
      disabled: '#8e8e8e',
    },
    background: {
      paper: '#424242',
      default: '#121212',
      neutral: '#121212',
    },
    action: {
      active: '#ffffff',
    },
  };

  return mode === 'light' ? light : dark;
}
