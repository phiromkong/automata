import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import useSearchKey from 'app/hooks/useSearchKey';


const Search = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>();
  
  useSearchKey(() => inputRef.current?.focus());

  return (
    <Grid item xs={12} md={3}>
      <TextField
        size="medium"
        fullWidth
        inputRef={inputRef}
        onChange={onSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default Search;
