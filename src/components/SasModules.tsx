import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { updateUser, useFetchAppModuleImage, useFetchSasModules, useGetUser } from '@/queries';
import { AppModule, SasItem } from '@/constants/types';
import { Card, Chip, Grid, IconButton, Stack, Typography } from '@mui/material';
import { loggedUserAtom } from '@/state/atoms';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useQueryClient } from 'react-query';
import { toggleItemInArray } from '@/utils';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import { SasModuleSkeleton } from './SasModuleSkeleton';
import NumberOfAppsIndicator from './main-page/atoms/NumberOfAppsIndicator';

interface SasModulesProps {
  sasItem: SasItem;
  searchTerm: string;
}

export const SasModules = ({ sasItem, searchTerm }: SasModulesProps) => {
  const [loggedUser] = useAtom(loggedUserAtom);
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { data: user } = useGetUser(loggedUser?.id ?? '');
  const { data: image } = useFetchAppModuleImage('', '');
  const { isLoading, error, data } = useFetchSasModules(sasItem.id);
  const { name: sasName } = sasItem;

  const filteredData = searchTerm ? data?.page.filter(({ name }: AppModule) => name.includes(searchTerm)) : data?.page;

  const onUpdateFavourites = (event: any, item: any) => {
    event.stopPropagation();
    if (user) {
      const newFavourites = user.favourites;

      toggleItemInArray(newFavourites, item);
      updateUser(user.id, newFavourites, queryClient);
    }
  };

  const isItemInFavourites = (item: any) =>
    user?.favourites?.find((fav: SasItem) => fav.moduleName === item.moduleName);

  const onNavigate = async (item: SasItem, moduleName: string) => {
    await push(`/${sasName}/${moduleName}/dashboard`);
  };

  if (error) return <h2>{error.message}</h2>;

  if (isLoading)
    return (
      <>
        {Array(2).map((_, idx) => (
          <SasModuleSkeleton key={idx} />
        ))}
      </>
    );

  return filteredData.map(({ name: moduleName, id }: AppModule) => (
    <Grid item xs={12} key={id}>
      <Card
        sx={{
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover', // Change this to the color you want on hover
          },
        }}
        onClick={() => onNavigate(sasItem, moduleName)}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={{xs: 1, sm: 3}}>
            <Image
              alt={`${moduleName} logo`}
              src={image?.src ?? '/app-module-images/placeholder.png'}
              width="100"
              height="100"
            />
              <Typography textTransform="capitalize" fontWeight="bold">
                {moduleName}
              </Typography>
          </Stack>

          <Stack spacing={{xs: 1, sm: 5}} direction={{sx: 'column', sm: 'row'}} paddingRight={{xs: 2, xm: 0}} alignItems="center">
            <NumberOfAppsIndicator moduleId={id} />
            <Chip label={sasName} />
            <IconButton
                sx={{ color: 'orange' }}
                onClick={(event) =>
                    onUpdateFavourites(event, {
                      moduleId: id,
                      moduleName,
                      sasName,
                    })
                }
            >
              {isItemInFavourites({ moduleName }) ? <StarIcon /> : <StarOutlineIcon />}
            </IconButton>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  ));
};
