import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { useBoolean } from '@/hooks';
import { RHFTextField, FormProvider } from '@/components/form';
import { useLocales } from '@/locales';
import { Button, Card, CardContent } from '@mui/material';
import { registerUser } from '@/queries';
import { useQueryClient } from 'react-query';
import { useAtom } from 'jotai';
import { loggedUserAtom } from '@/state/atoms';
import { useRouter } from 'next/router';
import User from '@/types/User';

type FormValuesProps = {
  email: string;
  role: string;
  password: string;
  passwordConfirm: string;
  name: string;
};

const RegisterView = () => {
  const router = useRouter();

  const [, setLoggedUser] = useAtom(loggedUserAtom);

  const queryClient = useQueryClient();

  const { t } = useLocales();

  const [errorMsg] = useState('');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(t('requiredField')),
    role: Yup.string().required(t('requiredField')),
    email: Yup.string().required(t('requiredField')).email(t('emailValidation')),
    password: Yup.string().required(t('requiredField')),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], t('passwordMatch'))
      .required(t('requiredField')),
  });

  const defaultValues = {
    name: '',
    email: '',
    role: '',
    password: '',
    passwordConfirm: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      // TODO: implement register logic
      const response = await registerUser(
        {
          ...data,
          favourites: [],
          id: String(Math.floor(Math.random() * 1000)),
          profilePicture: '/profile-pictures/fousek.jpg',
        },
        queryClient
      );

      if ((response as User).email === data.email) {
        setLoggedUser(response);

        router.push('/dashboard');
      }
    },
    [queryClient, setLoggedUser, router]
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">{t('signUp')}</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body1">{t('alreadyAcc')}</Typography>

        <Link href="/auth/login" component={NextLink} variant="subtitle1" sx={{ textDecoration: 'none' }}>
          {t('logIn')}
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField name="name" label={t('name')} />

        <RHFTextField name="email" label={t('emailAddress')} />

        <RHFTextField name="role" label={t('role')} />

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

        <RHFTextField
          name="passwordConfirm"
          label={t('passwordConfirm')}
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
    </FormProvider>
  );

  return (
    <Card maxWidth="sm" component={Stack} m="auto" sx={{ mt: 3 }}>
      <CardContent>
        {renderHead}

        {renderForm}
      </CardContent>
    </Card>
  );
};

export default RegisterView;
