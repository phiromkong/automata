// Import useEffect hook from React
import { useEffect } from 'react';

// Define a custom hook that triggers a callback when the Shift + S keys are pressed
const useCtrlShiftKey = (callback) => {
    // Use the useEffect hook to add and remove the event listener
    useEffect(() => {
        // Define a function that will be called when a keydown event is fired
        const handleKeyDown = (event) => {
            // Check if the Shift key is pressed and the key code is 83 (S key)
            if (event.shiftKey && event.keyCode === 83) {
                // If the condition is met, call the callback function
                callback();
                // Log a message to the console
                console.log('click shortcut key')
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
export default useCtrlShiftKey;
