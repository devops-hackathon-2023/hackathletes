import { Grid, Typography } from '@mui/material';
import { SasItem } from '@/constants/types';
import { useFetchAllSasses } from '@/queries';
import { SasModules } from '@/components/SasModules';

interface AllItemsGridProps {
  selectedSasId: string;
  searchTerm: string;
}

const AllItemsGrid = ({ selectedSasId, searchTerm }: AllItemsGridProps) => {
  const { isLoading, data, isError, error } = useFetchAllSasses();

  const sasesList = selectedSasId === 'all' ? data?.page : data?.page.filter(({ id }: SasItem) => id === selectedSasId);

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Název modulu</Typography>
      </Grid>
      {sasesList.map((sItem: SasItem, idx: number) => (
        <SasModules key={idx} sasItem={sItem} searchTerm={searchTerm} />
      ))}
    </Grid>
  );
};

export default AllItemsGrid;
