import { useDebounce } from '@/hooks';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';

export interface SearchBoxProps {
  debounce?: number;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  onTextFieldClick?: () => void;
}

export const SearchBox = ({ onSearchChange, placeholder, label, debounce = 300, onTextFieldClick }: SearchBoxProps) => {
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
    <TextField
      fullWidth
      onClick={onTextFieldClick}
      placeholder={placeholder}
      label={label}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: (theme) => theme.palette.grey[600] }} />
          </InputAdornment>
        ),
      }}
    />
  );
};
