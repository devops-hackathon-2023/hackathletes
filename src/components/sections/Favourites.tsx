import { Typography, Stack, Grid, Container, Box } from '@mui/material';
import { updateUser, useFetchUser } from '@/queries';
import { useAtom } from 'jotai';
import { DEFAULT_USER } from '@/constants';
import { loggedUserAtom } from '@/state/atoms';
import { toggleItemInArray } from '@/actions';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { FavouriteItem } from '../FavouriteItem';
import { FavouriteItemSkeleton } from '../FavouriteItemSkeleton';

const Favourites = () => {
  const { push } = useRouter();
  const [loggedUser] = useAtom(loggedUserAtom);
  const fetchedData = useFetchUser(loggedUser.id);
  const user = fetchedData.data;
  const { favourites } = user || DEFAULT_USER;
  const queryClient = useQueryClient();

  const onUpdateFavourites = (event: any, item: any) => {
    if (user) {
      event.stopPropagation();
      toggleItemInArray(user.favourites, item);
      updateUser(user.id, user, queryClient);
    }
  };

  const onNavigateToDetails = async (sasName: string, moduleName: string) => {
    await push(`/${sasName}/${moduleName}/dashboard`);
  };

  if (!fetchedData.isLoading && !fetchedData.data) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4">Favourite modules</Typography>
        <Stack mt={2}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {fetchedData?.isLoading && (
              <>
                {Array(3).map((_, idx) => (
                  <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                    <FavouriteItemSkeleton />
                  </Grid>
                ))}
              </>
            )}

            {user?.favourites?.map((item: any, idx: number) => (
              <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                <FavouriteItem
                  key={idx}
                  item={item}
                  onItemClick={onNavigateToDetails}
                  onStarClick={onUpdateFavourites}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Favourites;
