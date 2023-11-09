import { Avatar, IconButton, ListItemButton, Menu, MenuItem, Skeleton, Stack, Typography } from '@mui/material';

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useGetUser } from '@/queries';
import { useAtom } from 'jotai';
import { loggedUserAtom } from '@/state/atoms';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const CustomAvatar = () => {
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data: user, isLoading } = useGetUser(loggedUser?.id ?? '');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setLoggedUser(null);
    router.push('/');
  };

  if (isLoading) return <Skeleton animation="wave" width={248} height={58} />;

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

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
        <IconButton onClick={handleClick}>
          <UnfoldMoreIcon />
        </IconButton>
      </ListItemButton>
    </>
  );
};
