// Import the necessary libraries from React and Material-UI 
import * as React from 'react'; // The core library of React
import Container from '@mui/material/Container'; // Material-UI Container component 
import Typography from '@mui/material/Typography'; // Material-UI Typography for displaying text
import { Box } from '@mui/material'; // Material-UI Box component, it's a simple container component 

// Define the Footer component
export default function Footer() {
  return (
    // Box component used to wrap the content
    <Box
      component="footer" // Defining this box as a "footer" HTML component 
      sx={{
        // Styling the footer based on the theme color mode
        // If the theme palette mode is light, the background color is grey[200]; if mode is dark, the color is grey[800].
        backgroundColor: theme =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],

        // Add padding to the box for inner spacing
        p: 6,
      }}
    >
    
      {/* Container component to help with page structure and layout */}
      <Container maxWidth="lg">
      
        {/* The Typography components are used for displaying text and headers on the page */}
      
        {/* For the "About Us" heading, we use "h6" variant */}
        <Typography variant="h6" color="text.primary" gutterBottom>
            About Us
        </Typography>
        
        {/* For the actual text, we use the "body2" variant and the secondary color */}
        <Typography variant="body2" color="text.secondary">
        This application were designed by Phat Panhareach,  Kong Phirom,  Leap Chanvuthy,  Neang Rothmny,  and Sean Devid,  in course Automata 2023 @CADT .
        </Typography>
        
      </Container>
    </Box>
  );
}
