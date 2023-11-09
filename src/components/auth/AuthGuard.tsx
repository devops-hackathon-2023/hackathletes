import { loggedUserAtom } from '@/state/atoms';
import { getItemFromSessionStorage } from '@/utils';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  const [loggedUser] = useAtom(loggedUserAtom);

  const check = useCallback(() => {
    const savedUser = getItemFromSessionStorage('user');

    if (!savedUser && !loggedUser) {
      const searchParams = new URLSearchParams({ returnTo: window.location.href }).toString();

      const href = `/auth/login?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [loggedUser, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};
