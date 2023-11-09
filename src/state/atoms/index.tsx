import User from '@/types/User';
import { atomWithStorage } from 'jotai/utils';

export const loggedUserAtom = atomWithStorage<User | null>('loggedUser', null);
