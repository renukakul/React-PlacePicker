import { useState, useEffect } from "react";

// Functional component ProgressBar
export default function ProgressBar({ timer }) {
    // State variable for remaining time, initialized with the value of the 'timer' prop
    const [remainingTime, setRemainingTime] = useState(timer);

    // useEffect hook for managing the interval and updating the remaining time
    useEffect(() => {
        // Log to the console when the interval is set up
        console.log('INTERVAL');

        // Set up an interval that runs every 10 milliseconds
        const interval = setInterval(() => {
            // Update the remaining time by subtracting 10 from the previous time
            setRemainingTime(prevTime => prevTime - 10);
        }, 10);

        // Cleanup function to clear the interval when the component is unmounted
        return () => {
            clearInterval(interval);
        };
    }, []); // Empty dependency array ensures the effect runs only on mount and cleans up on unmount

    // Render a progress bar with the 'value' set to 'remainingTime' and 'max' set to the initial 'timer' value
    return (
        <progress value={remainingTime} max={timer} />
    );
}
