import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import PetEditForm from "../components/PetEditForm";
import { AuthContext } from "../context/auth.context";
import service from "../services/file-upload.service";
import { render } from "react-dom";

const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

function PetListPage() {
  const [petsList, setPetsList] = useState(null);
  const [pet, setPet] = useState(null);
  // const { petId } = useParams();
  const [petId, setPetId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  // Fectch pet list
  useEffect(() => {
    service
    .getPets()
      .then((data) => {
        setPetsList(data);
        console.log("jesus help me", data)
      })
      .catch((error) => {
        console.log("Error getting the list of pets: ", error);
      });
  }, []);

  // Fecth pet details
  useEffect(() => {
    if (petId) {
      axios
        .get(`${API_URL}/api/pets/${petId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setPet(response.data);
        })
        .catch((error) => {
          console.error("Error fetching pet details:", error);
        });
    }
  }, [petId]);

  // Functionality for the editing/saving/cancel form
  const handleEditClick = () => {
    const token = localStorage.getItem("authToken");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (updatedPet) => {
    setPet(updatedPet);
    setIsEditing(false);
    getPetList();
    getPetList();
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("authToken");
    // Confirm the deletion with the user, AMAZING, WOW, best feature ever
    const confirmDelete = window.confirm(
      "Are u sure ? Was this Little Paw-Friend already adopted?"
    );

    if (confirmDelete) {
      service
        .delete(`${API_URL}/api/pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          getPetList();
        })
        .catch((error) => {
          console.error("Error deleting pet:", error);
        });
    }
  };

  const handleAdoption = async (id) => {
    const petUpdate = petsList.find((pet) => pet._id === id);

    if (petUpdate) {
      petUpdate.status = "Pending";

      try {
        const response = await axios.put(
          API_URL + `/api/pets/${petUpdate._id}`,
          petUpdate,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );

        getPetList(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(`Pet not found`);
    }
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/api/user/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCurrentUser(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [user]);


  const renderDeleteButton = (currentUser, petDetails) => {
    if(currentUser === null || petDetails === null) {
      return null;
    }

    if(currentUser._id === petDetails.createdBy){
      return (<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 hover:dark:text-[#5bc0be] cursor-pointer"
        onClick={() => {
          handleDelete(petDetails._id);
        }}
      >
        <path
          fillRule="evenodd"
          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
          clipRule="evenodd"
        />
      </svg>)
    }
  }

  return (
    <div>
    <div className="py-6   ">
      <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10 ">
        <div className="flex flex-row flex-wrap-reverse justify-center mt-8 ">
          {petsList === null ? (
            <p>Loading...</p>
          ) : (
            petsList.map((petDetails) => (
              <div
                key={petDetails._id}
                className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 border-solid border-2 border-[#5bc0be] "
              >
                <img
                  className=" mask mask-hexagon-2 self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover dark:bg-gray-500"
                  src={petDetails.petImage}
                />
                <div className="flex-1 my-4">
                  <p className="text-xl font-semibold leadi">{petDetails.name}</p>
                  <p>{petDetails.breed}</p>
                  <p>{petDetails.status}</p>
                </div>
                <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 hover:dark:text-[#5bc0be] cursor-pointer"
                    onClick={() => {
                      document.getElementById("my_modal_1").showModal();
                      setPetId(petDetails._id);
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      {pet ? (
                        <div>
                          <h3 className="font-bold text-lg">{pet.name}</h3>
                          <p className="py-4">{pet.species}</p>
                          <p className="py-4">{pet.breed}</p>
                          <p className="py-4">{pet.age}</p>
                          {pet.description && (
                            <p>Description: {pet.description}</p>
                          )}

                          {currentUser !== null &&
                          currentUser._id === pet?.createdBy ? (
                            isEditing ? (
                              <PetEditForm
                                pet={pet}
                                onCancel={handleCancelEdit}
                                onSave={handleSaveEdit}
                              />
                            ) : (
                              <div>
                                <button
                                  className="btn"
                                  onClick={handleEditClick}
                                >
                                  Edit
                                </button>
                              </div>
                            )
                          ) : null}
                        </div>
                      ) : (
                        <div>
                          <p>Loading...</p>
                        </div>
                      )}

                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in here, it will run the function and close the modal */}

                          <button className="glass btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>

                  {currentUser !== null &&
                    currentUser.typeOfUser === "Person" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 hover:dark:text-[#5bc0be] cursor-pointer"
                        onClick={() => {
                          handleAdoption(petDetails._id);
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}


                  {  renderDeleteButton(currentUser, petDetails)  }

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default PetListPage;
