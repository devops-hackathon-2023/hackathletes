import { Grid, Typography } from '@mui/material';
import { SasItem } from '@/constants/types';
import { useFetchAllSasses } from '@/queries';
import { SasModules } from '@/components/SasModules';

const AllItemsGrid = () => {
  const { isLoading, data, isError, error } = useFetchAllSasses();

  const page = data?.page;

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Název modulu</Typography>
      </Grid>
      {page.map((sItem: SasItem, idx: number) => (
        <SasModules key={idx} sasItem={sItem} />
      ))}
    </Grid>
  );
};

export default AllItemsGrid;
