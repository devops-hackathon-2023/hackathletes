import { Card, Stack, Box, Skeleton, Grid } from '@mui/material';

export const SasModuleSkeleton = () => (
  <Grid item xs={12}>
    <Card>
      <Stack>
        <Grid container spacing={1} columns={10} alignItems="center">
          <Grid item xs={2}>
            <Skeleton variant="rectangular" width="100" height="100" />
          </Grid>
          <Grid item xs={4}>
            <Box paddingLeft={1}>
              <Skeleton variant="text" />
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', pr: 2 }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <Skeleton variant="rectangular" width={100} height={32} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  </Grid>
);
