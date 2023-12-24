import React, { useState } from 'react';
import { Typography, Grid, Box, styled, IconButton, Dialog, DialogContent } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import SimpleDialog from 'app/components/Dialogs/SimpleDialog';
import FaModel from 'app/models/FaModel';
import Graphviz from 'graphviz-react';
import TransitionTable from '../TransitionTable';
import DfatoNfaDialog from 'app/components/Dialogs/DfatoNfaDialog';

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

// Define the ConvertNFAtoDFA component
// Parameters: faData - the finite automaton data
const ConvertNFAtoDFA = ({ faData }) => {
  // Define state variables for the dialog open state and the error dialog open state
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  // Define a function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Define a function to close the error dialog
  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  // Define a function to open the dialog or the error dialog based on whether the finite automaton is a NFA
  const handleOpen = () => {
    if (!faData.isNFA()) {
      setErrorOpen(true);
    } else {
      setOpen(true);
    }
  };

  // Return the component JSX
  return (
    <StyledBox>
      <div>
        <Typography sx={{ fontSize: '16px' }}>NFA to DFA</Typography>
        <Typography
          sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}
          variant="subtitle1"
        >
          Construct an equivalent DFA from an NFA
        </Typography>

        <StyledTypography onClick={handleOpen} sx={{ cursor: 'pointer' }}>
          Convert
        </StyledTypography>
        {faData && (
          <DfatoNfaDialog
            open={open}
            faData={faData}
            handleClose={handleClose}
            content={''}
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
      <Dialog open={errorOpen} onClose={handleErrorClose}>
        <DialogContent>
          <Typography>The provided automaton is not an NFA.</Typography>
        </DialogContent>
      </Dialog>
    </StyledBox>
  );
};

// Export the ConvertNFAtoDFA component as default
export default ConvertNFAtoDFA;
