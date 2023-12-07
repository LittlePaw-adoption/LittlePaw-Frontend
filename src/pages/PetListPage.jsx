import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PetListPage() {
  const [petsList, setPetsList] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(API_URL + "/api/pets", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPetsList(response.data);
      })
      .catch((error) => {
        console.log("Error getting the list of pets: ", error);
      });
  }, []);

  const handleAdoption = async (id) => {
    const petUpdate = petsList.find((pet) => pet._id === id);
    petUpdate.status = "Pending";
    console.log(petUpdate);
    try {
      const response = await axios.put(
        API_URL + `/api/pets/${petUpdate._id}`,
        petUpdate, {headers: {Authorization: `Bearer ${storedToken}`}}
      );
      setPetsList(prev => [...prev, response.data])
    } catch (error) {
      console.log(error);
    }
  };

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
              <div>
                <p>Status: {pets.status}</p>
                {pets.status === "Pending" ? <p>this pet is in process</p> :<button onClick={() => handleAdoption(pets._id)}>Apply</button> }
                
              </div>
              <Link to={`/pets/details/${pets._id}`}>View Details</Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default PetListPage;
