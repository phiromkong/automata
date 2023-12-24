import React, { useState } from 'react';
import { Box, Divider, Grid, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

// Importing the different form components
import InputForm from './Fields/InputForm';
import SelectForm from './Fields/SelectForm';
import Title from './Title';
import TransitionForm from './TransitionForm';

// Importing the utility functions
import {
  getArrayFromValues,
  getDefaultValuesFromFaData,
} from 'utils/form-utils';

// Define the FormFields component
// Parameters: faData - the finite automaton data, onSubmit - the submit handler
const FormFields = ({ faData, onSubmit }) => {
  const location = useLocation();

  // Initialize the form control
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: getDefaultValuesFromFaData(faData),
  });

  // Initialize the state for whether the transition is generated
  const [isGenerated, setIsGenerated] = useState(faData ? true : false);

  // Define the function to reset the transition
  const resetTransition = () => {
    let inputted =
      getValues('states') &&
      getValues('symbols') &&
      getValues('startState') &&
      getValues('endStates') &&
      getValues('endStates').length > 0;

    if (inputted) {
      setValue('endStates', getValues().endStates);
      setValue('startState', getValues().startState);
      setValue('states', getValues().states);
      setValue('symbols', getValues().symbols);
      setValue('title', getValues().title);

      if (!isGenerated) {
        setIsGenerated(true);
      }
    }
  };

  // Return the component JSX
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Title control={control} />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginTop: '12px' }} />
        </Grid>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Input fields for states, symbols, start state, and end states */}
          {/* Button to generate or reset transitions */}
          {/* Transition form if transitions are generated */}
        </Box>
      </Grid>
    </form>
  );
};

// Export the FormFields component as default
export default FormFields;
