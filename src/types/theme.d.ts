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
      primary: PaletteColorOptions;
      common: {
        white: string;
        black: string;
      };
      grey: {
        600: string;
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
