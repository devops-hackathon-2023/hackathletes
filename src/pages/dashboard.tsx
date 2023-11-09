import AllSases from '@/components/sections/AllSases';
import Favourites from '@/components/sections/Favourites';
import MainPageLayout from '@/components/main-page/MainPageLayout';

const Home = () => (
  <MainPageLayout>
    <Favourites />
    <AllSases />
  </MainPageLayout>
);

export default Home;
