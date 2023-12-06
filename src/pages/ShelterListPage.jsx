import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ShelterListPage() {
  const [sheltersList, setSheltersList] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(API_URL + "/api/shelters", { headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setSheltersList(response.data);
      })
      .catch((error) => {
        console.log("Error getting the list of shelters: ", error);
      });
  }, []);

  return (
    <div>
      {sheltersList === null ? (
        <p>Loading...</p>
      ) : (
        sheltersList.map((shelter) => {
          return (
            <div>
              <p>Name: {shelter.name}</p>
              <p>Location: {shelter.location}</p>
              <p>Contact: {shelter.contact}</p>
              <p>Description: {shelter.description}</p>
              <Link to={`/shelters/details/${shelter._id}`}>View Details</Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ShelterListPage;