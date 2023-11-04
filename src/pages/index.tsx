import AllSases from '@/components/sections/AllSases';
import { Navbar } from '@/components/menu/Navbar';
import RecentSases from '@/components/sections/RecentSases';
import { Stack } from '@mui/material';
import { atomRecentSases } from '@/constants/state/atoms';
import { useAtom } from 'jotai';

const Home = () => {
  const [recentSasess, setRecentSasess] = useAtom(atomRecentSases);

  const clearRecentSases = () => {
    setRecentSasess((prev) => (prev = []));
  };

  return (
    <>
      <Navbar />
      <button onClick={() => clearRecentSases()}>clear recent sases</button>
      <Stack paddingX={15} spacing={2} paddingTop={2}>
        <RecentSases />
        <AllSases />
      </Stack>
    </>
  );
};

export default Home;
