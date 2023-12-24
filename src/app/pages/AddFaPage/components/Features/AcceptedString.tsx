import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  styled,
  IconButton,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import StringAcceptedDialog from 'app/components/Dialogs/StringAcceptedDialog';
import { Graphviz } from 'graphviz-react';
import TransitionTable from '../TransitionTable';

// Define a styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  minHeight: '126px',
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
  textDecoration: 'none',
  color: '#192849',
  marginLeft: '6px',
}));

// Define the AcceptedString component
// Parameters: faData - the finite automaton data
const AcceptedString = ({ faData }) => {
  // Define state variables for the dialog open state and the test string
  const [open, setOpen] = useState(false);
  const [testString, setTestString] = useState('');

  // Check if the finite automaton is a NFA
  const isNfa = faData && faData.isNFA();

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
          Test if a string is accepted by a FA
        </Typography>
        <Typography
          sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}
          variant="subtitle1"
        >
          String accepted by the FA.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '14px' }}>
          <TextField
            size="small"
            sx={{ maxWidth: '100px' }}
            placeholder="abc..."
            value={testString}
            onChange={event => setTestString(event.target.value)}
          />
          <StyledTypography onClick={handleOpen} sx={{ cursor: 'pointer' }}>
            Test
          </StyledTypography>
        </Box>
        {faData && (
          <StringAcceptedDialog
            faData={faData}
            isAccepted={
              isNfa
                ? faData.stringAcceptedByNFA(testString)
                : faData.stringAcceptedByDFA(testString)
            }
            isNfa={isNfa}
            content={testString}
            open={open}
            handleClose={handleClose}
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

// Export the AcceptedString component as default
export default AcceptedString;
