import { Grid, Stack } from '@mui/material';

import { SasItem } from '@/components/SasItem';
import { SasItem as SasItemType } from '@/constants/types';

interface SasGridProps {
  items: SasItemType[];
}

export const SasGrid = ({ items }: SasGridProps) => (
  <Stack>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {items?.map((item: SasItemType, idx: number) => (
        <Grid item key={idx} xs={2} sm={4} md={4}>
          <SasItem key={idx} item={item} />
        </Grid>
      ))}
    </Grid>
  </Stack>
);
