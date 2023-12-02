# React-PlacePicker
# Handling Side Effects &amp; Working with the useEffect() Hook

## What is Side Effect?
Side effects are "Tasks" that don't impact the current component render cycle.
A side effect refers to any code that is not directly related to updating the user interface but is necessary for other aspects of your application. Common side effects include data fetching, subscriptions, manually changing the DOM, and handling asynchronous operations.

# useEffect Hook
The useEffect hook is a fundamental part of the React Hooks API. It allows you to perform side effects in your functional components. Side effects are operations that happen outside of the normal React component rendering process, such as data fetching, subscriptions, manual DOM manipulations, or anything else that involves interacting with the external world. 

```
import { useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js'

function App() {
  const modal = useRef();
  const selectedPlace = useRef();

  const [availablePlaces, setAvailablePlaces] = useState([])
  const [pickedPlaces, setPickedPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition ((position) => {
      const sortedPlaces = sortPlacesByDistance (AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
      setAvailablePlaces(sortedPlaces);
    })
  }, 
  []);
  

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting Places by distance"
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}
export default App;
```

# Cleanup Function
The cleanup function in useEffect is an optional part of the hook that allows you to perform any necessary cleanup or resource disposal when the component is unmounted or before the next useEffect is executed.
Here's the basic syntax of useEffect with a cleanup function:
```
useEffect(() => {
  // Side effect code

  // Cleanup function (optional)
  return () => {
    // Cleanup code (unsubscribe, clear intervals, etc.)
  };
}, [dependencies]);
Explanation:
```

The side effect code runs when the component mounts and whenever the values in the dependency array (dependencies) change.

The cleanup function, returned by the useEffect, runs before the next useEffect or when the component is unmounted.

 the useEffect hook is used to create a timer using setTimeout. The timer is set to execute the onConfirm function after a delay of 3000 milliseconds (3 seconds). Additionally, a cleanup function is provided to the useEffect hook to clear the timer when the component unmounts or when the dependencies (in this case, an empty dependency array []) change.

Let's break down the useEffect and its cleanup function:
```
useEffect(() => {
  // Side effect code

  // Create a timer using setTimeout
  const timer = setTimeout(() => {
    // Execute the onConfirm function after 3000 milliseconds
    onConfirm();
  }, 3000);

  // Cleanup function
  return () => {
    // Clear the timer to prevent memory leaks
    clearTimeout(timer);
  };
}, []); // The empty dependency array means this effect runs only once on mount
```
Explanation:

Side Effect Code:

The code inside the useEffect sets up a timer using setTimeout. It schedules the execution of the onConfirm function after a delay of 3000 milliseconds.
Cleanup Function:

The cleanup function is returned by the useEffect. It runs before the next useEffect or when the component is unmounted.
In this example, the cleanup function is responsible for clearing the timer using clearTimeout to prevent it from executing if the component is unmounted before the 3000 milliseconds elapse.
Dependency Array:

The empty dependency array [] ensures that the useEffect runs only once when the component mounts. Since there are no dependencies, the effect doesn't depend on any changing values.
In summary, this useEffect sets up a timer to execute a function after a delay, and the cleanup function ensures that the timer is cleared if the component is unmounted before the scheduled function execution. This pattern is commonly used for delayed actions, like displaying a message for a short duration or triggering some behavior after a specific timeout.

# Dependencies

Certainly! In React, the `useEffect` hook is used for managing side effects in functional components. The hook takes two arguments: a function that contains the code for the effect, and an optional array of dependencies.

- **No Dependencies (`[]`):** If the dependencies array is empty, the effect runs once after the initial render, similar to `componentDidMount` in class components.

  ```jsx
  useEffect(() => {
    // Code to run after the initial render
    // ...

    return () => {
      // Cleanup code (optional)
      // ...
    };
  }, []);
  ```

- **With Dependencies:** If you provide dependencies in the array, the effect will run whenever any of those dependencies change.

  ```jsx
  useEffect(() => {
    // Code to run when dependencies change
    // ...

    return () => {
      // Cleanup code (optional)
      // ...
    };
  }, [dependency1, dependency2]);
  ```

Understanding and correctly specifying dependencies is crucial for controlling when the effect runs and for optimizing the performance of your React components. It helps ensure that the effect runs only when necessary and avoids unnecessary re-renders.