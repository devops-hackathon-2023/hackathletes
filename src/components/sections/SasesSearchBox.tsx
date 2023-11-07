import { useDebounce } from '@/hooks';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { ChangeEvent, useEffect, useState } from 'react';

export interface SearchBoxProps {
  debounce?: number;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  width?: number;
}

export const SasesSearchBox = ({ width, onSearchChange, placeholder, debounce = 300 }: SearchBoxProps) => {
  const [search, setSearch] = useState<string | null>(null);
  const { debouncedValue } = useDebounce<string | null>(search, debounce);

  const handleSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearch(ev.currentTarget.value);
  };

  useEffect(() => {
    if (debouncedValue !== null) {
      onSearchChange?.(debouncedValue);
    }
  }, [debouncedValue, onSearchChange]);

  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width,
        boxShadow: 'none',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      <InputBase
        inputProps={{ 'aria-label': placeholder }}
        placeholder={placeholder}
        sx={{
          ml: 1,
          flex: 1,
          color: 'text.light',
        }}
        onChange={handleSearchChange}
      />
      <SearchIcon />
    </Paper>
  );
};
