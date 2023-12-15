import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

const ShelterEditForm = ({ shelter, onCancel, onSave }) => {
  const [editedShelter, setEditedShelter] = useState({ ...shelter });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedShelter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Perform API call to update the pet details
    axios
      // id didnt work without the "_" ?! why ?
      .put(`${API_URL}/api/shelters/${editedShelter._id}`, editedShelter, {
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
      <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 mt-10">
        <div className="col-span-full sm:col-span-3">
          <label className="text-sm">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={editedShelter.name}
              onChange={handleInputChange}
              className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
            />
          </label>
        </div>

        <label className="text-sm">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={editedShelter.location}
            onChange={handleInputChange}
            className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
          />
        </label>

        <label className="text-sm">
          <input
            type="text"
            placeholder="Contact"
            name="contact"
            value={editedShelter.contact}
            onChange={handleInputChange}
            className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
          />
        </label>

        <label className="text-sm">
          <textarea
            name="description"
            placeholder="Description"
            value={editedShelter.description}
            onChange={handleInputChange}
            className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
          />
        </label>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 cursor-pointer hover:dark:text-[#5bc0be]"
          onClick={onCancel}
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 cursor-pointer hover:dark:text-[#5bc0be]"
          onClick={handleSave}
        >
          <path
            fill-rule="evenodd"
            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default ShelterEditForm;
