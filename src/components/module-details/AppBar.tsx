import React from 'react';
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { CustomAvatar } from '@/components/CustomAvatar';
import { drawerWidth } from '@/components/module-details/Drawer';

interface CustomAppBarProps {
  title: string;
  onMenuClick?: () => void;
}

export const AppBar = ({ title, onMenuClick }: CustomAppBarProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <MuiAppBar
      sx={{
        width: {
          md: `calc(100% - ${drawerWidth}px)`,
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0 2px 4px -1px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Toolbar>
        {onMenuClick && isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ mr: 2, ml: 0.2 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <CustomAvatar />
      </Toolbar>
    </MuiAppBar>
  );
};
export default AppBar;
