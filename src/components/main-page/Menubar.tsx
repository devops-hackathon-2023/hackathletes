import { Divider, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
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
    <Stack bgcolor="primary.lighter" padding={1} borderRadius={1} spacing={1} width={300} flexShrink={0}>
      <ToggleButtonGroup orientation="vertical" value={selectedSasId} exclusive onChange={handleChange}>
        <ToggleButton value="all" sx={{ border: 'none', alignItems: 'start', justifyContent: 'start' }}>
          <Typography sx={{ textTransform: 'none' }} textAlign="left" noWrap>
            Všechny aplikace
          </Typography>
        </ToggleButton>
        <Divider sx={{ backgroundColor: (theme) => theme.palette.grey[200] }} />
        {data?.page.map(({ name, id }: SasItem) => (
          <ToggleButton key={id} value={id} sx={{ border: 'none', alignItems: 'start', justifyContent: 'start' }}>
            <Typography sx={{ textTransform: 'capitalize' }} noWrap>
              {name}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default MenuBar;
