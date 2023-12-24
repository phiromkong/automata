import { Typography, Grid, Box, styled, IconButton } from '@mui/material';

import React from 'react';
// Importing the different feature components
import TestIfNfaOrDfa from './Features/TestIfNfaOrDfa';
import AcceptedString from './Features/AcceptedString';
import ConvertNFAtoDFA from './Features/ConvertNFAtoDFA';
import MinimizeDfa from './Features/MinimizeDfa';

// Define the Features component
// Parameters: faData - the finite automaton data
const Features = ({ faData }) => {
  // Return the component JSX
  return (
    <div style={{ marginTop: '64px' }}>
      <Typography variant="h4">Other Features</Typography>
      <Box sx={{paddingTop: '20px'}}>
        <Box>
          {/* Test if the FA is NFA or DFA */}
          <TestIfNfaOrDfa faData={faData} />
        </Box>
        <Box>
          {/* Check if a string is accepted by the FA */}
          <AcceptedString faData={faData} />
        </Box>
        <Box>
          {/* Convert NFA to DFA */}
          <ConvertNFAtoDFA faData={faData} />
        </Box>
        <Box>
          {/* Minimize DFA */}
          <MinimizeDfa faData={faData} />
        </Box>
      </Box>
    </div>
  );
};

// Export the Features component as default
export default Features;
