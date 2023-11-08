import { useRef, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import AllItemsGrid from '@/components/AllItemsGrid';
import Menubar from '@/components/main-page/Menubar';
import { SasesSearchBox } from './SasesSearchBox';

const AllSases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSasId, setSelectedSasId] = useState('all');
  const targetElementRef = useRef(null);

  const scrollToElement = () => {
    if (targetElementRef.current) {
      // @ts-ignore
      targetElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollAndSetSelectedSasId = (id: string) => {
    scrollToElement();
    setSelectedSasId(id);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
      <Container maxWidth="lg">
        <Typography ref={targetElementRef} variant="h4">
          Všechny moduly
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <SasesSearchBox
            placeholder="Vyhledávání modulů"
            onSearchChange={setSearchTerm}
            onTextFieldClick={scrollToElement}
          />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} height="700px" marginTop={3}>
            <Menubar setSelectedSasId={scrollAndSetSelectedSasId} selectedSasId={selectedSasId} />

            <Box sx={{ flex: 1 }}>
              <AllItemsGrid selectedSasId={selectedSasId} searchTerm={searchTerm} />
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default AllSases;
