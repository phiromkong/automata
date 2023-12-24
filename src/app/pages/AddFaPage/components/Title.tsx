import React, {useState} from 'react';
import { Button, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import useCtrlShiftKey from 'app/hooks/useCtrShiftKey';

// Define the Title component
// Parameters: control - the form control
const Title = ({ control }) => {
  // Initialize the state for whether the form is submitted
  const [isSubmitted, setSubmitted] = useState(false);

  // Define the submit handler
  const handleSubmit = () => {
    setSubmitted(true)
  }

  // Use the Ctrl+Shift key combination to submit the form
  // Note: This is not working as expected
  useCtrlShiftKey(() => handleSubmit());

  // Return the component JSX
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Controller for the title field */}
      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            size="small"
            onChange={onChange}
            sx={{ width: '40vw', position: 'relative', top: '14px' }}
            placeholder="Design FA..."
            variant="standard"
            value={value}
            InputProps={{ disableUnderline: true }}
          />
        )}
      />

      {/* Submit button */}
      <Button type="submit" sx={{ backgroundColor: '#5bd9d7', color: '#000' }}>
        Save My FA
      </Button>

      {/* Hidden submit button that is clicked when the form is submitted */}
      {
        !isSubmitted && <button type='submit' onClick={handleSubmit} style={{display: 'none'}}>
        </button>
      }

    </div>
  );
};

// Export the Title component as default
export default Title;
