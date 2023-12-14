import React, { useState, useContext, useEffect } from "react";
import service from "../services/file-upload.service";


function EditProfile(userData) {
  const [name, setName] = useState(userData.user.name);
  const [country, setCountry] = useState(userData.user.country);
  const [bio, setBio] = useState(userData.user.bio);
  const [profileImage, setProfileImage] = useState(null);
  const [banner, setBanner] = useState(null);

  const handleProfileImageUpload = async (e) => {
    e.preventDefault();
    if (profileImage !== null) {
      try {
        const uploadData = new FormData();
        uploadData.append("uploadImg", profileImage);
        console.log("before", profileImage);
        const response = await service.uploadImage(uploadData);
        console.log("after ", profileImage);
        handleBannerUpload(response.fileUrl);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      handleBannerUpload(userData.user.profileImage);
    }
  };

  const handleBannerUpload = async (profileImgUrl) => {
    if (banner !== null) {
      try {
        const uploadData = new FormData();
        uploadData.append("uploadImg", banner);
        console.log("before", banner);
        const response = await service.uploadImage(uploadData);
        console.log("after ", banner);
        handleSubmit(profileImgUrl, response.fileUrl);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      handleSubmit(profileImgUrl, userData.user.banner);
    }
  };

  const handleSubmit = (profileImgUrl, bannerUrl) => {
    const requestBody = {
      name,
      country,
      bio,
      profileImage: profileImgUrl,
      banner: bannerUrl,
    };

    service
      .editUser(`/${userData.user._id}`, requestBody)
      .then((res) => {
        userData.setCurrentUser(res);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="w-full max-w-sm">
      {userData.user !== null ? (
        <form onSubmit={handleProfileImageUpload}>
          <div className="grid gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="country" className="block mb-2 text-sm font-medium">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="bio" className="block mb-2 text-sm font-medium">
              Bio
            </label>
            <textarea
              type="description"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <label
            className="block mb-2 text-sm font-medium"
            htmlFor="file_input"
          >
            Profile picture
          </label>
          <input
            className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:border-gray-600"
            aria-describedby="file_input_help "
            id="file_input"
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            JPG or PNG
          </p>
          <label
            className="block mb-2 mt-4 text-sm font-medium"
            htmlFor="file_input"
          >
            Banner
          </label>
          <input
            className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer focus:outline-none "
            aria-describedby="file_input_help "
            id="file_input"
            type="file"
            onChange={(e) => setBanner(e.target.files[0])}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            JPG or PNG
          </p>

          <button
            type="submit"
            className="text-white bg-[#5bc0be] hover:bg-[#4d9292] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default EditProfile;
