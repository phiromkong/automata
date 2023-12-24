// Import necessary packages and components from libraries
import React from 'react'; // core package necessary to build components in React
import BaseDialog from './BaseDialog'; // component created to serve as a wrapper for any dialog box in your application
// import necessary components and hooks from Material UI for building the Delete Confirmation Dialog
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from '@mui/material';

// utility function for handling states
import { toStateString } from 'utils/string-utils';

// DeleteDialog is a component offering a UI to confirm deleting a particular data
const DeleteDialog = ({ content, open, handleClose, onDelete }) => {
  const theme = useTheme(); // useTheme hook enables access to the default MUI theme

  // Render the Dialog box, which includes: title, content, and action buttons 
  return (
    <BaseDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: '16px', fontWeight: '400' }}>
        Are you sure you want to delete this data?
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          CLose
        </Button>
        
        <Button onClick={onDelete}>Delete</Button>
      </DialogActions>
    </BaseDialog>
  );
};

// Exports the DeleteDialog for use in other components
export default DeleteDialog;
