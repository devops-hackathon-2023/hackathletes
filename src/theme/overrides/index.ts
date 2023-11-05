import { Components, Theme } from '@mui/material';
import { listItemButton } from '@/theme/overrides/components/listItemButton';
import { merge } from 'lodash';
import { card } from './components/card';

export const componentsOverrides = (theme: Theme): Components => merge({}, card(theme), listItemButton(theme));
