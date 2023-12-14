import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../services/file-upload.service";

function PetCreatePage() {
  const [newPet, setNewPet] = useState(null);
  const [picture, setPicture] = useState(null);

  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      const uploadData = new FormData();
      
      uploadData.append("uploadImg", picture);
      const response = await service.uploadImage(uploadData); 
      handleSubmit(response.fileUrl);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubmit = (image) => {
    service
      .createPets(
        
        { ...newPet, petImage: image },
      
      )
      .then(() => {
        setNewPet(null);
        navigate("/pets");
      })
      .catch((error) => {
        console.log("Error creating a pet: ", error);
      });
  };

  useEffect(() => {
    console.log(newPet);
  }, [newPet]);

  return (
    <div className="font-sans bg-gray-500 bg-opacity-40 w-full min-h-screen flex justify-center items-center h-full top-0 backdrop-filter backdrop-blur-lg">
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      />
      <div className="px-6 p-2 bg-white relative justify-center items-center w-1/2 m-auto mx-auto h-1/3 sm:h-1/3 md:w-1/3 md:h-1/3 lg:w-full lg:mx-5 lg:h-1/3 rounded-3xl filter drop-shadow-2xl">
        <div className="flex p-1 sm:mt-4 border-black items-center justify-between">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                clipRule="evenodd"
              />
            </svg>

            <p className="text-gray-600 tracking-wider ml-1 sm:text-md font-bold">
              Post
            </p>
          </div>
        </div>
        <div className="mt-3 sm:mt-5">
          <h1 className="text-xl text-gray-600 tracking-wider sm:text-md font-black">
            Create a Post so your Paw-friend gets adopted !
          </h1>
          <p className="text-xs text-gray-400 mt-2">
            Please fill all of the available spaces.
          </p>
        </div>
        <div className="mt-1 sm:mt-8">
          <form action="" className="flex-col flex" onSubmit={handleFileUpload}>
            <label htmlFor="name" className="text-gray-700 text-xs sm:text-md">
              Name:
            </label>
            <input
              name="name"
              type="text"
              className="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none"
              required={true}
              onChange={(e) =>
                setNewPet((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label
              htmlFor="breed"
              className="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md"
            >
              Breed:
            </label>
            <input
              name="breed"
              type="text"
              className="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none"
              onChange={(e) =>
                setNewPet((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label
              htmlFor="age"
              className="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md"
            >
              Age:
            </label>
            <input
              name="age"
              type="number"
              className="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none"
              required={true}
              min={0}
              onChange={(e) =>
                setNewPet((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label
              htmlFor="description"
              className="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md"
            >
              Description:
            </label>
            <input
              name="description"
              type="text"
              className="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none"
              onChange={(e) =>
                setNewPet((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input
              type="file"
              onChange={(e) => setPicture(e.target.files[0])}
            />
            <div className="mb-5">
              <label
                htmlFor="species"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Species:
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="species"
                    value="Dog"
                    checked={newPet && newPet.species === "Dog"}
                    onChange={(e) =>
                      setNewPet((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    id="speciesButton1"
                    className="h-5 w-5 cursor-pointer border-solid border-2 border-[#5bc0be]"
                  />
                  <label
                    htmlFor="speciesButton1"
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    Dog
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="species"
                    value="Cat"
                    checked={newPet && newPet.species === "Cat"}
                    onChange={(e) =>
                      setNewPet((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    id="speciesButton2"
                    className="h-5 w-5 cursor-pointer border-solid border-2 border-[#5bc0be]"
                  />
                  <label
                    htmlFor="speciesButton2"
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    Cat
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#5bc0be] text-gray-100 rounded-md h-8 sm:h-auto sm:rounded-lg w-20 sm:w-52 p-1 text-xs sm:text-md sm:p-3"
            >
              Create a Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PetCreatePage;
