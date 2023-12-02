import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

// Constant for the timer duration in milliseconds
const TIMER = 3000;

// Functional component DeleteConfirmation
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // useEffect hook to handle the timer logic
  useEffect(() => {
    // Log to the console when the timer is set
    console.log("TIMER SET");

    // Set a timeout that triggers the onConfirm callback after TIMER milliseconds
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // Cleanup function to clear the timeout when the component is unmounted or when onConfirm changes
    return () => {
      // Log to the console when cleaning up the timer
      console.log("Cleaning Up Timer");
      clearTimeout(timer);
    };
  }, [onConfirm]); // Dependency array includes onConfirm, so the effect runs when onConfirm changes

  // Render the delete confirmation UI
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        {/* Button to cancel the deletion */}
        <button onClick={onCancel} className="button-text">
          No
        </button>
        {/* Button to confirm and proceed with the deletion */}
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* Render the ProgressBar component with the specified timer duration */}
      <ProgressBar timer={TIMER} />
    </div>
  );
}