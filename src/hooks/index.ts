import { useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPageTitle } from '@/utils';

export const useIsMobile = (): boolean => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('md'));
};

export const usePageTitle = (): string => {
  const router = useRouter();

  return getPageTitle(router.asPath);
};

/**
 * Hook for debouncing any value after specific delay in milliseconds
 *
 * @param value Value to be debounced
 * @param delay Delay in milliseconds after which the value is updated
 * @returns Object containing debounced value and boolean incicating whether debouncing is in progress
 */
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const timeoutHandler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(timeoutHandler);
      setIsDebouncing(false);
    };
  }, [value, delay]);

  return { debouncedValue, isDebouncing };
};
