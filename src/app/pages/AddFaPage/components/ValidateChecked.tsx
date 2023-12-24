import React from 'react';
import {
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  styled,
} from '@mui/material';

// Define the ValidateChecked component
// Parameters: states - the states, alphabets - the alphabets, initialState - the initial state, endStates - the end states
const ValidateChecked = ({ states, alphabets, initialState, endStates }) => {
  // Return the component JSX
  return (
    <div style={{ flex: 1 }}>
      {/* Title */}
      <Typography variant="subtitle2">Transitions</Typography>
      {/* Subtitle */}
      <Typography
        sx={{ fontSize: '12px', marginTop: '14px' }}
        variant="subtitle1"
      >
        Please complete the check list to edit transition
      </Typography>
      <div>
        {/* Form group */}
        <FormGroup>
          {/* Form control label for states */}
          <FormControlLabel
            control={<Checkbox size="small" checked={states ? true : false} />}
            label="Add states"
          />
          {/* Form control label for alphabets */}
          <FormControlLabel
            control={
              <Checkbox size="small" checked={alphabets ? true : false} />
            }
            label="Add alphabets"
          />
          {/* Form control label for initial state */}
          <FormControlLabel
            control={
              <Checkbox size="small" checked={initialState ? true : false} />
            }
            label="Set initial state"
          />
          {/* Form control label for end states */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={endStates && endStates.length > 0 ? true : false}
              />
            }
            label="Set final state"
          />
        </FormGroup>
      </div>
    </div>
  );
};

// Export the ValidateChecked component as default
export default ValidateChecked;
