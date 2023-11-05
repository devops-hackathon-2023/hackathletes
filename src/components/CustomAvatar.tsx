import { Avatar, Stack, Typography, ListItemButton } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useFetchUser } from '@/queries';

const USER_ID = '1';

export const CustomAvatar = () => {
  const { data: user, isLoading, isError } = useFetchUser(USER_ID);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching user</div>;

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
