import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

function PetCreatePage() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const requestBody = {
    name,
    species,
    breed,
    age,
    description,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_URL + "/api/pets/", requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setName("");
        setSpecies("");
        setBreed("");
        setAge("");
        setDescription("");
        navigate("/pets")
      })
      .catch((error) => {
        console.log("Error creating a post: ", error);
      });
  };
  
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              required={true}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label>
            Species:
            <input
              type="text"
              name="species"
              required={true}
              onChange={(e) => {
                setSpecies(e.target.value);
              }}
            />
          </label>
          <label>
            Breed:
            <input
              type="text"
              name="breed"
              onChange={(e) => {
                setBreed(e.target.value);
              }}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              required={true}
              min={0}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
}

export default PetCreatePage;
