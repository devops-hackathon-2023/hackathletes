import { Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import AllItemsGrid from '@/components/AllItemsGrid';
import Menubar from '@/components/main-page/Menubar';
import { useLocales } from '@/locales';

export default function AllSases() {
  const { t } = useLocales();

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
