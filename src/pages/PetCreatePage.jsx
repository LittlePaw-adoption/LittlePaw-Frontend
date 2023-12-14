import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/file-upload.service";

import createPets from "../assets/createPets.png"

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
      .createPets({ ...newPet, petImage: image })
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
    <div className="font-sans bg-gray-900 bg-opacity-5 w-full pt-3 pb-3 flex justify-center items-center">
      <div className="bg-white p-6 sm:p-10 w-full md:w-2/3 lg:w-1/2 xl:w-2/3 rounded-3xl filter shadow-lg flex flex-row items-center">
        <div className="w-1/2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-[#5bc0be]"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-[#5bc0be] tracking-wider ml-1 sm:text-md font-bold">
                Post
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div>
              <h1 className="text-xl text-gray-600 tracking-wider sm:text-md font-semibold">
                Create a Post so your Paw-friend gets adopted!
              </h1>
              <p className="text-xs text-gray-400 mt-2">
                Please fill all of the available spaces.
              </p>
            </div>
          </div>
          <div className="mt-1 sm:mt-8 flex flex-row">
            <form
              action=""
              className="flex flex-col w-full pr-0 md:pr-5"
              onSubmit={handleFileUpload}
            >
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Name:
              </label>
              <input
                name="name"
                type="text"
                className="border border-gray-300 bg-gray-100 text-sm rounded-lg w-full block p-2.5"
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
                className="block mb-2 text-sm font-medium text-gray-600 mt-5"
              >
                Breed:
              </label>
              <input
                name="breed"
                type="text"
                className="border border-gray-300 bg-gray-100 text-sm rounded-lg w-full block p-2.5"
                onChange={(e) =>
                  setNewPet((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-600 mt-5"
              >
                Age:
              </label>
              <input
                name="age"
                type="number"
                className="border border-gray-300 bg-gray-100 text-sm rounded-lg w-full block p-2.5"
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
                className="block mb-2 text-sm font-medium text-gray-600 mt-5"
              >
                Description:
              </label>
              <input
                name="description"
                type="text"
                className="border border-gray-300 bg-gray-100 text-sm rounded-lg w-full block p-2.5"
                onChange={(e) =>
                  setNewPet((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <div className="mb-5">
                <label
                  htmlFor="species"
                  className="block mb-2 text-sm font-medium text-gray-600 mt-5"
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
                      className="h-4 w-4 cursor-pointer border-solid border-2 bg-gray-300"
                    />
                    <label
                      htmlFor="speciesButton1"
                      className="pl-3 text-sm font-medium text-gray-600"
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
                      className="h-4 w-4 cursor-pointer border-solid border-2 bg-gray-300"
                    />
                    <label
                      htmlFor="speciesButton2"
                      className="pl-2 text-sm font-medium text-gray-600"
                    >
                      Cat
                    </label>
                  </div>
                </div>
              </div>
              <input
                type="file"
                className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer focus:outline-none bg-gray-100"
                onChange={(e) => setPicture(e.target.files[0])}
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                JPG or PNG
              </p>
              <p
                className="mb-2 text-xs text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                Image upload required
              </p>
              <button
                type="submit"
                className="bg-[#5bc0be] text-gray-100 rounded-md h-8 sm:h-auto sm:rounded-lg w-20 sm:w-52 p-1 text-xl sm:text-md sm:p-3 mb-4 font-bold"
              >
                Create
              </button>
            </form>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
        <img
          className="w-full md:w-[500px] my-4"
          src={createPets}
          alt="create-shelter-image"
        />
      </div>
      </div>
    </div>
  );
}

export default PetCreatePage;
