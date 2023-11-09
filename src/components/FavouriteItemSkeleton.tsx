import { Card, CardContent, CardMedia, Stack, Skeleton } from '@mui/material';

export const FavouriteItemSkeleton = () => (
  <Card sx={{ maxWidth: 368, cursor: 'pointer' }}>
    <CardMedia>
      <Stack alignItems="center" justifyContent="center" direction="row" position="relative">
        <Skeleton variant="rectangular" width="100%" height={100} />
      </Stack>
    </CardMedia>
    <CardContent>
      <Stack>
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Skeleton variant="rectangular" width={100} height={32} />
          </Stack>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);
