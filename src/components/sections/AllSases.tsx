import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import AllItemsGrid from '@/components/AllItemsGrid';
import Menubar from '@/components/main-page/Menubar';
import { SasesSearchBox } from './SasesSearchBox';

const AllSases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSasId, setSelectedSasId] = useState('all');

  return (
    <>
      <Typography>Všechny moduly</Typography>
      <SasesSearchBox placeholder="Vyhledávání modulů" onSearchChange={setSearchTerm} />
      <Stack direction="row" spacing={3}>
        <Menubar setSelectedSasId={setSelectedSasId} selectedSasId={selectedSasId} />
        <AllItemsGrid selectedSasId={selectedSasId} searchTerm={searchTerm} />
      </Stack>
    </>
  );
};

export default AllSases;
