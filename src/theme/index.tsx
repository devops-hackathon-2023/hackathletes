import { useMemo, PropsWithChildren } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useLocales } from '@/locales';
import { palette } from './palette';
import { typography } from './typography';
import { componentsOverrides } from './overrides';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { currentLang } = useLocales();

  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      typography,
      shape: { borderRadius: 10 },
    }),
    []
  );

  const theme = createTheme(baseOption);

  theme.components = componentsOverrides(theme);

  const themeWithLocale = useMemo(() => createTheme(theme, currentLang.systemValue), [currentLang.systemValue, theme]);

  return <MuiThemeProvider theme={themeWithLocale}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
