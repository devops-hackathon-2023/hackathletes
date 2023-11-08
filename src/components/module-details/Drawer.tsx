import React, { useState } from 'react';
import { styled, Drawer as MuiDrawer, List, ListItemIcon, ListItemText, Divider as MuiDivider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoopIcon from '@mui/icons-material/Loop';
import InsightsIcon from '@mui/icons-material/Insights';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import { useIsMobile, usePageTitle } from '@/hooks';
import Image from 'next/image';
import { ListItemButton } from '@/components/module-details/ListItemButton';
import DrawerButton from '@/components/module-details//DrawerButton';
import ModulesDialog from '@/components/ModulesDialog';
import Link from 'next/link';

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

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Divider = styled(MuiDivider)(({ theme }) => ({
  width: '85%',
  backgroundColor: theme.palette.primary[800],
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

interface PersistentDrawerProps {
  open: boolean;
  onClose?: () => void;
}

export const PersistentDrawer: React.FC<PersistentDrawerProps> = ({ open, onClose }) => {
  const router = useRouter();

  const { sas, module } = router.query;

  const isMobile = useIsMobile();

  const pageTitle = usePageTitle();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigateTo = (path: string) => {
    router.push(`/${sas}/${module}/${path}`);
  };

  return (
    <Drawer anchor="left" variant={isMobile ? 'temporary' : 'permanent'} open={open} onClose={onClose}>
      <Link href="/dashboard">
        <Image alt="img" src="/ceska_sporitelna.png" width={114} height={51} style={{ margin: '20px 30px 10px' }} />
      </Link>
      <DrawerButton onClick={() => setIsModalOpen(true)} />
      <ModulesDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Divider />
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
