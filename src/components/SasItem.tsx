import { Card, CardContent, CardMedia, Paper, Stack, Typography } from '@mui/material';

import { useRouter } from 'next/router';
import { sasItem } from '@/constants/types';

export function SasItem({ item }: { item: sasItem }) {
  const { push } = useRouter();

  return (
    <Card>
      <CardMedia>
        <Stack
          bgcolor={'#2870ED'}
          height={'100px'}
          alignItems={'center'}
          justifyContent={'center'}
          onClick={() => {
            push({
              pathname: '/dashboard',
              query: { sasId: item.id },
            });
          }}
        >
          img
        </Stack>
      </CardMedia>
      <CardContent>
        <Typography>{item.name}</Typography>
      </CardContent>
    </Card>
  );
}
