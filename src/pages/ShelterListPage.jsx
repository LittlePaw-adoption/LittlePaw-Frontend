import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ShelterEditForm from "../components/ShelterEditForm"; // Import ShelterEditForm component
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

function ShelterListPage() {
  const [sheltersList, setSheltersList] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [shelterIdToDisplay, setShelterIdToDisplay] = useState(null);
  const [shelter, setShelter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/shelters`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setSheltersList(response.data);
      })
      .catch((error) => {
        console.log("Error getting the list of shelters: ", error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async (updatedShelter) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/shelters/${updatedShelter._id}`,
        updatedShelter,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      const updatedShelterList = await axios.get(`${API_URL}/api/shelters`);
      setSheltersList(updatedShelterList.data);

      setShelter(updatedShelter);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating shelter details:", error);
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("authToken");
    const confirmDelete = window.confirm("Are you sure?");

    if (confirmDelete) {
      axios
        .delete(`${API_URL}/api/shelters/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200)
            setSheltersList((prev) =>
              prev.filter((current) => current._id !== id)
            );
        })
        .catch((error) => {
          console.error("Error deleting shelter:", error);
        });
    }
  };

  const renderDeleteButton = (currentUser, shelterDetails) => {
    if (currentUser === null || shelterDetails === null) {
      return null;
    }

    if (currentUser._id === shelterDetails.createdBy) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 hover:dark:text-[#5bc0be] cursor-pointer"
          onClick={() => {
            handleDelete(shelterDetails._id);
          }}
        >
          <path
            fillRule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  return (
    <div>
      <div className="py-6">
        <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
          <div className="flex flex-row flex-wrap-reverse justify-center mt-8">
            {sheltersList === null ? (
              <p>Loading...</p>
            ) : (
              sheltersList.map((shelterDetails) => (
                <div
                  key={shelterDetails._id}
                  className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 border-solid border-2 border-[#5bc0be] "
                >
                  <img
                    className="mask mask-hexagon-2 self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover dark:bg-gray-500"
                    src={shelterDetails.shelterImage}
                  />
                  <div className="flex-1 my-4">
                    <p className="text-xl font-semibold leadi">
                      {shelterDetails.name}
                    </p>
                    <p>{shelterDetails.location}</p>
                    <p>{shelterDetails.contact}</p>
                    <p>{shelterDetails.description}</p>
                  </div>
                  <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 hover:dark:text-[#5bc0be] cursor-pointer"
                      onClick={() => {
                        // Fetch shelter details based on the ID before showing the modal to fix always loading
                        axios
                          .get(
                            `${API_URL}/api/shelters/${shelterDetails._id}`,
                            {
                              headers: {
                                Authorization: `Bearer ${storedToken}`,
                              },
                            }
                          )
                          .then((response) => {
                            setShelter(response.data);
                            openModal(); // Use the new function to open the modal
                          })
                          .catch((error) => {
                            console.error(
                              "Error getting shelter details:",
                              error
                            );
                            alert(
                              "Error getting shelter details. Please try again."
                            );
                          });
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>

                    {isModalOpen && (
                      <div className="modal">
                        <div className="modal-box">
                          {shelter ? (
                            <div>
                              <h3 className="font-bold text-lg">
                                {shelter.name}
                              </h3>
                              <p className="py-4">{shelter.location}</p>
                              <p className="py-4">{shelter.contact}</p>
                              <p className="py-4">{shelter.description}</p>
                              {currentUser !== null &&
                              currentUser._id === shelter?.createdBy ? (
                                isEditing ? (
                                  <ShelterEditForm
                                    shelter={shelter}
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
                              <button
                                className="glass btn"
                                onClick={() => setIsModalOpen(false)}
                              >
                                Close
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}

                    {renderDeleteButton(currentUser, shelterDetails)}
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

export default ShelterListPage;
