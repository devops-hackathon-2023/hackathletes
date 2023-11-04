// components/Layout.tsx
import React, { ReactNode, useState } from 'react';
import { Box, CssBaseline, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import AppBar from '@/components/menu/AppBar';
import Drawer from '@/components/menu/Drawer';
import { usePageTitle } from '@/hooks';
import { drawerWidth } from '@/components/menu/Drawer';
interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pageTitle = usePageTitle();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar title={pageTitle} onMenuClick={handleDrawerToggle} />
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
