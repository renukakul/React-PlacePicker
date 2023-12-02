import { useRef, useState, useEffect } from 'react';
import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

// Retrieve selected places from local storage and map them to the actual place objects
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  // Ref for the currently selected place
  const selectedPlace = useRef();
  // State for controlling the modal's open/closed state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // State for available places obtained from the user's location
  const [availablePlaces, setAvailablePlaces] = useState([]);
  // State for the user's picked places
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  // useEffect hook to fetch and sort available places based on user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // Sort places by distance based on user's location
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      // Set the sorted places to the state
      setAvailablePlaces(sortedPlaces);
    });
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Function to handle the start of place removal
  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  // Function to handle stopping place removal (closing the modal)
  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // Function to handle selecting a place
  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      // Find the place object by ID
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      // Add the selected place to the user's picked places
      return [place, ...prevPickedPlaces];
    });

    // Update local storage with the selected place ID
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        'selectedPlaces',
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  // Function to handle removing a place
  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);

    // Update local storage by removing the selected place ID
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    );
  }

  // JSX structure for rendering the app
  return (
    <>
      {/* Modal component for delete confirmation */}
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        {/* DeleteConfirmation component within the modal */}
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      {/* Header section */}
      <header>
        {/* Logo image */}
        <img src={logoImg} alt="Stylized globe" />
        {/* App title */}
        <h1>PlacePicker</h1>
        {/* App description */}
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>

      {/* Main content section */}
      <main>
        {/* Places component for user's picked places */}
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        {/* Places component for available places */}
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

// Exporting the App component as the default export
export default App;
