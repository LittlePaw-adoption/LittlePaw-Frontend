import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

import defaultProfilePic from "../assets/defaultProfilePic.jpg"
import defaultBanner from "../assets/defaultBanner.jpg"

import EditProfile from "../components/EditProfile";

function UserProfilePage() {
  const [currentUser, setCurrentUser] = useState(null);

  const { user } = useContext(AuthContext);

  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

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

  return (
    <>
      {currentUser !== null && (
        <div className="flex justify-center items-center h-[83.5vh]">
          <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mr-64 p-4 bg-clip-border shadow-lg dark:!bg-navy-800 bg-white">
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover ">
              <img
                src={currentUser.banner || defaultBanner}
                className="object-cover h-32 w-full absolute flex justify-center rounded-xl bg-cover"
              />
              <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white last:dark:!border-navy-700">
                <img
                  className="object-cover h-full w-full rounded-full"
                  src={currentUser.profileImage || defaultProfilePic}
                  alt=""
                />
              </div>
            </div>
            <div className="mt-16 flex flex-col items-center">
              <h4 className="text-xl font-bold text-navy-700 text-black">
                {currentUser.name}
              </h4>
              <div className="flex items-center">
                <FaLocationDot className="mr-2 text-gray-500" />
                <p className="text-gray-600">{currentUser.country || "Enter your country (it can be Narnia 🤭)"}</p>
              </div>
            </div>
            <hr className="border-t-1 border-gray-300 w-60 mt-4" />
            <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
              <div className="flex flex-col items-center justify-center text-black">
                <p>{currentUser.bio || "Tell me about you . . . 🤔"}</p>
              </div>
            </div>
          </div>
          <div className="border-l border-gray-300 h-2/3 mx-10"></div>
          <EditProfile setCurrentUser={setCurrentUser} user={currentUser} />
        </div>
      )}
    </>
  );
}

export default UserProfilePage;
