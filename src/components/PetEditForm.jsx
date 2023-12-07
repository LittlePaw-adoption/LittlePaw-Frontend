import React, { useState } from "react";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

const PetEditForm = ({ pet, onCancel, onSave }) => {
  const [editedPet, setEditedPet] = useState({ ...pet });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPet((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Perform API call to update the pet details
    axios
    // id didnt work without the "_" ?! why ?
      .put(`${API_URL}/api/pets/${pet._id}`, editedPet, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Pet details updated successfully:", response.data);
        onSave(response.data);
      })
      .catch((error) => {
        console.error("Error updating pet details:", error);
      });
  };

  return (
    <div>
      <h2>Edit Pet Details</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={editedPet.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Species:
        <input
          type="text"
          name="species"
          value={editedPet.species}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Breed:
        <input
          type="text"
          name="breed"
          value={editedPet.breed}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={editedPet.age}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={editedPet.description}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default PetEditForm