import AllSases from '@/components/sections/AllSases';
import Favourites from '@/components/sections/Favourites';
import MainPageLayout from '@/components/main-page/MainPageLayout';

// alert('Automatically logged in') // TODO: login logic in LoginOptionsCard

const Home = () => (
  <MainPageLayout>
    <Favourites />
    <AllSases />
  </MainPageLayout>
);

export default Home;
