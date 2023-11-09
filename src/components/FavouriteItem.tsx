import { Card, CardContent, CardMedia, Stack, Typography, Chip, IconButton, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useFetchAppModuleImage } from '@/queries';
import Image from 'next/image';
import NumberOfAppsIndicator from '@/components/main-page/atoms/NumberOfAppsIndicator';

interface IFavouriteItemProps {
  item: { moduleId: string; moduleName: string; sasName: string };

  onItemClick(sasName: string, moduleName: string): any;

  onStarClick(event: any, item: any): any;
}

export const FavouriteItem = ({ item, onItemClick, onStarClick }: IFavouriteItemProps) => {
  const { sasName, moduleName, moduleId } = item;
  const { data: image } = useFetchAppModuleImage(sasName, moduleName);

  return (
    <Card
      sx={{
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: 'action.hover', // Change this to the color you want on hover
        },
      }}
      onClick={() => onItemClick(sasName, moduleName)}
    >
      <CardMedia>
        <Stack alignItems="center" justifyContent="center" bgcolor="primary.main" direction="row" position="relative">
          <Image alt="Module logo" src={image?.src ?? '/app-module-images/placeholder.png'} width="100" height="100" />
          <Box position="absolute" top="0" right="0">
            <IconButton onClick={(event) => onStarClick(event, item)}>
              <StarIcon sx={{ color: 'orange' }} />
            </IconButton>
          </Box>
        </Stack>
      </CardMedia>
      <CardContent>
        <Stack>
          <Stack spacing={1}>
            <Typography paddingLeft={0.5} fontWeight="bold">
              {moduleName}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip label={sasName} />
              <NumberOfAppsIndicator moduleId={moduleId} />
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
