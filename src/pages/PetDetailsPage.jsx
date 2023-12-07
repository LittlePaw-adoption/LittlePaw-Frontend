import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PetEditForm from "../components/PetEditForm"

const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

function PetDetailsPage() {
  const [pet, setPet] = useState(null);
  const { petId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

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

  // Functionality for the editing/saving/cancel form
  const handleEditClick = () => {
    const token = localStorage.getItem('authToken')
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
    const token = localStorage.getItem('authToken')
    // Confirm the deletion with the user, AMAZING, WOW, best feature ever
    const confirmDelete = window.confirm(
      "Are u sure ? Was this Little Paw-Friend already adopted?");
    
    if (confirmDelete) {
      axios
        .delete(`${API_URL}/api/pets/${petId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          navigate("/pets");      // Redirect to the pet list page !
        })
        .catch((error) => {
          console.error("Error deleting pet:", error);
        });
    }
  };


  return (
    <div>
      {pet ? (
        <div className="card">
          <h2>{pet.name}</h2>
          <p>Species: {pet.species}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          {pet.description && <p>Description: {pet.description}</p>}
          {isEditing ? (
            <PetEditForm pet={pet} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
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
};

export default PetDetailsPage;