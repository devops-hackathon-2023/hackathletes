import { Avatar, ListItemButton, Skeleton, Stack, Typography } from '@mui/material';

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useFetchUser } from '@/queries';
import { useAtom } from 'jotai';
import { DEFAULT_USER } from '@/constants';
import {loggedUserAtom} from "@/state/atoms";

export const CustomAvatar = () => {
  const [loggedUser] = useAtom(loggedUserAtom)
  const { data, isLoading } = useFetchUser(loggedUser.id);
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