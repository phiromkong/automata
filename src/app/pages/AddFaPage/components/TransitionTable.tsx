import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TextField } from '@mui/material';
import { getArrayFromValues } from 'utils/form-utils';

// Define the TransitionTable component
// Parameters: faData - the finite automata data
const TransitionTable = ({ faData }) => {
  // Destructure the finite automata data
  const { states, symbols, endStates, startState, transitions } = faData;

  // Return the component JSX
  return (
    <Box
      sx={theme => ({
        marginTop: '40px',
        marginLeft: '20px',
        [theme.breakpoints.down('md')]: { marginLeft: '0' },
      })}
    >
      {/* Table container */}
      <TableContainer component={Paper} variant="outlined">
        {/* Table */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Table head */}
          <TableHead>
            {/* Table row */}
            <TableRow>
              {/* Table cell for Q&sum; */}
              <TableCell
                sx={{
                  width: '200px',
                  borderRight: '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                Q&sum;
              </TableCell>
              {/* Table cells for symbols */}
              {getArrayFromValues(symbols).map((item, index) => (
                <TableCell
                  key={index}
                  sx={{
                    width: '200px',
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                  }}
                  align="center"
                >
                  {item === 'E' ? 'ε' : item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {/* Table rows for states */}
            {getArrayFromValues(states).map((row, index) => (
              <TableRow key={index}>
                {/* Table cell for state */}
                <TableCell
                  sx={{
                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                  }}
                  component="th"
                  scope="row"
                >
                  {/* Display the state with -> if it is the start state, * if it is an end state, or just the state */}
                  {startState === row
                    ? `-> ${row}`
                    : endStates.includes(row)
                    ? `* ${row}`
                    : `${row}`}
                </TableCell>
                {/* Table cells for transitions */}
                {getArrayFromValues(symbols).map((column, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: '200px',
                      borderRight: '1px solid rgba(224, 224, 224, 1)',
                    }}
                  >
                    {/* Display the transitions */}
                    {transitions[row][column]?.map((nextSymbol, index) => {
                      return index + 1 === transitions[row][column].length
                        ? `${nextSymbol ? nextSymbol : '∅'}`
                        : `${nextSymbol ? nextSymbol : '∅'} ,`;
                    })}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Export the TransitionTable component as default
export default TransitionTable;
