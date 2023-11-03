import { Divider, Grid, Stack, Typography } from '@mui/material';

import { apiAllSas } from '@/constants';
import { atomRecentSases } from '@/constants/state/atoms';
import { sasItem } from '@/constants/types';
import { useAtom } from 'jotai';
import { useFetchFromUrl } from '@/hooks';
import { useRouter } from 'next/router';

export default function AllItemsGrid() {
  const { isLoading, data, isError, error } = useFetchFromUrl(apiAllSas);
  const [recentSases, setRecentSases] = useAtom(atomRecentSases);
  const { push } = useRouter();

  const page_backup = [
    { id: '1ee77266-62a0-600c-89b8-819b6af11171', name: 'devops' },
    { id: '1ee77266-6694-6e82-89b8-819b6af11171', name: 'loans' },
    { id: '1ee77266-65b8-63d8-89b8-819b6af11171', name: 'payments' },
    { id: '1ee77266-6720-6ac0-89b8-819b6af11171', name: 'wealth' },
  ];

  const onClick = (item: sasItem) => {
    push({
      pathname: '/dashboard',
      query: { sasId: item.id },
    });
    setRecentSases((prev) => {
      console.log(prev);
      if (prev.filter((prevItem) => prevItem.name === item.name).length > 0) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const page = data?.data.page;

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>{error.message}</h2>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Název modulu</Typography>
          </Grid>
          {page.map((item: sasItem, id: number) => {
            return (
              <Grid item xs={12} key={id}>
                <Stack
                  direction={'row'}
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => onClick(item)}
                >
                  <Stack
                    bgcolor={'#2870ED'}
                    height={'100px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    width={150}
                  >
                    img
                  </Stack>
                  <Typography>{item.name}</Typography>
                  <Typography>4 Aps</Typography>
                  <Typography>Mobile banking</Typography>
                </Stack>
                <Divider sx={{ border: '1px solid lightgray', flexGrow: 1 }} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}
