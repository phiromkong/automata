// Necessary imports
import React from 'react'; // React library
import BaseDialog from './BaseDialog'; // Base dialog component
import FaModel from 'app/models/FaModel'; // Finite Automata model
import {
  // Import various components and hooks from Material UI
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useTheme,
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  StepConnector,
} from '@mui/material';
import { toStateString, toMergeString } from 'utils/string-utils'; // Utilities to convert states and sets to string
import MinimizeDFAService from 'app/services/minimize_dfa/MinimizeDfaService'; // Service for minimizing DFA
import Graphviz from 'graphviz-react'; // Graphviz component for visual representation
import TransitionTable from 'app/pages/AddFaPage/components/TransitionTable'; // Table to represent transitions

// Define the MinimizeDialog component
const MinimizeDialog = ({
  content,
  open,
  handleClose,
  graph,
  transitionTable,
  faData,
}) => {
  // Getting access to the theme
  const theme = useTheme();

  // Preparing strings from the automaton data
  const states = toStateString('States', faData?.states || []);
  const symbols = toStateString('Symbols', faData?.symbols || []);
  const finalStates = toStateString('Final states', faData?.endStates || []);

  // Creating an instance of the MinimizeDFAService with the given finite automaton data
  const minimizeService = new MinimizeDFAService(faData);
  minimizeService.exec(); // Execute the minimization

  // Get results from each step of the minimization
  const result1 = minimizeService.step1Result;
  const result2 = minimizeService.step2Result;
  const result3 = minimizeService.step3Result;

  // Create a model of the minimized DFA
  const abc = new FaModel(
    result3.newFA.states,
    result3.newFA.symbols,
    result3.newFA.startState,
    result3.newFA.endStates,
    result3.newFA.transitions,
  );
  console.log(result3.newFA, result3.newFA.toDotString());

  const stepper = [
    // Define the steps to show in the stepper
    {
      title: 'Remove None Accessible States',
      content: `${toStateString(
        'States',
        result1.removedStates,
      )} is removed due to none accessible from start state ${
        faData.startState
      }. 
      ${toStateString('Remain States', result1.accessibleStates)}`,
    },
    {
      title: 'Merge Equal States',
      content: `Equal states are ${toMergeString(result2.mergedEqualStates)}`,
    },
    {
      title: 'Construct the minimized DFA.',
      content: (
        <Typography variant="body1">
          New DFA:
          <br />
          Start state: {result3.newFA.startState}
          <br />
          {toStateString('Final States', result3.newFA.endStates)} <br />
          {toStateString('States', result3.newFA.states)}
        </Typography>
      ),
    },
  ];

  return (
    // Use BaseDialog component and provide it with open and handleClose props
    <BaseDialog open={open} onClose={handleClose}>
      <DialogActions
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0,
        }}
      >
        <DialogTitle
          sx={{ fontSize: '20px', fontWeight: '500', padding: '16px 16px' }}
        >
          Minimize DFA
        </DialogTitle>
        <Button sx={{ padding: '16px 16px' }} onClick={handleClose} autoFocus>
          CLose
        </Button>
      </DialogActions>

      <DialogContent dividers>
        <Stepper
          connector={<StepConnector sx={{ marginLeft: '24px' }} />}
          activeStep={0}
          nonLinear
          orientation="vertical"
        >
          {stepper.map((step, index) => (
            <Step key={index} active={true}>
              <StepLabel
                sx={{ fontSize: '20px', fontWeight: '500' }}
                StepIconProps={{
                  active: false,
                  sx: {
                    width: '48px',
                    height: '48px',
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                {step.title}
              </StepLabel>

              <StepContent sx={{ marginLeft: '24px', paddingLeft: '34px' }}>
                {step.content}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <DialogContentText id="alert-dialog-description">
          <Graphviz dot={abc.toDotString()} options={{ height: '200px' }} />
          {/* <TransitionTable faData={result3.newFA} /> */}
        </DialogContentText>
      </DialogContent>
    </BaseDialog>
  );
};

// Export component for usage in other parts of the application
export default MinimizeDialog;
