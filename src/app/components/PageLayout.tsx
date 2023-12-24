// Import necessary components from React and local files
import React from 'react';
import Header from './Header';
import Footer from './Footer';

// Define the PageLayout component
// This component serves as a layout wrapper for any page in the application
// It includes a Header and Footer, and accepts any children to be rendered between them
const PageLayout = ({ children }) => {
  return (
    <>
      <Header /> 
      {children} 
      <Footer />
    </>
  );
};

// Export the PageLayout component so it can be used in other parts of the app
export default PageLayout;
