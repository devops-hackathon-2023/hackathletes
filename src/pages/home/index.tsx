import AllSases from '@/components/sections/AllSases';
import { Navbar } from '@/components/menu/Navbar';
import RecentSases from '@/components/sections/RecentSases';
import { Stack } from '@mui/material';

export function Home() {
  return (
    <>
      <Navbar />
      <Stack paddingX={15} spacing={2} paddingTop={2}>
        <RecentSases />
        <AllSases />
      </Stack>
    </>
  );
}
