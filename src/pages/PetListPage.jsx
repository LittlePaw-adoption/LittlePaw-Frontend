import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PetListPage() {
  const [petsList, setPetsList] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(API_URL + "/api/pets", { headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setPetsList(response.data);
      })
      .catch((error) => {
        console.log("Error getting the list of pets: ", error);
      });
  }, []);

  return (
    <div>
      {petsList === null ? (
        <p>Loading...</p>
      ) : (
        petsList.map((pets) => {
          return (
            <div>
              <p>Name: {pets.name}</p>
              <p>Species: {pets.species}</p>
              <p>Breed: {pets.breed}</p>
              <p>Age: {pets.age}</p>
              <p>Description: {pets.description}</p>
              <Link to={`/pets/details/${pets._id}`}>View Details</Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default PetListPage;
