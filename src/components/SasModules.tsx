import { useAtom } from 'jotai';
import { atomRecentSases } from '@/constants/state/atoms';
import { useRouter } from 'next/router';
import { useFetchSasModules } from '@/queries';
import { AppModule, SasItem } from '@/constants/types';
import { Chip, Grid, Stack, Typography } from '@mui/material';

interface SasModulesProps {
  sasItem: SasItem;
  searchTerm: string;
}

export const SasModules = ({ sasItem, searchTerm }: SasModulesProps) => {
  const { isLoading, error, data } = useFetchSasModules(sasItem.id);

  const [, setRecentSases] = useAtom(atomRecentSases);

  const { name: sasName } = sasItem;

  const { push } = useRouter();

  const onClick = async (item: SasItem, moduleName: string) => {
    await push(`/${sasName}/${moduleName}/dashboard`);

    setRecentSases((prev: SasItem[]) => {
      if (prev.filter((prevItem: SasItem) => prevItem.name === sasName).length > 0) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const filteredData = searchTerm ? data?.page.filter(({ name }: AppModule) => name.includes(searchTerm)) : data?.page;

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>{error.message}</h2>;

  return filteredData.map(({ name: moduleName, id }: AppModule) => (
    <Grid item xs={12} key={id}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => onClick(sasItem, moduleName)}
      >
        <Stack bgcolor="primary.main" height="100px" alignItems="center" justifyContent="center" width={150}>
          img
        </Stack>
        <Typography>{moduleName}</Typography>
        <Typography>4 Aps</Typography>
        <Chip label={sasName} />
      </Stack>
    </Grid>
  ));
};
