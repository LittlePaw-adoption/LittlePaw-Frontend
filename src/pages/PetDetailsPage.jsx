import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

function PetDetailsPage() {
  const [pet, setPet] = useState(null);
  const { petId } = useParams();

  useEffect(() => {
    // Fetch pet details using Axios
    axios
      .get(`${API_URL}/api/pets/${petId}` ,{ headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setPet(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pet details:", error);
      });
  }, [petId]);

  return (
    <div>
      {pet ? (
        // Display pet details
        <div className="card">
          <h2>{pet.name}</h2>
          <p>Species: {pet.species}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>

          {pet.description && <p>Description: {pet.description}</p>}

          <button>Edit</button>
          <button>Delete</button>
        </div>
      ) : (
        // Loading message
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PetDetailsPage;