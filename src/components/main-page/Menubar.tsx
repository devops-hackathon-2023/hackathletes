import { useState } from 'react';
import { Divider, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useIsMobile } from '@/hooks';
import { useFetchAllSasses } from '@/queries';
import { SasItem } from '@/constants/types';
import { SearchBox } from '../form/SearchBox';

interface MenuBarProps {
  selectedSasId: string;
  setSelectedSasId: (id: string) => void;
  onSearchBoxClick?: () => void;
}

const MenuBar = ({ selectedSasId, setSelectedSasId, onSearchBoxClick }: MenuBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoading, error, data } = useFetchAllSasses();

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => setSelectedSasId(nextView);

  const filteredData = searchTerm ? data?.page.filter(({ name }: SasItem) => name.includes(searchTerm)) : data?.page;

  const isMobile = useIsMobile();

  if (isLoading) return <h2>Loading ...</h2>;

  if (error) return <h2>{error.message}</h2>;

  return (
    <Stack
      bgcolor="primary.lighter"
      padding={1}
      borderRadius={1}
      spacing={1}
      width={isMobile ? '100%' : 200}
      flexShrink={0}
    >
      <SearchBox placeholder="Search SAS..." onSearchChange={setSearchTerm} onTextFieldClick={onSearchBoxClick} />

      <ToggleButtonGroup
        orientation="vertical"
        value={selectedSasId}
        exclusive
        onChange={handleChange}
        sx={{ overflowX: 'auto' }}
      >
        <ToggleButton value="all" sx={{ border: 'none', alignItems: 'start', justifyContent: 'start' }}>
          <Typography sx={{ textTransform: 'none' }} textAlign="left" noWrap>
            Všechny aplikace
          </Typography>
        </ToggleButton>
        <Divider sx={{ backgroundColor: (theme) => theme.palette.grey[200] }} />
        {filteredData.map(({ name, id }: SasItem) => (
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
