import { AppBar as MuiAppBar, Toolbar, Box, Theme } from '@mui/material';
import Image from 'next/image';
import { CustomAvatar } from '../CustomAvatar';

export const AppBar = () => (
  <MuiAppBar
    sx={{
      backgroundColor: (theme: Theme) => theme.palette.primary.darker,
      color: (theme) => theme.palette.common.white,
    }}
    position="static"
    color="primary"
  >
    <Toolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Image alt="img" src="/ceska_sporitelna.png" width={114} height={51} />
      </Box>
      <CustomAvatar />
    </Toolbar>
  </MuiAppBar>
);
