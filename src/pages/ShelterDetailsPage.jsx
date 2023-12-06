import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ShelterEditForm from "../components/ShelterEditForm"

const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

function ShelterDetailsPage() {
  const [shelter, setShelter] = useState(null);
  const { shelterId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch shelter details using Axios
    axios
      .get(`${API_URL}/api/shelters/${shelterId}` ,{ headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setShelter(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shelter details:", error);
      });
  }, [shelterId]);

  // Functionality for the editing/saving/cancel form
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (updatedPet) => {
    setPet(updatedPet);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Confirm the deletion with the user, AMAZING, WOW, best feature ever
    const confirmDelete = window.confirm(
      "Are u sure u want to delete this Shelter ?"
    );

    if (confirmDelete) {
      axios
        .delete(`${API_URL}/api/shelters/${shelterId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          navigate("/shelters"); // Redirect to the shelter list page !
        })
        .catch((error) => {
          console.error("Error deleting shelter:", error);
        });
    }
  };

  return (
    <div>
      {shelter ? (
        // Display shelter details
        <div className="card">
          <h2>{shelter.name}</h2>
          <p>Location: {shelter.location}</p>
          <p>Contact: {shelter.contact}</p>

          {shelter.description && <p>Description: {shelter.description}</p>}
          {isEditing ? (
            <ShelterEditForm shelter={shelter} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
          ) : (
            <div>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ShelterDetailsPage;
