import { Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { SasGrid } from '@/components/SasGrid';
import { atomRecentSases } from '@/constants/state/atoms';
import { useAtom } from 'jotai';

export default function RecentSases() {
  const [recentSasess] = useAtom(atomRecentSases);

  return (
    <>
      <Typography>Naposledy zobrazené</Typography>
      <SasGrid items={recentSasess} />
    </>
  );
}
