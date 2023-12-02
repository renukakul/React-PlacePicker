import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Modal component that can be used to display content as a modal
function Modal({ open, children, onClose }) {
  // Create a ref to reference the <dialog> element
  const dialog = useRef();

  // useEffect hook to handle opening and closing the modal
  useEffect(() => {
    // If 'open' is true, show the modal; otherwise, close it
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]); // Re-run the effect when the 'open' prop changes

  // Use createPortal to render the <dialog> element outside the component's parent DOM hierarchy
  return createPortal(
    // Render the <dialog> element with the 'modal' class, ref to the dialog, and an onClose event handler
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {/* Render children only if the modal is open */}
      {open ? children : null}
    </dialog>,
    // Specify the target DOM node where the modal should be rendered using createPortal
    document.getElementById('modal')
  );
}

export default Modal;
