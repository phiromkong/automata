// Import necessary libraries and components 
import * as React from 'react';
import styled from 'styled-components/macro'; // Library for handling CSS in JS
import { Helmet } from 'react-helmet-async'; // Component for managing changes to the document head
import { Link } from 'react-router-dom'; // Component for declarative, accessible navigation around your application
import { Button, Box } from '@mui/material'; // Import Material-UI components

// Define NotFoundPage component
export function NotFoundPage() {
  return (
    <>
      <Helmet>
        {/* Page title and description for SEO purposes */}
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        {/* Displaying a title */}
        <Title>Unauthenticated</Title>
        {/* Box component used for structuring layout */}
        <Box sx={{ display: 'flex' }}>
          {/* Send the user to Home or Login pages */}
          <Link to="/">
            <Button sx={{ backgroundColor: '#5bd9d7', color: '#000' }}>
              Home
            </Button>
          </Link>
          <div style={{ margin: '10px' }}></div>
          <Link to="/login">
            <Button sx={{ backgroundColor: '#5bd9d7', color: '#000' }}>
              Login
            </Button>
          </Link>
        </Box>
      </Wrapper>
    </>
  );
}

// Styled-components allows us to write actual CSS code to style our components. Here is the CSS for Wrapper component
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

// And here is the CSS for Title component
const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: black;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
