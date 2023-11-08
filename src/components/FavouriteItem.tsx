import {Card, CardContent, CardMedia, Stack, Typography, Chip, IconButton, Box} from '@mui/material';
import {SasItem as SasItemType} from '@/constants/types';
import StarIcon from '@mui/icons-material/Star';
import {useFetchAppModuleImage} from "@/queries";
import Image from "next/image";

interface IFavouriteItemProps {
    item: SasItemType;
    onItemClick: any;
    onStarClick: any;
}

export const FavouriteItem = ({item, onItemClick, onStarClick}: IFavouriteItemProps) => {
    const {data: image} = useFetchAppModuleImage(item.sasName, item.moduleName);

    return (
            <Card sx={{maxWidth: 368}} onClick={() => onItemClick(item)}>
                <CardMedia>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        bgcolor="primary.main"
                        direction="row"
                        position="relative"
                    >
                        <Image
                            alt="Module logo"
                            src={image?.src ?? '/app-module-images/placeholder.png'}
                            width="100"
                            height="100"
                        />
                        <Box
                            position="absolute"
                            top="0"
                            right="0"
                        >
                            <IconButton onClick={() => onStarClick(item)}>
                                <StarIcon sx={{color: 'orange'}}/>
                            </IconButton>
                        </Box>
                    </Stack>
                </CardMedia>
                <CardContent>
                    <Stack>
                        <Stack spacing={1}>
                            <Typography paddingLeft={0.5}>{item.moduleName}</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Chip label={item.sasName}/>
                                <Typography>4 Aps</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
    )
};

