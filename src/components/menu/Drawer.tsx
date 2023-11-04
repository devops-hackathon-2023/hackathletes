import React from 'react';
import {
  styled,
  Drawer as MuiDrawer,
  List,
  ListItemButton as MuiListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoopIcon from '@mui/icons-material/Loop';
import InsightsIcon from '@mui/icons-material/Insights';
import { useRouter } from 'next/router';
import { useIsMobile, usePageTitle } from '@/hooks';
import Image from 'next/image';
import DrawerButton from '@/components/menu/DrawerButton';

const menuItems = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    name: 'Deployments',
    icon: <LoopIcon />,
  },
  {
    name: 'Metrics',
    icon: <InsightsIcon />,
  },
];

export const drawerWidth = 240;

// Styled components using MUI's styled API
const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#101F40',
  },
}));

export const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  margin: '0.5rem', // Adjust the margin to achieve 90% width effect
  width: 'calc(100% - 1rem)', // Adjust the width to achieve 90% width effect
  '&.Mui-selected': {
    backgroundColor: '#182D59',
    '&:hover': {
      backgroundColor: '#182D59',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
}));

const ListItemIconStyled = styled(ListItemIcon)({
  color: '#BFD3FF',
});

interface PersistentDrawerProps {
  open: boolean;
  onClose?: () => void;
}

export const PersistentDrawer: React.FC<PersistentDrawerProps> = ({ open, onClose }) => {
  const router = useRouter();
  const { sas, module } = router.query;
  const isMobile = useIsMobile();
  const navigateTo = (path: string) => {
    router.push(`/${sas}/${module}/${path}`);
  };
  const pageTitle = usePageTitle();

  return (
    <Drawer anchor="left" variant={isMobile ? 'temporary' : 'permanent'} open={open} onClose={onClose}>
      <Image alt="img" src="/ceska_sporitelna.png" width={114} height={51} style={{ margin: '20px 30px 10px' }} />
      <DrawerButton />
      <List>
        {menuItems.map(({ icon, name }) => (
          <ListItemButton selected={name === pageTitle} key={name} onClick={() => navigateTo(name.toLowerCase())}>
            <ListItemIconStyled>{icon}</ListItemIconStyled>
            <ListItemText primary={name} sx={{ color: 'white' }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default PersistentDrawer;
