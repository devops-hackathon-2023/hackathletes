import { Components, Theme } from '@mui/material';
import { listItemButton } from '@/theme/overrides/components/listItemButton';
import { merge } from 'lodash';
import textField from '@/theme/overrides/components/textField';
import { card } from '@/theme/overrides/components/card';

export function componentsOverrides(theme: Theme): Components {
  return merge({}, card(theme), listItemButton(theme), textField(theme));
}
