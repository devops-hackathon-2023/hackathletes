import { Link as MUILink, Box, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { useLocales } from '@/locales';
import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useRouter } from 'next/router';

export const LoginOptionsCard = () => {
  const router = useRouter();

  const { t, onChangeLang, currentLang } = useLocales();

  const handleChangeLang = () => onChangeLang(currentLang.value === 'en' ? 'cs' : 'en');

  return (
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
        <Button
          variant="outlined"
          size="large"
          fullWidth
          startIcon={<AlternateEmailIcon />}
          onClick={() => router.push('auth/login')}
        >
          {t('logWithMail')}
        </Button>

        <Button disabled variant="contained" size="large" fullWidth startIcon={<GitHubIcon />}>
          {t('logWithGitHub')}
        </Button>

        <Box sx={{ pt: 2 }}>
          <Typography variant="body1" sx={{ display: 'inline' }}>
            {t('noAccYet')}{' '}
          </Typography>
          <MUILink
            href="/auth/register"
            variant="body1"
            sx={{ display: 'inline', textDecoration: 'none', fontWeight: 'bold' }}
          >
            {t('signUp')}
          </MUILink>
        </Box>
      </CardContent>
    </Card>
  );
};
