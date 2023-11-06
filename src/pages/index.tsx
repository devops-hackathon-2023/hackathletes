import { SimpleLayout } from '@/components/layout/SimpleLayout';
import { LoginOptionsCard } from '@/components/LoginOptionsCard';
import Head from 'next/head';

const Home = () => (
  <>
    <Head>
      <title> Home | DOPO</title>
    </Head>

    <SimpleLayout>
      <LoginOptionsCard />
    </SimpleLayout>
  </>
);

export default Home;

// import AllSases from '@/components/sections/AllSases';
// import { AppBar } from '@/components/main-page/AppBar';
// import RecentSases from '@/components/sections/RecentSases';
// import { Stack } from '@mui/material';
// import { atomRecentSases } from '@/constants/state/atoms';
// import { useAtom } from 'jotai';

// const Home = () => {
//   const [, setRecentSasess] = useAtom(atomRecentSases);

//   const clearRecentSases = () => setRecentSasess([]);

//   return (
//     <>
//       <AppBar />
//       <button type="button" onClick={clearRecentSases}>
//         clear recent sases
//       </button>
//       <Stack paddingX={15} spacing={2} paddingTop={2}>
//         <RecentSases />
//         <AllSases />
//       </Stack>
//     </>
//   );
// };

// export default Home;
