import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [avilablePlaces, setAvilablePlaces] = useState([]);
  useEffect(() => {
    async function fetchingPlaces() {
      const response = await fetch('http://localhost:3000/places');
      const responseData = await response.json();
      setAvilablePlaces(responseData.places);
    }
    fetchingPlaces();
  },[]);
  return (
    <Places
      title="Available Places"
      places={avilablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
