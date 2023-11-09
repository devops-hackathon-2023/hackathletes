// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColorOptions {
    darker?: string;
    lighter?: string;
    dark?: string;
    light?: string;
    main?: string;
  }

  interface Theme {
    palette: {
      primary: PaletteColorOptions & {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
      };
      common: {
        white: string;
        black: string;
      };
      grey: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
      };
      success: {
        main: string;
      };
      error: {
        main: string;
      };
      warning: {
        main: string;
      };
      info: {
        main: string;
      };
    };
  }
}
