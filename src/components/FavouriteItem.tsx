import { Card, CardContent, CardMedia, Stack, Typography, Chip, IconButton } from '@mui/material';
import { SasItem as SasItemType } from '@/constants/types';
import StarIcon from '@mui/icons-material/Star';
import {useFetchAppModuleImage} from "@/queries";

interface SasItemProps {
    item: SasItemType;
    onItemClick: any;
    onStarClick: any;
}

export const FavouriteItem = ({ item, onItemClick, onStarClick }: SasItemProps) => {
    const fetchData = useFetchAppModuleImage('','');

    return (
        <Card sx={{maxWidth: 368}}>
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
                    <StarIcon sx={{color: 'orange'}}/>
                </IconButton>
                <Stack spacing={1}>
                    <Typography paddingLeft={0.5}>{item.moduleName}</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Chip label={item.sasName}/>
                        <Typography>4 Aps</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
};

