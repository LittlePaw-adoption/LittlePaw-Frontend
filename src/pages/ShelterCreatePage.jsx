import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

function ShelterCreatePage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const requestBody = {
    name,
    location,
    contact,
    description,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_URL + "/api/shelters/", requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setName("");
        setLocation("");
        setContact("");
        setDescription("");
        navigate("/shelters")
      })
      .catch((error) => {
        console.log("Error creating a shelter: ", error);
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
            Location:
            <input
              type="text"
              name="location"
              required={true}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </label>
          <label>
            Contact:
            <input
              type="text"
              name="contact"
              onChange={(e) => {
                setContact(e.target.value);
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

export default ShelterCreatePage;
