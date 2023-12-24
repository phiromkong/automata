// Import React and useLocation hook from 'react-router-dom'
import React from 'react';
import { useLocation } from 'react-router-dom';

// Define a custom hook that returns the query parameters of the current URL
const useQuery = () => {
  // Use the useLocation hook to get the current location object
  const { search } = useLocation();

  // Use the useMemo hook to memoize the creation of the URLSearchParams object
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

// Export the custom hook
export default useQuery;
