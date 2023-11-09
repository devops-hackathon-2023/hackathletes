import '../locales/i18n';
import { LocalizationProvider } from '@/locales';
import { loggedUserAtom } from '@/state/atoms';
import '@/styles/globals.css';
import ThemeProvider from '@/theme';
import { getItemFromSessionStorage } from '@/utils';
import { useAtom } from 'jotai';
import type { AppProps } from 'next/app';
import { useCallback, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const [, setLoggedUser] = useAtom(loggedUserAtom);

  const initialize = useCallback(() => {
    const savedUser = getItemFromSessionStorage('user');

    if (savedUser) {
      setLoggedUser(savedUser);
    }
  }, [setLoggedUser]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <LocalizationProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
