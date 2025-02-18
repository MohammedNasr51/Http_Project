import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [avilablePlaces, setAvilablePlaces] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchingPlaces() {
      try {
        setIsFetching(true);
        const response = await fetch("http://localhost:3000/places");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error("Faild to fetch places");
        }
        setAvilablePlaces(responseData.places);
      } catch (error) {
        console.log(error);
        setError({
          message: error.message || "faild to fetch data try again later",
        });
      }

      setIsFetching(false);
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
