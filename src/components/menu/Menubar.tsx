import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { useState } from 'react';

export default function Menubar() {
  const [view, setView] = useState('list');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  return (
    <Stack bgcolor={'#F8F8F8'} padding={2} borderRadius={4} spacing={1}>
      <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
        <ToggleButton value="list" sx={{ border: 'none' }}>
          <Typography sx={{ textTransform: 'none' }} noWrap>
            Všechny aplikace
          </Typography>
        </ToggleButton>
        <ToggleButton value="module" sx={{ border: 'none' }}>
          <Typography sx={{ textTransform: 'none' }} noWrap>
            Mobilní bankovnictví
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
