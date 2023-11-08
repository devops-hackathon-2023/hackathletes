import { Card, CardContent, CardMedia, Stack, Typography, Chip, IconButton } from '@mui/material';
import { SasItem as SasItemType } from '@/constants/types';
import StarIcon from '@mui/icons-material/Star';

interface SasItemProps {
    item: SasItemType;
    onItemClick: any;
    onStarClick: any;
}

export const FavouriteItem = ({ item, onItemClick, onStarClick }: SasItemProps) => (
    <Card sx={{ maxWidth: 368 }}>
        <CardMedia>
            <Stack
                bgcolor="primary.main"
                height="100px"
                alignItems="center"
                justifyContent="center"
            >
                img
            </Stack>
        </CardMedia>
        <CardContent>
            <IconButton>
                <StarIcon sx={{ color: 'orange' }} />
            </IconButton>
            <Stack spacing={1}>
                <Typography paddingLeft={0.5}>{item.name}</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip label="Banking" />
                    <Typography>4 Aps</Typography>
                </Stack>
            </Stack>
        </CardContent>
    </Card>
);

