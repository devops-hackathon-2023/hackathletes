import { Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { SasGrid } from '@/components/SasGrid';
import { apiAllSas } from '@/constants';
import { useFetchFromUrl } from '@/hooks';

export default function RecentSases() {
  const { isLoading, data, isError, error } = useFetchFromUrl(apiAllSas);

  const page = data?.data.page;

  const page_backup = [
    { id: '1ee77266-62a0-600c-89b8-819b6af11171', name: 'devops' },
    { id: '1ee77266-6694-6e82-89b8-819b6af11171', name: 'loans' },
    { id: '1ee77266-65b8-63d8-89b8-819b6af11171', name: 'payments' },
    { id: '1ee77266-6720-6ac0-89b8-819b6af11171', name: 'wealth' },
  ];

  return (
    <>
      <Typography>Naposledy zobrazené</Typography>
      {isLoading ? <h2>Loading...</h2> : isError ? <h2>{error.message}</h2> : <SasGrid items={page} />}
      {/*  <SasGrid items={page_backup} />  */}
    </>
  );
}
