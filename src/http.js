export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places");
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error("Faild to fetch places");
    }
    return responseData.places;
}

export async function UpdateUserPlaces(places) { 
    const response = await fetch("http://localhost:3000/user-places", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ places }),
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error("Faild to update places");
    }
    return responseData.message;
}