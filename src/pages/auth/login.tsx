import LoginView from '@/components/auth/LoginView';
import { SimpleLayout } from '@/components/layout';
import Head from 'next/head';

const Login = () => (
  <>
    <Head>
      <title> Login | DOPO</title>
    </Head>

    <SimpleLayout>
      <LoginView />
    </SimpleLayout>
  </>
);

export default Login;
