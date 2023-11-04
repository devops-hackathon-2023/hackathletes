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
    };
  }
}
