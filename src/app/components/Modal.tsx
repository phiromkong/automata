// Import necessary components and functions from React and Material UI
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

// Define a styled Dialog component with custom padding
// This component is a wrapper around the Material UI Dialog component
// It applies custom styles to the DialogContent and DialogActions components
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2), // Apply padding to the content of the dialog
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1), // Apply padding to the actions of the dialog
  },
}));

// Define the properties for the DialogTitle component
// id: The id of the title element
// children: The content of the title
// onClose: A function to call when the dialog should be closed
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

// Define a custom DialogTitle component
// This component is a wrapper around the Material UI DialogTitle component
// It applies custom styles to the title and accepts an onClose function
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children} 
    </DialogTitle>
  );
}

// Define the main component that uses the custom Dialog and DialogTitle
// This component accepts two props: open and setOpen
// open: A boolean indicating whether the dialog is open
// setOpen: A function to call to change the open state
export default function CustomizedDialogs({open, setOpen}) {

  // Define a function to close the dialog
  // This function calls setOpen with false, which will cause the dialog to close
  const handleClose = () => {
    setOpen(false);
  };

  // Render the component
  // The component consists of a BootstrapDialog with a BootstrapDialogTitle and some content
  // The content includes instructions on how to use the application
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose} // Call handleClose when the dialog needs to close
        aria-labelledby="customized-dialog-title" // Set the aria-labelledby for accessibility
        open={open} // Pass the open state to the dialog
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          How to use? 
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Typography variant='h6'>
            Short Cut Key (Key Binding)
          </Typography>
          <Typography gutterBottom>
            + <strong>ALT + /</strong>  - Search <br />
            + <strong>SHIFT + F1</strong>  - Open sort option and ↑ or ↓ to select click ENTER <br />
            + <strong>SHIFT + F2</strong>  - Open order option and ↑ or ↓ to select click ENTER <br />
            + <strong>SHIFT + A</strong>  - Go to create new Finite Automata page <br />
            + <strong>SHIFT + H</strong>  - Go to home page <br />
          </Typography>
          <Typography variant='h6'>
            Dashboard
          </Typography>
          <Typography gutterBottom>
            + <strong>Click on Title</strong> to view the FA or edit <br />
            + <strong>Click on ...</strong> to see the delete FA option <br />
            + <strong>Click Load More </strong> to fetch more FA <br />
          </Typography>
          <Typography variant='h6'>
            Create new FA
          </Typography>
          <Typography gutterBottom>
            + <strong>Input Title</strong> name it any way you want <br />
            + <strong>Input States</strong> e.g. q0,q1 <strong>Note: please seperate by comma</strong> <br />
            + <strong>Alphabet</strong> e.g. 0,1,2 <strong>Note: please seperate by comma</strong> <br />
            + <strong>Input Initial Start(Start State)</strong><br />
            + <strong>Input Final Start(End State)</strong><br />
            + <strong>Click Generate Transition</strong> to show the transition table <br />
            + <strong>Complete the Transition</strong><br />
            + <strong>Click on SAVE MY FA button</strong> to save before test any features<br />
            + <strong>Enjoy your testing</strong><br />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Thanks 
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
