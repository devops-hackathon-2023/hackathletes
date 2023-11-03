import { Avatar, Stack, Typography } from '@mui/material';

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

export function CustomAvatar() {
  return (
    <Stack direction="row" alignItems={'center'} padding={1} spacing={2}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Stack>
        <Typography>Dominik Vít</Typography>
        <Typography>Dev-Ops</Typography>
      </Stack>
      <UnfoldMoreIcon />
    </Stack>
  );
}
