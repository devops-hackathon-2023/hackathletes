import { atomWithStorage } from 'jotai/utils';
import { SasItem } from '../types';

export const atomRecentSases = atomWithStorage<SasItem[]>('recentSases', []);
