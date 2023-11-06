import { Box, Container } from '@mui/material';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export const SimpleLayout = ({ children }: PropsWithChildren) => (
  <Box sx={{ width: 1, height: '100vh', bgcolor: 'primary.main' }}>
    <Container maxWidth="xl">
      <Box sx={{ p: 3 }}>
        <Image alt="img" src="/ceska_sporitelna.png" width={114} height={51} />
      </Box>
      {children}
    </Container>
  </Box>
);
