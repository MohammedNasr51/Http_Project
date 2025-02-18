import { useState, useEffect } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [avilablePlaces, setAvilablePlaces] = useState([]);
  useEffect(() => {
    async function fetchingPlaces() {
      setIsFetching(true);
      const response = await fetch("http://localhost:3000/places");
      const responseData = await response.json();
      setAvilablePlaces(responseData.places);
      setIsFetching(false);
    }
    fetchingPlaces();
  }, []);
  return (
    <Places
      title="Available Places"
      places={avilablePlaces}
      isLoading={isFetching}
      loadingText="Fetching data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
