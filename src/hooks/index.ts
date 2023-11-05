import { useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { getPageTitle } from '@/utils';

export const useIsMobile = (): boolean => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('md'));
};

export const usePageTitle = (): string => {
  const router = useRouter();

  return getPageTitle(router.asPath);
};
