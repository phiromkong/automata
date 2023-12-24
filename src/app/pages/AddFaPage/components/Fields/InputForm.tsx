import React from 'react';

import {
  FormControl,
  TextField,
  styled,
  Box,
  Tooltip,
  InputLabel,
  FormHelperText,
} from '@mui/material';

// Define a styled TextField component
const InputField = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: '22px',
  },
}));

// Define the InputForm component
// Parameters: error - whether there is an error, errorMsg - the error message, toolTipValue - the tooltip value, label - the label, onChange - the change handler, props - other props
const InputForm = ({
  error,
  errorMsg,
  toolTipValue,
  label,
  onChange,
  ...props
}) => {
  // Return the component JSX
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" shrink>
        <Box sx={{ color: '#000000' }}>{label}</Box>
      </InputLabel>
      <Tooltip arrow title={toolTipValue} placement="bottom-end">
        <InputField
          error={error ? true : false}
          onChange={onChange}
          {...props}
        />
      </Tooltip>
      {error && (
        <FormHelperText variant="standard" error={true}>
          {errorMsg}
        </FormHelperText>
      )}
    </FormControl>
  );
};

// Export the InputForm component as default
export default InputForm;
