// Import necessary modules and components
import React from 'react'; // React library to build components
import BaseDialog from './BaseDialog'; // A Base dialog component which can be used in other parts of app
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  Box,
  useTheme, 
} from '@mui/material'; // Important UI components and hooks from Material UI
import { toStateString } from 'utils/string-utils'; // A utility function to convert states to string
import FaModel from 'app/models/FaModel'; // Import Finite Automata model from models
import Graphviz from 'graphviz-react'; // A library for graph visualization
import TransitionTable from 'app/pages/AddFaPage/components/TransitionTable'; // A component that displays the transition table
import NfaToDfaService from 'app/services/nfa_to_dfa/NfaToDfaService'; // A service that converts NFA to DFA

// The main Dialog component for converting DFA to NFA
const DfatoNfaDialog = ({
  content,
  open,
  handleClose,
  graph,
  transitionTable,
  faData,
}) => {
  const theme = useTheme(); // useTheme hook to have access to MaterialUI's theme

  // Initialize the service with provided finite automaton data
  const service = new NfaToDfaService(faData);

  // Convert given states, symbols, finalStates to string for display
  const states = toStateString('States', faData.states || []);
  const symbols = toStateString('Symbols', faData?.symbols || []);
  const finalStates = toStateString('Final states', faData?.endStates || []);

  // Convert NFA to DFA
  const newDfa = service.exec();
  console.log(newDfa.endStates);
  console.log(newDfa.toDotString());

  // Convert new DFA's states, symbols and finalStates to string for display
  const newStates = toStateString('States', newDfa.states || []);
  const newSymbols = toStateString('Symbols', newDfa?.symbols || []);
  const newFinalStates = toStateString('Final states', newDfa?.endStates || []);
  
  return (
    <BaseDialog open={open} onClose={handleClose}> 
      <DialogTitle sx={{ fontSize: '16px', fontWeight: '400' }}>
        NFA to DFA
      </DialogTitle>

      <DialogContent> 
        <Box sx={{ marginTop: '20px' }}> 
          <Typography>{states}</Typography>
          <Typography>{symbols}</Typography> 
          <Typography>{finalStates}</Typography>

          {graph}
          {transitionTable} 
        </Box>
        
        <Typography variant="h6" sx={{ marginTop: '20px' }}>
          After Convert
        </Typography>
      
        <Box sx={{ marginTop: '20px' }}> 
          <Typography>{newStates}</Typography> 
          <Typography>{newSymbols}</Typography>
          <Typography>{newFinalStates}</Typography>

          <Graphviz dot={newDfa.toDotString()} options={{ height: '200px' }} /> 
          <TransitionTable faData={newDfa} /> 
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          CLose
        </Button> 
      </DialogActions>
    </BaseDialog>
  );
};

export default DfatoNfaDialog; // Export the DfatoNfaDialog for use in other components
