import { AppBar as MuiAppBar, Toolbar, Box, Theme, Button, Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CustomAvatar } from '../CustomAvatar';

export const AppBar = () => {
  const { query } = useRouter();
  const { sas, module, unit } = query;

  return (
    <MuiAppBar
      sx={{
        backgroundColor: (theme: Theme) => theme.palette.primary.dark,
        color: (theme) => theme.palette.common.white,
      }}
      position="static"
      elevation={0}
      color="primary"
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <Link href={`/${sas}/${module}/dashboard`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button sx={{ color: (t) => t.palette.primary[300] }} startIcon={<ChevronLeft />}>
              {module}
            </Button>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 3 }}>
            <>{unit}</>
          </Typography>
        </Box>
        <CustomAvatar />
      </Toolbar>
    </MuiAppBar>
  );
};
