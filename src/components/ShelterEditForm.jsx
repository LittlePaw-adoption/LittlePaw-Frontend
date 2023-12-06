import React, { useState } from "react";
import axios from "axios";

const ShelterEditForm = ({ pet, onCancel, onSave }) => {
  const [editedShelter, setEditedShelter] = useState({ ...shelter });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedShelter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Perform API call to update the pet details
    axios
    // id didnt work without the "_" ?! why ?
      .put(`${API_URL}/api/shelters/${shelter._id}`, editedShelter, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Shelter details updated successfully:", response.data);
        onSave(response.data);
      })
      .catch((error) => {
        console.error("Error updating shelter details:", error);
      });
  };

  return (
    <div>
      <h2>Edit Shelter Details</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={editedShelter.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={editedShelter.location}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Contact:
        <input
          type="number"
          name="contact"
          value={editedShelter.contact}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={editedShelter.description}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ShelterEditForm