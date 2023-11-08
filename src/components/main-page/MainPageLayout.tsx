import { Stack } from '@mui/material';
import { AppBar } from './AppBar';

const MainPageLayout = ({children}:any) => (
    <>
        <AppBar />
        <Stack paddingX={15} spacing={2} paddingTop={2}>{children}</Stack>
    </>
);
export default MainPageLayout;
