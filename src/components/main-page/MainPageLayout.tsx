import { Stack } from '@mui/material';
import { AppBar } from './AppBar';

const MainPageLayout = ({children}:any) => (
    <>
        <AppBar />
        <Stack paddingX={{xs: 5, md: 15}} spacing={2} paddingTop={2} paddingBottom={5}>{children}</Stack>
    </>
);
export default MainPageLayout;
