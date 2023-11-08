import {useAtom} from 'jotai';
import {useRouter} from 'next/router';
import {updateUser, useFetchSasModules, useFetchUser} from '@/queries';
import {AppModule, SasItem} from '@/constants/types';
import {Chip, Grid, IconButton, Stack, Typography} from '@mui/material';
import {loggedUserAtom} from "@/state/atoms";
import {DEFAULT_USER} from "@/constants";
import {toggleItemInArray} from "@/actions";
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface SasModulesProps {
    sasItem: SasItem;
    searchTerm: string;
}

export const SasModules = ({sasItem, searchTerm}: SasModulesProps) => {

    const [loggedUser] = useAtom(loggedUserAtom);
    const fetchedData = useFetchUser(loggedUser.id);
    const user = fetchedData.data;
    const {favourites} = user || DEFAULT_USER;

    const updateFavourites = (item: any) => {
        if (user) {
            toggleItemInArray(user.favourites, item);
            updateUser(user.id, user);
        }
    };

    const {isLoading, error, data} = useFetchSasModules(sasItem.id);

    const {name: sasName} = sasItem;

    const {push} = useRouter();

    const onClick = async (item: SasItem, moduleName: string) => {
        await push(`/${sasName}/${moduleName}/dashboard`);
    };

    const filteredData = searchTerm ? data?.page.filter(({name}: AppModule) => name.includes(searchTerm)) : data?.page;

    if (isLoading) return <h2>Loading...</h2>;

    if (error) return <h2>{error.message}</h2>;

    return filteredData.map(({name: moduleName, id}: AppModule) => (
        <Grid item xs={12} key={id}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                onClick={() => onClick(sasItem, moduleName)}
            >
                <Stack bgcolor="primary.main" height="100px" alignItems="center" justifyContent="center" width={150}>
                    img
                </Stack>
                <Typography>{moduleName}</Typography>
                <Typography>4 Aps</Typography>
                <Chip label={sasName}/>
                <IconButton sx={{color: 'orange'}} onClick={() => updateFavourites({name: moduleName, id})}>
                    <StarOutlineIcon/>
                </IconButton>
            </Stack>
        </Grid>
    ));
};
