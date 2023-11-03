import { Grid, Stack, Typography } from '@mui/material';

export default function AllItemsGrid() {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography>Název modulu</Typography>
      </Grid>
      <Grid xs={12}>
        <Stack direction={'row'} justifyContent="space-between" alignItems="center">
          <Stack bgcolor={'#2870ED'} height={'100px'} alignItems={'center'} justifyContent={'center'} width={150}>
            img
          </Stack>
          <Typography>George</Typography>
          <Typography>4 Aps</Typography>
          <Typography>Mobile banking</Typography>
        </Stack>
      </Grid>
      <Grid xs={12}>
        <Stack direction={'row'} justifyContent="space-between" alignItems="center">
          <Stack bgcolor={'#2870ED'} height={'100px'} alignItems={'center'} justifyContent={'center'} width={150}>
            img
          </Stack>
          <Typography>Another app</Typography>
          <Typography>4 Aps</Typography>
          <Typography>Mobile banking</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
