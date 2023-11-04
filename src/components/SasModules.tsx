import { useAtom } from 'jotai';
import { atomRecentSases } from '@/constants/state/atoms';
import { useRouter } from 'next/router';
import { useFetchSasModules } from '@/queries';
import { appModule } from '@/constants/types';
import { Chip, Grid, Stack, Typography } from '@mui/material';
import { sasItem } from '@/constants/types';
export const SasModules = ({ sasItem }: { sasItem: sasItem }) => {
  const { name: sasName } = sasItem;
  const [recentSases, setRecentSases] = useAtom(atomRecentSases);
  const { push } = useRouter();
  const { isLoading, error, data } = useFetchSasModules(sasItem.id);
  const onClick = async (sasItem: sasItem, moduleName: string) => {
    await push(`/${sasName}/${moduleName}/dashboard`);
    setRecentSases((prev: sasItem[]) => {
      console.log(prev);
      if (prev.filter((prevItem: sasItem) => prevItem.name === sasName).length > 0) {
        return prev;
      }
      return [...prev, sasItem];
    });
  };
  if (isLoading) {
    return <h2>Loading...</h2>;
  } else if (error) {
    return <h2>{error.message}</h2>;
  } else {
    return data?.page.map(({ name: moduleName, id }: appModule) => {
      return (
        <Grid item xs={12} key={id}>
          <Stack
            direction={'row'}
            justifyContent="space-between"
            alignItems="center"
            onClick={() => onClick(sasItem, moduleName)}
          >
            <Stack
              bgcolor={'primary.main'}
              height={'100px'}
              alignItems={'center'}
              justifyContent={'center'}
              width={150}
            >
              img
            </Stack>
            <Typography>{moduleName}</Typography>
            <Typography>4 Aps</Typography>
            <Chip label={sasName} />
          </Stack>
        </Grid>
      );
    });
  }
};
