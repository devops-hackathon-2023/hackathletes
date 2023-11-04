import '../locales/i18n';
import { LocalizationProvider } from '@/locales';
import '@/styles/globals.css';
import ThemeProvider from '@/theme';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />)
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
