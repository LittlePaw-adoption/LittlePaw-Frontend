import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import logoCreateShelters from "../assets/shelter.png";
import defaultProfilePic from "../assets/defaultProfilePic.jpg";
import { IoPawSharp } from "react-icons/io5";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  const handleClickProfile = () => {
    navigate(`/profile`);
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

  return (
    <>
      <nav className="border-gray-200 shadow">
        <nav className="top-0 left-0 right-0 z-50 border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <h1 className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-8" alt="logo" />
              <NavLink
                to={"/"}
                className="self-center text-2xl font-semibold whitespace-nowrap text-[#5bc0be]"
              >
                Little Paw
              </NavLink>
            </h1>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {!isLoggedIn && (
                <>
                  <button
                    onClick={() => navigate("/signup")}
                    type="button"
                    className="text-white bg-[#5bc0be] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-4"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    type="button"
                    className="text-white bg-[#5bc0be] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
            <div
              className="items-center justify-between w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                <li>
                  <NavLink
                    onClick={() => navigate("/")}
                    to="/"
                    className="block py-2 px-3 md:p-0 md:dark:hover:bg-transparent hover:text-[#5bc0be]"
                  >
                    Home
                  </NavLink>
                </li>
                {isLoggedIn && (
                  <>
                    <li>
                      <NavLink
                        to="/feed"
                        className="lock py-2 px-3 md:p-0 md:dark:hover:bg-transparent hover:text-[#5bc0be]"
                      >
                        Feed
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/pets"
                        className="lock py-2 px-3 md:p-0 md:dark:hover:bg-transparent hover:text-[#5bc0be]"
                      >
                        <IoPawSharp
                          className="cursor-pointer"
                          style={{ width: '28px', height: '28px' }}
                        />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/shelters"
                        className="lock py-2 px-3 md:p-0 md:dark:hover:bg-transparent hover:text-[#5bc0be]"
                      >
                        <img
                          src={logoCreateShelters}
                          height="28"
                          viewBox="0 0 48 48"
                          width="28"
                          className="cursor-pointer"
                        />
                      </NavLink>
                    </li>

                    {currentUser !== null &&
                      currentUser.typeOfUser === "Shelter" && (
                        <>
                          <div className="dropdown">
                            <div
                              tabIndex={0}
                              role="button"
                              className="text-[#5bc0be] bg-gray-500 bg-opacity-25 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                            >
                              Create
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <NavLink
                                  to="/pets/create"
                                  className="lock py-2 px-3 md:p-0 md:dark:hover:bg-transparent hover:text-[#5bc0be]"
                                  
                                >
                                  Pets
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/shelters/create"
                                  className="lock py-2 px-3 md:p-0 md:dark:hover:bg-transparent hover:text-[#5bc0be]"
                                  
                                >
                                  Shelters
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                          <hr className="border-r-2 h-6"/>
                        </>
                      )}
                    <button
                      onClick={() => {
                        logOutUser();
                        navigate("/");
                      }}
                      className="text-white bg-[#5bc0be] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                      Logout
                    </button>
                    {currentUser !== null && (
                      <div className="avatar">
                        <div
                          className="w-8 rounded-full ring ring-[#5bc0be] ring-offset-base-100 ring-offset-4 cursor-pointer"
                          onClick={() => handleClickProfile()}
                        >
                          <img
                            src={currentUser.profileImage || defaultProfilePic}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </>
  );
}

export default Navbar;
