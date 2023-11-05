import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { useFetchAllSasses } from '@/queries';
import { AppModule } from '@/constants/types';

const MenuBar = () => {
  const [view, setView] = useState('list');

  const { isLoading, error, data } = useFetchAllSasses();

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  if (isLoading) return <h2>Loading ...</h2>;

  if (error) return <h2>{error.message}</h2>;

  return (
    <Stack bgcolor="primary.lighter" padding={2} borderRadius={4} spacing={1}>
      <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
        <ToggleButton value="list" sx={{ border: 'none' }}>
          <Typography sx={{ textTransform: 'none' }} noWrap>
            Všechny aplikace
          </Typography>
        </ToggleButton>
        {data?.page.map(({ name: moduleName, id }: AppModule) => (
          <ToggleButton key={id} value={moduleName} sx={{ border: 'none' }}>
            <Typography sx={{ textTransform: 'none' }} noWrap>
              {moduleName}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default MenuBar;
