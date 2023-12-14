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
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      {sheltersList === null ? (
        <p>Loading...</p>
      ) : (
        sheltersList.map((shelter) => (
          <Link
            to={`/shelters/details/${shelter._id}`}
            key={shelter._id}
            className="flex flex-col items-center bg-white border border-[#5ccac8] rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-4"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={shelter.shelterImage} 
              alt={shelter.name}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-[#5bc0be]">
                {shelter.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {shelter.location}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {shelter.contact}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {shelter.description}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default ShelterListPage;