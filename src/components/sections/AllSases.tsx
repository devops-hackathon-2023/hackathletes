import { Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import AllItemsGrid from '@/components/AllItemsGrid';
import Menubar from '@/components/menu/Menubar';

export default function AllSases() {
  return (
    <>
      <Typography>Všechny moduly</Typography>
      <TextField fullWidth label={'Vyhledávání modulů'} />
      <Stack direction={'row'} spacing={3}>
        <Menubar />
        <AllItemsGrid />
      </Stack>
    </>
  );
}
