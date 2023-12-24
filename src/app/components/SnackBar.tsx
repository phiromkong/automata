// Import necessary components and functions from React and Material UI
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertColor, Slide } from '@mui/material';

// Define a custom Alert component
// This component is a wrapper around the Material UI Alert component
// It applies custom styles and forwards the ref to the underlying component
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Define the properties for the SnackBar component
// open: A boolean indicating whether the snackbar is open
// onClose: A function to call when the snackbar should be closed
// type: The severity of the alert (success, error, warning, info)
// content: The content of the alert
type SnackBarType = {
  open: boolean;
  onClose: () => void;
  type: AlertColor;
  content: string;
  [props: string]: any; // Any other props are also accepted
};

// Define a transition component for the snackbar
// This component makes the snackbar slide in from the left
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

// Define the SnackBar component
// This component displays a snackbar with a custom alert
const SnackBar = ({ open, onClose, type, content, ...props }: SnackBarType) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        {...props} // Pass any additional props to the Snackbar component
        TransitionComponent={TransitionLeft} // Use the custom transition component
        open={open} // Pass the open state to the Snackbar
        autoHideDuration={6000} // Automatically hide the snackbar after 6 seconds
        onClose={onClose} // Call onClose when the snackbar needs to close
      >
        <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
          {content}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

// Export the SnackBar component so it can be used in other parts of the app
export default SnackBar;
