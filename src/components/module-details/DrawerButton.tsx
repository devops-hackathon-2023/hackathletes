import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useFetchAppModuleImage } from '@/queries';
import { useRouter } from 'next/router';
import { ListItemButton } from '@/components/module-details/ListItemButton';

interface DrawerButtonProps {
  onClick?: (event: any) => void;
}

const DrawerButton = ({ onClick }: DrawerButtonProps) => {
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
      onClick={onClick}
    >
      <Image alt="Module logo" src={image.src} width={50} height={50} style={{ borderRadius: '4px' }} />
      <Stack>
        <Typography>{module}</Typography>
        <Typography variant="caption" color="primary.main">
          {sas}
        </Typography>
      </Stack>
      <UnfoldMoreIcon />
    </ListItemButton>
  );
};

export default DrawerButton;
