import {
  Link as MUILink,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useLocales } from '@/locales';
import GitHubIcon from '@mui/icons-material/GitHub';
import NextLink from 'next/link';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Image from 'next/image';

const Home = () => {
  const { t, onChangeLang, currentLang } = useLocales();

  const handleChangeLang = () => onChangeLang(currentLang.value === 'en' ? 'cs' : 'en');

  return (
    <Box sx={{ width: 1, height: '100vh', bgcolor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Box sx={{ p: 3 }}>
          <Image alt="img" src="/ceska_sporitelna.png" width={114} height={51} />
        </Box>

        <Card maxWidth="sm" component={Stack} m="auto" sx={{ mt: 3 }}>
          <CardHeader
            title={t('logIn')}
            titleTypographyProps={{ variant: 'h4' }}
            subheader={t('logInDopo')}
            action={
              <Button variant="text" size="large" fullWidth onClick={handleChangeLang}>
                {currentLang.value === 'en' ? 'CZ' : 'EN'}
              </Button>
            }
          />

          <CardContent component={Stack} spacing={2}>
            <Button variant="outlined" size="large" fullWidth startIcon={<AlternateEmailIcon />}>
              {t('logWithMail')}
            </Button>

            <Button variant="contained" size="large" fullWidth startIcon={<GitHubIcon />}>
              {t('logWithGitHub')}
            </Button>

            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" sx={{ display: 'inline' }}>
                {t('noAccYet')}{' '}
              </Typography>
              <NextLink href="/" passHref>
                <MUILink variant="body1" sx={{ display: 'inline', textDecoration: 'none', fontWeight: 'bold' }}>
                  {t('signUp')}
                </MUILink>
              </NextLink>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

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
