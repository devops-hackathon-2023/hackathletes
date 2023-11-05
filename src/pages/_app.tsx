import '../locales/i18n';
import { LocalizationProvider } from '@/locales';
import '@/styles/globals.css';
import ThemeProvider from '@/theme';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
  <LocalizationProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  </LocalizationProvider>
);

export default App;
