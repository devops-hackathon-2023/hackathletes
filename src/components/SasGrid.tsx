import { Grid, Stack } from '@mui/material';

import { SasItem } from '@/components/SasItem';
import { sasItem } from '@/constants/types';

export function SasGrid({ items }: any) {
  return (
    <Stack>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {items &&
          items.map((item: sasItem, id: number) => {
            return (
              <Grid item key={id} xs={2} sm={4} md={4}>
                <SasItem key={id} item={item} />
              </Grid>
            );
          })}
      </Grid>
    </Stack>
  );
}
