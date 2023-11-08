import {Typography, Stack, Grid} from '@mui/material';
import {updateUser, useFetchUser} from '@/queries';
import {useAtom} from 'jotai';
import {DEFAULT_USER} from '@/constants';
import {loggedUserAtom} from "@/state/atoms";
import {toggleItemInArray} from "@/actions";
import {useQueryClient} from "react-query";
import {FavouriteItem} from '../FavouriteItem';

const Favourites = () => {
    const [loggedUser] = useAtom(loggedUserAtom);
    const fetchedData = useFetchUser(loggedUser.id);
    const user = fetchedData.data;
    const {favourites} = user || DEFAULT_USER;
    const queryClient = useQueryClient()

    const updateFavourites = (item: any) => {
        if (user) {
            toggleItemInArray(user.favourites, item);
            updateUser(user.id, user, queryClient);
        }
    };

    const navigateToDetails = () => {
    };

    return (
        <>
            <Typography>Oblíbené moduly:</Typography>
            <Stack>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {favourites?.map((item: any, idx: number) => (
                        <Grid item key={idx} xs={2} sm={4} md={4}>
                            <FavouriteItem key={idx} item={item} onItemClick={navigateToDetails}
                                           onStarClick={updateFavourites}/>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </>
    );
};

export default Favourites;
