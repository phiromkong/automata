import React from 'react';

import {
  FormControl,
  TextField,
  styled,
  Box,
  InputLabel,
  Autocomplete,
  FormHelperText,
} from '@mui/material';
import { FieldError, Message } from 'react-hook-form';

// Define a styled Autocomplete component
const SelectField = styled(Autocomplete)(({ theme }) => ({
  'label + &': {
    marginTop: '22px',
  },
}));

// Define the style for error state
const errorStyle = {
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: '1px solid red',
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: '1px solid red',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid red',
  },
};

// Define the type for the component props
type SelectProps = {
  error?: FieldError[] | FieldError;
  errorMsg?: Message;
  multiple?: boolean;
  label?: string;
  [props: string]: any;
};

// Define the SelectForm component
// Parameters: error - whether there is an error, errorMsg - the error message, label - the label, multiple - whether multiple selection is allowed, options - the options for the select, onChange - the change handler, props - other props
const SelectForm = ({
  error,
  errorMsg,
  label,
  multiple,
  options,
  onChange,
  ...props
}: SelectProps) => {
  // Return the component JSX
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" shrink>
        <Box sx={{ color: '#000000' }}>{label}</Box>
      </InputLabel>
      <SelectField
        sx={error ? errorStyle : {}}
        {...props}
        multiple={multiple}
        onChange={onChange}
        options={options}
        renderInput={params => <TextField {...params} />}
      />
      {error && (
        <FormHelperText variant="standard" error={true}>
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
};

// Export the SelectForm component as default
export default SelectForm;
