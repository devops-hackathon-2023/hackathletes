import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, CardContent, IconButton, InputAdornment } from '@mui/material';
import { useLocales } from '@/locales';
import { FormProvider, RHFTextField } from '@/components/form';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useBoolean } from '@/hooks';
import { useRouter } from 'next/router';

type FormValuesProps = {
  email: string;
  password: string;
};

const LoginView = () => {
  const router = useRouter();

  const { t } = useLocales();

  const [errorMsg] = useState('');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(t('emailValidation')).email(t('emailValidation')),
    password: Yup.string().required(t('passwordValidation')),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {  handleSubmit } = methods;

  const onSubmit = useCallback((data: FormValuesProps) => {
    // TODO: implement login logic
    router.push('/dashboard')
  }, [router]);

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">{t('logIn')}</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body1">{t('noAccYet')}</Typography>

        <Link href="/auth/register" variant="subtitle1" sx={{textDecoration: 'none'}}>
          {t('signUp')}
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label={t('emailAddress')} />

      <RHFTextField
        name="password"
        label={t('password')}
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                {password.value ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button fullWidth size="large" type="submit" variant="contained">
        {t('submit')}
      </Button>
    </Stack>
  );

  return (
    <Card maxWidth="sm" component={Stack} m="auto" sx={{ mt: 3 }}>
      <CardContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {renderHead}

          {renderForm}
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default LoginView;
