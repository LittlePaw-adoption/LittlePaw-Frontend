import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import axios from "axios";
import logo from "../assets/shelter.png";
import UserProfilePage from "./UserProfilePage";

const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

function FeedPostsPage() {
  const [pets, setPets] = useState([]);
  const { petId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(storedToken);
    // Fetch the list of pets
    axios
      .get(`${API_URL}/api/pets`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Sort pets by createdAt in descending order
        const sortedPets = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setPets(sortedPets);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
      });
  }, [user]);

  const handleClickPets = (petId) => {
    navigate(`/pets/${petId}`);
  };

  const handleClickShelters = () => {
    navigate(`/shelters`);
  };

  return (
    <div className="">
      <div className="absolute top-40 pl-40">
      <UserProfilePage/>
      </div>
      <div className=" flex justify-center bg-gray-900 bg-opacity-5 p-4">
        <div className="flex flex-col gap-8  rounded-sm max-w-md">
          {pets.map((pet) => (
            <div key={pet._id} className="bg-white">
              <div className="flex items-center px-4 py-3">
                {pet.createdBy && (
                  <>
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={pet.createdBy.profileImage}
                      alt={pet.createdBy.name}
                    />
                    <div className="ml-3">
                      <span className="text-sm font-semibold antialiased block leading-tight text-black">
                        {pet.createdBy.name}
                      </span>
                      <span className="text-gray-500 text-xs block">
                        {pet.createdBy.country}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <img src={pet.petImage} />

              <p className="font-semibold text-sm mx-4 mt-2 mb-4 break-words text-gray-500">
                {pet.description}
              </p>
              <hr />
              <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                <div className="flex gap-5 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 hover:dark:text-[#5bc0be] cursor-pointer"
                    onClick={() => {
                      handleClickPets(pet._id);
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="flex">
                  <img
                    src={logo}
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                    className="cursor-pointer"
                    onClick={() => handleClickShelters()}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedPostsPage;
