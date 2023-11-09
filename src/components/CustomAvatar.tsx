import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemButton,
  MenuItem,
  Popover,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useGetUser } from '@/queries';
import { useAtom } from 'jotai';
import { loggedUserAtom } from '@/state/atoms';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useLocales } from '@/locales';

export const CustomAvatar = () => {
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data: user, isLoading } = useGetUser(loggedUser?.id ?? '');
  const { t } = useLocales();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    router.push('/');
    sessionStorage.removeItem('user');
    setLoggedUser(null);
  };

  if (isLoading) return <Skeleton animation="wave" width={248} height={58} />;

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ fontWeight: 'fontWeightBold', color: 'error.main' }}>
          {t('logout')}
        </MenuItem>
      </Popover>

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
