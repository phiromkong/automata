// Import useEffect hook from React
import { useEffect } from 'react';

// Define a custom hook that triggers a callback when the Alt + / keys are pressed
const useSearchKey = (callback) => {
    // Use the useEffect hook to add and remove the event listener
    useEffect(() => {
        // Define a function that will be called when a keydown event is fired
        const handleKeyDown = (event) => {
            // Check if the Alt key is pressed and the key code is 191 (/ key)
            if (event.altKey && event.keyCode === 191) {
                // If the condition is met, call the callback function
                callback();
            }
        };

        // Add the keydown event listener to the document
        document.addEventListener('keydown', handleKeyDown);

        // Return a cleanup function that will be called when the component unmounts
        return () => {
            // Remove the keydown event listener from the document
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [callback]); // Pass the callback as a dependency to the useEffect hook
};

// Export the custom hook
export default useSearchKey;
