import { Stack, TextField, Typography } from '@mui/material';
import AllItemsGrid from '@/components/AllItemsGrid';
import Menubar from '@/components/main-page/Menubar';

const AllSases = () => (
  <>
    <Typography>Všechny moduly</Typography>
    <TextField fullWidth label="Vyhledávání modulů" />
    <Stack direction="row" spacing={3}>
      <Menubar />
      <AllItemsGrid />
    </Stack>
  </>
);

export default AllSases;
