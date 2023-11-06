import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useFetchAllSasses } from '@/queries';
import { SasItem } from '@/constants/types';

interface MenuBarProps {
  selectedSasId: string;
  setSelectedSasId: (id: string) => void;
}

const MenuBar = ({ selectedSasId, setSelectedSasId }: MenuBarProps) => {
  const { isLoading, error, data } = useFetchAllSasses();

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => setSelectedSasId(nextView);

  if (isLoading) return <h2>Loading ...</h2>;

  if (error) return <h2>{error.message}</h2>;

  return (
    <Stack bgcolor="primary.lighter" padding={2} borderRadius={4} spacing={1}>
      <ToggleButtonGroup orientation="vertical" value={selectedSasId} exclusive onChange={handleChange}>
        <ToggleButton value="all" sx={{ border: 'none' }}>
          <Typography sx={{ textTransform: 'none' }} noWrap>
            Všechny aplikace
          </Typography>
        </ToggleButton>
        {data?.page.map(({ name, id }: SasItem) => (
          <ToggleButton key={id} value={id} sx={{ border: 'none' }}>
            <Typography sx={{ textTransform: 'none' }} noWrap>
              {name}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default MenuBar;
