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
import SelectForm from './Fields/SelectForm';
import { Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

// Define the TransitionForm component
// Parameters: states - the states, symbols - the symbols, control - the form control
const TransitionForm = ({ states, symbols, control }) => {
  // Get the current location
  const location = useLocation();

  // Return the component JSX
  return (
    <Box
      sx={theme => ({
        marginTop: '40px',
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
                  {row}
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
                    {/* Controller for transition */}
                    {location.pathname !== '/add' ? (
                      <Controller
                        name={`${row}${column}`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <SelectForm
                            size="small"
                            multiple={true}
                            options={getArrayFromValues(states)}
                            value={value}
                            onChange={(event, reason, details) =>
                              onChange(reason)
                            }
                          />
                        )}
                      />
                    ) : (
                      <Controller
                        name={`${row}${column}`}
                        control={control}
                        render={({ field: { onChange } }) => (
                          <SelectForm
                            size="small"
                            multiple={true}
                            options={getArrayFromValues(states)}
                            onChange={(event, reason, details) =>
                              onChange(reason)
                            }
                          />
                        )}
                      />
                    )}
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

// Export the TransitionForm component as default
export default TransitionForm;
