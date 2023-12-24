// Import the React library to use its functionality.
import React from 'react';

// Import Dialog from Material UI library to use to create a dialog box.
import { Dialog } from '@mui/material';

// Define the properties the BaseDialog component will accept.
// open: This is a boolean that determines whether the dialog is open.
// onClose: This is a function that will be called when the dialog needs to be closed.
// children: This are the child elements inside the dialog.
// props: These are any additional properties that the component can accept.
type BaseDialogType = {
  open: boolean;
  onClose: () => void;
  children: any;
  [props: string]: any;
};

// Define the BaseDialog component. 
// It accepts the props defined in the BaseDialogType and returns a Dialog component.
const BaseDialog = ({ open, onClose, children, ...props }: BaseDialogType) => (
  // Return the Dialog component. 
  // The spread '...props' is used to pass all of the properties in props to the Dialog.
  // open and onClose are set using the values passed to BaseDialog.
  // 'aria-labelledby' and 'aria-describedby' are set for accessibility reasons.
  <Dialog
    {...props}
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    {children}
  </Dialog>
);

// Export the BaseDialog component so it can be used in other parts of the app.
export default BaseDialog;
