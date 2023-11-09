import { Stack } from '@mui/material';
import { AppBar } from './AppBar';
import { AuthGuard } from '../auth/AuthGuard';

const MainPageLayout = ({ children }: any) => (
  <AuthGuard>
    <AppBar />
    <Stack paddingX={{ xs: 5, md: 8 }} spacing={2} paddingTop={2} paddingBottom={5}>
      {children}
    </Stack>
  </AuthGuard>
);
export default MainPageLayout;
