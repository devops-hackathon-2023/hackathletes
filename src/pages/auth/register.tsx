import RegisterView from '@/components/auth/RegisterView';
import { SimpleLayout } from '@/components/layout';
import Head from 'next/head';

const Register = () => (
  <>
    <Head>
      <title> Register | DOPO</title>
    </Head>

    <SimpleLayout>
      <RegisterView />
    </SimpleLayout>
  </>
);

export default Register;
