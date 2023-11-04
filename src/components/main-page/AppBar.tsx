import { AppBar as MuiAppBar, Toolbar, Box } from '@mui/material';
import { CustomAvatar } from '../CustomAvatar';
import Image from 'next/image';

export function AppBar() {
  return (
    <MuiAppBar
      sx={{
        backgroundColor: (theme) => theme.palette.primary.darker,
        color: (theme) => theme.palette.common.white,
      }}
      position="static"
      color="primary"
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, ml: 12 }}>
          <Image alt="img" src="/ceska_sporitelna.png" width={114} height={51} />
        </Box>
        <CustomAvatar />
      </Toolbar>
    </MuiAppBar>
  );
}
