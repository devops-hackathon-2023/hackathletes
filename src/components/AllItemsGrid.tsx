import { Grid, Typography } from '@mui/material';
import { sasItem } from '@/constants/types';
import { useRouter } from 'next/router';
import { useFetchAllSasses } from '@/queries';
import { SasModules } from '@/components/SasModules';

export default function AllItemsGrid() {
  const { isLoading, data, isError, error } = useFetchAllSasses();
  const { push } = useRouter();

  const page_backup = [
    { id: '1ee77266-62a0-600c-89b8-819b6af11171', name: 'devops' },
    { id: '1ee77266-6694-6e82-89b8-819b6af11171', name: 'loans' },
    { id: '1ee77266-65b8-63d8-89b8-819b6af11171', name: 'payments' },
    { id: '1ee77266-6720-6ac0-89b8-819b6af11171', name: 'wealth' },
  ];

  const page = data?.page;

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
          {page.map((sasItem: sasItem, index: number) => {
            return <SasModules key={index} sasItem={sasItem} />;
          })}
        </Grid>
      )}
    </>
  );
}
