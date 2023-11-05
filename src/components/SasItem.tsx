import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { SasItem as SasItemType } from '@/constants/types';

interface SasItemProps {
  item: SasItemType;
}

export const SasItem = ({ item }: SasItemProps) => {
  const { push } = useRouter();

  return (
    <Card>
      <CardMedia>
        <Stack
          bgcolor="primary.main"
          height="100px"
          alignItems="center"
          justifyContent="center"
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
};
