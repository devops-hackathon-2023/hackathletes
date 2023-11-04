import { Avatar, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useFetchAppModuleImage } from '@/queries';
import { useRouter } from 'next/router';
import { ListItemButton } from '@/components/menu/Drawer';

const DrawerButton = () => {
  const { sas, module } = useRouter().query;
  const { data: image, isLoading, isError } = useFetchAppModuleImage(sas as string, module as string);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching the image</div>;

  return (
    <ListItemButton
      sx={{
        gap: 2,
        flexGrow: 0,
        color: 'white',
      }}
    >
      <Image alt="Module logo" src={image.src} width={50} height={50} style={{ borderRadius: '4px' }} />
      <Stack>
        <Typography>{module}</Typography>
        <Typography variant="caption" color={'#2870ED'}>
          {sas}
        </Typography>
      </Stack>
      <UnfoldMoreIcon />
    </ListItemButton>
  );
};

export default DrawerButton;
