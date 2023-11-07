import { ListItemButton as MuiListItemButton, Stack, Typography } from '@mui/material';
import { useFetchAppModuleDeploymentUnits, useFetchAppModuleImage } from '@/queries';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';

interface ModuleButtonProps {
  module: any;
  onClick?: () => void;
}

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  color: theme.palette.common.white,
  gap: theme.spacing(2),
  flexGrow: 0,
  backgroundColor: theme.palette.primary.darker,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ModuleButton = ({ module, onClick }: ModuleButtonProps) => {
  const { sas } = useRouter().query;

  const { data: image } = useFetchAppModuleImage(sas as string, module as string);

  return (
    <ListItemButton onClick={onClick}>
      <Image
        alt="Module logo"
        src={image?.src ?? '/app-module-images/placeholder.png'}
        width={50}
        height={50}
        style={{ borderRadius: '4px' }}
      />
      <Stack>
        <Typography>{module?.name}</Typography>
        <Typography variant="caption" color="primary.main" />
      </Stack>
    </ListItemButton>
  );
};

export default ModuleButton;
