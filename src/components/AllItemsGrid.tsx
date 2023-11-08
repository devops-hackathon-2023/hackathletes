import { Grid, Paper, Stack } from '@mui/material';
import { SasItem } from '@/constants/types';
import { useFetchAllSasses } from '@/queries';
import { SasModules } from '@/components/SasModules';
import { SasModuleSkeleton } from './SasModuleSkeleton';

interface AllItemsGridProps {
  selectedSasId: string;
  searchTerm: string;
}

const AllItemsGrid = ({ selectedSasId, searchTerm }: AllItemsGridProps) => {
  const { isLoading, data, isError, error } = useFetchAllSasses();

  const sasesList = selectedSasId === 'all' ? data?.page : data?.page.filter(({ id }: SasItem) => id === selectedSasId);

  if (isError) return <h2>{error.message}</h2>;

  return (
    <Stack>
      <Grid container spacing={2} sx={{ overflow: 'scroll', overflowX: 'hidden' }} paddingX={0.5} paddingBottom={0.5}>
        {isLoading && (
          <>
            {Array(6).map((_, idx) => (
              <SasModuleSkeleton key={idx} />
            ))}
          </>
        )}
        {sasesList?.map((sItem: SasItem, idx: number) => (
          <SasModules key={idx} sasItem={sItem} searchTerm={searchTerm} />
        ))}
      </Grid>
    </Stack>
  );
};

export default AllItemsGrid;
