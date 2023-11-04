import { useMemo, PropsWithChildren } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { componentsOverrides } from './overrides';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      typography,
      shape: { borderRadius: 10 },
    }),
    []
  );

  const theme = createTheme(baseOption as ThemeOptions);

  theme.components = componentsOverrides(theme);

  // TODO: Uncomment after localization implementation and replace theme with themeWithLocale
  // const themeWithLocale = useMemo(() => createTheme(theme, currentLang.systemValue), [currentLang.systemValue, theme]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
