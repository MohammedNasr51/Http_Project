import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [avilablePlaces, setAvilablePlaces] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/places')
      .then((response) => {
        return response.json();
      }).then((responseData) => {
        setAvilablePlaces(responseData.places);
      })
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
