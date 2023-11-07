import { Avatar, ListItemButton, Skeleton, Stack, Typography } from '@mui/material';

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useFetchUser } from '@/queries';

const USER_ID = '1';
const DEFAULT_USER = {
  name: 'User not found',
  role: 'Role not found'
}

export const CustomAvatar = () => {
  const { data, isLoading } = useFetchUser(USER_ID);
  const user = data || DEFAULT_USER;
  
  if(isLoading) return <Skeleton  animation="wave" width={248} height={58} />

  return (
    <ListItemButton
      sx={{
        gap: 2,
        flexGrow: 0,
      }}
    >
      <Avatar alt={user.name} src={user.profilePicture} />
      <Stack>
        <Typography>{user.name}</Typography>
        <Typography variant="caption">{user.role}</Typography>
      </Stack>
      <UnfoldMoreIcon />
    </ListItemButton>
  );
};
