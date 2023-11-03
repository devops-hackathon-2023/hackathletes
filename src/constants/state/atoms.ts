import { atomWithStorage } from 'jotai/utils';
import { sasItem } from '../types';

export const atomRecentSases = atomWithStorage<sasItem[]>('recentSases', []);
