// Necessary Libraries and Components import.
import React from 'react';

// Import BaseDialog where most of the styling and structure is defined.
import BaseDialog from './BaseDialog';

// Icons to represent acceptance or rejection of the string.
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

// Material UI component for design consistency.
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery, // not actually used - possibly remove
  Box,
  useTheme,
  IconButton, // not actually used - possibly remove
  Avatar,
} from '@mui/material';

// Helper function to convert a list of states to a string
import { toStateString } from 'utils/string-utils';

// Main Component
const StringAcceptedDialog = ({
  isAccepted,     // Depicts if string is accepted or rejected
  isNfa,          // Boolean to distinguish between DFA and NFA
  content,        // The string to be tested
  open,           // Controls the visibility of the dialog
  handleClose,    // Callback function to close the dialog
  graph,          // Graph visualization of FA
  transitionTable, // Display of transition table of FA
  faData,         // Data of FA
}) => {
  // Accessing theme for design consistency.
  const theme = useTheme();

  // Converting details about states, symbols and final states of FA to string.
  const states = toStateString('States', faData.states || []);
  const symbols = toStateString('Symbols', faData?.symbols || []);
  const finalStates = toStateString('Final states', faData?.endStates || []);
  
  return (
    // Wrapping the complete Component inside the BaseDialog.
    <BaseDialog open={open} onClose={handleClose}>
  
      <DialogTitle sx={{ fontSize: '16px', fontWeight: '400', postition: 'relative', width: '100%' }}>
      Test if a string is accepted by a FA
        <Avatar
          sx={{
            position: 'absolute',
            backgroundColor: isAccepted ? theme.palette.success.main : theme.palette.error.main,
            right: '24px',
            top: '24px',
          }}>
          {/* If the string is accepted, show check icon, otherwise show close icon */}
          {isAccepted ? <CheckIcon /> : <CloseIcon />}
        </Avatar>
      </DialogTitle>
  
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          String <b>{content}</b>
          {isAccepted ? ' is accepted' : ' is rejected'} by{isNfa ? ' NFA' : ' DFA'}
        </DialogContentText>
        
        {/* Display the FA as a graph */}
        {graph}
        
        <Box sx={{ marginTop: '20px' }}>
          {/* List all the states, symbols and final states */}
          <Typography>{states}</Typography>
          <Typography>{symbols}</Typography>
          <Typography>{finalStates}</Typography>
        </Box>
        
        {/* Display the transition table */}
        {transitionTable}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} autoFocus>CLOSE</Button>
      </DialogActions>
    </BaseDialog>
  );
};
//Exporting the main Component for use in other parts of the application
export default StringAcceptedDialog;
