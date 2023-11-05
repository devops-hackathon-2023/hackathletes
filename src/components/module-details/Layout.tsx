// components/Layout.tsx
import React, { ReactNode, useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { usePageTitle } from '@/hooks';
import Drawer, { drawerWidth } from '@/components/module-details/Drawer';
import { AppBar } from '@/components/module-details/AppBar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
