import AllSases from '@/components/sections/AllSases';
import Favourites from '@/components/sections/Favourites';
import { useAtom } from 'jotai';
import { useFetchUser } from '@/queries';
import { useEffect } from 'react';
import { DEFAULT_LOGIN_USER_ID } from '@/constants';
import {loggedUserAtom} from "@/state/atoms";
import MainPageLayout from "@/components/main-page/MainPageLayout";

const Home = () => {
    const [user, setUser] = useAtom(loggedUserAtom);
    const fetchData = useFetchUser(DEFAULT_LOGIN_USER_ID);

    useEffect(() => {
        if (fetchData.data) {
            setUser(fetchData.data);
        }
    }, [fetchData.data, setUser]);

    return (
        <MainPageLayout>
            <Favourites />
            <AllSases />
        </MainPageLayout>
    );
};

export default Home;
