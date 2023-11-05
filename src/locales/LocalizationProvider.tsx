import { PropsWithChildren } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const LocalizationProvider = ({ children }: PropsWithChildren) => (
  <MuiLocalizationProvider dateAdapter={AdapterDateFns}>{children}</MuiLocalizationProvider>
);
