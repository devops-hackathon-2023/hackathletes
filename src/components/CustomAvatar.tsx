import { Avatar, Stack, Typography } from '@mui/material';

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useFetchUser } from '@/queries';

const USER_ID = '1';
export function CustomAvatar() {
  const { data: user, isLoading, isError } = useFetchUser(USER_ID);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user</div>;

  return (
    <Stack direction="row" alignItems={'center'} padding={1} spacing={2}>
      <Avatar alt={user.name} src={user.profilePicture} />
      <Stack>
        <Typography>{user.name}</Typography>
        {/*todo - tady by měl být vybraný SAS, ne ten první, ke kterému má uživatel přístup*/}
        <Typography variant="caption">{user.sases.length > 0 ? user.sases[0].name : 'No SAS Access'}</Typography>
      </Stack>
      <UnfoldMoreIcon />
    </Stack>
  );
}
