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
