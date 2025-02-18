import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [avilablePlaces, setAvilablePlaces] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchingPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvilablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        console.log(error);
        setError({
          message: error.message || "faild to fetch data try again later",
        });
        setIsFetching(false);
      }
    }
    fetchingPlaces();
  }, []);
  if (error) {
    return <Error title={"An Error occurred"} message={error.message} />;
  }
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
