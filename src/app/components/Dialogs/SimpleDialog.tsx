// Import necessary dependencies from react and material-ui
import React from 'react';
import BaseDialog from './BaseDialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useTheme,
  Box,
} from '@mui/material';

// Utility function for converting states to strings
import { toStateString } from 'utils/string-utils';

// Define SimpleDialog Component, which is likely used to represent finite automaton (FA) data
const SimpleDialog = ({
  content, // Main text content to be displayed in alert dialog
  open, // Boolean to control visibility of dialog
  handleClose, // Function to handle closing of dialog
  graph, // Graphviz or similar component for visual representation of FA
  transitionTable, // Table to represent transitions of FA
  faData, // Data about the FA - states, symbols, and end states
}) => {
  // Accessing the default MUI theme to possibly override or refer to theme values later on
  const theme = useTheme();

  // Converting states, symbols and end states to readable strings
  const states = toStateString('States', faData.states || []);
  const symbols = toStateString('Symbols', faData?.symbols || []);
  const finalStates = toStateString('Final states', faData?.endStates || []);

  // Return the JSX to be rendered for this component
  return (
    // The BaseDialog component is referred here.
    <BaseDialog open={open} onClose={handleClose}>
    
      {/* The Title for the dialog box */}
      <DialogTitle sx={{ fontSize: '16px', fontWeight: '400' }}>
        Test if a FA is deterministic or non-deterministic
      </DialogTitle>

      <DialogContent>
        {/* Text Content for the dialog box */}
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>

        {/* Box component to wrap and provide styles to child content */}
        <Box sx={{ marginTop: '20px' }}>
          {/* Typography Components for displaying FA details */}
          <Typography>{states}</Typography>
          <Typography>{symbols}</Typography>
          <Typography>{finalStates}</Typography>
        </Box>

        {/* Graph and transition table components for visual and tabular representation of FA respectively */}
        {graph}
        {transitionTable}
      </DialogContent>

      {/* Dialog action button to close the dialog */}
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </BaseDialog>
  );
};

// Export default SimpleDialog Component for use in other parts of the application
export default SimpleDialog;
