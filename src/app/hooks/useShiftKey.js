// Import useEffect hook from React
import { useEffect } from 'react';

// Define a custom hook that triggers a callback when the Shift key and a specific key are pressed
const useShiftKey = (callback, key) => {
    // Use the useEffect hook to add and remove the event listener
    useEffect(() => {
        // Define a function that will be called when a keydown event is fired
        const handleKeyDown = (event) => {
            // Check if the Shift key is pressed and the key is the specific key
            if (event.shiftKey && event.key === key) {
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
    }, [callback, key]); // Pass the callback and key as dependencies to the useEffect hook
};

// Export the custom hook
export default useShiftKey;
