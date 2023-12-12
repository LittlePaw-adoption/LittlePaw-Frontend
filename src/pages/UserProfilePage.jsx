import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

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
        <div class="flex flex-col justify-center items-center h-[83.5vh]">
          <div class="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-clip-border shadow dark:!bg-navy-800">
            <div class="relative flex h-32 w-full justify-center rounded-xl bg-cover">
              <img
                src={currentUser.bgImage}
                class="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
              />
              <div class="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                <img
                  class="h-full w-full rounded-full"
                  src={currentUser.profileImage}
                  alt=""
                />
              </div>
            </div>
            <div class="mt-16 flex flex-col items-center">
              <h4 class="text-xl font-bold text-navy-700 dark:text-white">
                {currentUser.name}
              </h4>
              <p class="text-base font-normal text-gray-600">
                {currentUser.country}
              </p>
            </div>
            <div class="mt-6 mb-3 flex gap-14 md:!gap-14">
              <div class="flex flex-col items-center justify-center">
                <p>{currentUser.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfilePage;
