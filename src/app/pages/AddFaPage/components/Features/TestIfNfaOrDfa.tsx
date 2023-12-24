import React, { useState } from 'react';
import { Typography, Grid, Box, styled, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import SimpleDialog from 'app/components/Dialogs/SimpleDialog';
import FaModel from 'app/models/FaModel';
import Graphviz from 'graphviz-react';
import TransitionTable from '../TransitionTable';

// Define a styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  padding: '12px 16px',
  marginBottom: '24px',
  borderRadius: '4px',
  boxShadow:
    '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
}));

// Define a styled Typography component
const StyledTypography = styled(Typography)(({ theme }) => ({
  display: 'block',
  width: 'max-content',
  color: '#192849',
  marginTop: '30px',
}));

// Define the TestIfNfaOrDfa component
// Parameters: faData - the finite automaton data
const TestIfNfaOrDfa = ({ faData }) => {
  // Define state variable for the dialog open state
  const [open, setOpen] = useState(false);

  // Define a function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Define a function to open the dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Return the component JSX
  return (
    <StyledBox>
      <div>
        <Typography sx={{ fontSize: '16px' }}>
          Test if a FA is deterministic or non-deterministic
        </Typography>
        <Typography
          sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}
          variant="subtitle1"
        >
          DFA Or NFA
        </Typography>

        <StyledTypography onClick={handleOpen} sx={{ cursor: 'pointer' }}>
          Test
        </StyledTypography>
        {faData && (
          <SimpleDialog
            open={open}
            faData={faData}
            handleClose={handleClose}
            content={
              faData
                ? faData && faData.isNFA()
                  ? 'It is NFA'
                  : 'It is DFA'
                : 'Please Design FA first'
            }
            graph={
              <Graphviz
                dot={faData.toDotString()}
                options={{ height: '200px' }}
              />
            }
            transitionTable={<TransitionTable faData={faData} />}
          />
        )}
      </div>
      <div>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
    </StyledBox>
  );
};

// Export the TestIfNfaOrDfa component as default
export default TestIfNfaOrDfa;
