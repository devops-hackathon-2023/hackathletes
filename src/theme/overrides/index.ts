import { Components, Theme } from '@mui/material/styles';
import { card } from './components/card';
import { listItemButton } from '@/theme/overrides/components/listItemButton';
import { merge } from 'lodash';

export function componentsOverrides(theme: Theme): Components {
  return merge({}, card(theme), listItemButton(theme));
}
