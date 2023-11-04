import { useMemo, PropsWithChildren } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { componentsOverrides } from './overrides';
import { useLocales } from '@/locales';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { currentLang } = useLocales();

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

  const themeWithLocale = useMemo(() => createTheme(theme, currentLang.systemValue), [currentLang.systemValue, theme]);

  return <MuiThemeProvider theme={themeWithLocale}>{children}</MuiThemeProvider>;
}
