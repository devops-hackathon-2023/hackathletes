import merge from 'lodash/merge';
import { Theme } from '@mui/material/styles';
import { card } from './components/card';

export function componentsOverrides(theme: Theme) {
  const components = merge(card(theme));

  return components;
}
