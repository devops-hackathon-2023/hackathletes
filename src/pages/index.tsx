import { QueryClient, QueryClientProvider } from 'react-query';

import { Home } from './home';

const queryClient = new QueryClient();
export default function root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
