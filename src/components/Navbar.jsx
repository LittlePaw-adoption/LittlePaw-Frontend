import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav style={{backgroundColor: "white"}} className="border-gray-200 shadow">
      <nav className=" top-0 left-0 right-0 z-50 border-gray-200 dark:bg-gray-900 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h1 className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="LittlePaw Logo" />
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
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <button
                  onClick={() => navigate("/")}
                  to="/"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5bc0be] md:dark:hover:text-[#5bc0be] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 active:text-[#5bc0be]"
                >
                  Home
                </button>
              </li>
              {isLoggedIn && (
                <>
                  <li>
                    <NavLink
                      to="/feed"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5bc0be] md:dark:hover:text-[#5bc0be] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 active:text-[#5bc0be]"
                    >
                      Feed
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/pets"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5bc0be] d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 active:text-[#5bc0be]"
                    >
                      Pets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/shelters"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5bc0be] d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 active:text-[#5bc0be]"
                    >
                      Shelters{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5bc0be] d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 active:text-[#5bc0be]"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/pets/create"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5bc0be] d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 active:text-[#5bc0be]"
                    >
                      Create Pets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/shelters/create"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5bc0be] d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 active:text-[#5bc0be]"
                    >
                      Create Shelters
                    </NavLink>
                  </li>
                  <button
                    onClick={() => {
                      logOutUser();
                      navigate("/");
                    }}
                    
                    className="text-white bg-[#5bc0be] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Logout
                  </button>
                  <span>{user && user.name}</span>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  );
}

export default Navbar;
