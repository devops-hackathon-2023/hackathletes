import {useAtom} from 'jotai';
import {useRouter} from 'next/router';
import {
    updateUser,
    useFetchAppModuleImage,
    useFetchSasModules,
    useFetchUser
} from '@/queries';
import {AppModule, SasItem} from '@/constants/types';
import {Box, Card, Chip, Grid, IconButton, Stack, Typography} from '@mui/material';
import {loggedUserAtom} from "@/state/atoms";
import {toggleItemInArray} from "@/actions";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {useQueryClient} from "react-query";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import NumberOfAppsIndicator from "@/components/main-page/atoms/NumberOfAppsIndicator";

interface SasModulesProps {
    sasItem: SasItem;
    searchTerm: string;
}

export const SasModules = ({sasItem, searchTerm}: SasModulesProps) => {
    const [loggedUser] = useAtom(loggedUserAtom);
    const queryClient = useQueryClient()
    const {push} = useRouter();
    const {data: user} = useFetchUser(loggedUser.id);
    const {data: image} = useFetchAppModuleImage('', '')
    const {isLoading, error, data} = useFetchSasModules(sasItem.id);
    const {name: sasName} = sasItem;

    const filteredData = searchTerm ? data?.page.filter(({name}: AppModule) => name.includes(searchTerm)) : data?.page;
    const onUpdateFavourites = (event: any, item: any) => {
        event.stopPropagation();
        if (user) {
            toggleItemInArray(user.favourites, item);
            updateUser(user.id, user, queryClient);
        }
    };

    const isItemInFavourites = (item: any) => user.favourites.find((fav: SasItem) => fav.moduleName === item.moduleName)

    const onNavigate = async (item: SasItem, moduleName: string) => {
        await push(`/${sasName}/${moduleName}/dashboard`);
    };

    if (isLoading) return <h2>Loading...</h2>;

    if (error) return <h2>{error.message}</h2>;

    return filteredData.map(({name: moduleName, id}: AppModule) => (
        <Grid item xs={12} key={id}>
            <Card sx={{cursor: 'pointer'}} onClick={() => onNavigate(sasItem, moduleName)}>
                <Stack>
                    <Grid container spacing={1} columns={10} alignItems="center">
                        <Grid item xs={2}>
                            <Image
                                alt="Module logo"
                                src={image?.src ?? '/app-module-images/placeholder.png'}
                                width="100"
                                height="100"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto'
                                }}

                            />
                        </Grid>
                        <Grid item xs={3} sm={4}>
                            <Box paddingLeft={1}>
                                <Typography>{moduleName}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <NumberOfAppsIndicator moduleId={id}/>
                                <Chip label={sasName}/>
                            </Stack>
                        </Grid>

                        <Grid item xs={1} sm={1}>
                            <IconButton
                                sx={{color: 'orange'}}
                                onClick={(event) => onUpdateFavourites(event, {
                                    moduleId: id,
                                    moduleName,
                                    sasName
                                })}>
                                {isItemInFavourites({moduleName}) ? <StarIcon/> : <StarOutlineIcon/>}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Stack>
            </Card>
        </Grid>
    ));
};
