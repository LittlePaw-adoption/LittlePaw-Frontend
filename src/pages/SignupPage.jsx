import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgSignup from "../assets/signup.jpg";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [selectedUserType, setSelectedUserType] = useState("Person");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name, typeOfUser: selectedUserType };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleUserTypeChange = (e) => {
    setSelectedUserType(e.target.value);
  };

  return (
    <div className="SignupPage">
      <div className="grid grid-cols-12">
        <div
          className="banner col-span-8 font-sans font-bold"
          style={{
            backgroundImage: `url(${bgSignup})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="col-span-4 font-sans font-bold min-h-screen pl-7">
          <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="btn btn-circle bg-blue-700 hover:bg-blue-500"
            >
              <FaArrowLeft className="text-white" size={18} />
            </button>
            <div className="row-span-4 row-start-2 text-4xl">
              <form onSubmit={handleSignupSubmit}>
                Sign up
                <div className="pt-10 pr-20">
                  <label className="text-sm font-sans font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Write your username"
                    value={name}
                    onChange={handleName}
                    className="w-full py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                  />
                </div>
                <div className="pt-2 pr-20">
                  <label className="text-sm font-sans font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Write your email"
                    value={email}
                    onChange={handleEmail}
                    className=" w-full py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                  />
                </div>
                <div className="pt-2 pr-20 relative">
                  <label
                    htmlFor="pass"
                    className="text-sm font-sans font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Write your password"
                      value={password}
                      onChange={handlePassword}
                      className=" w-full py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                    />
                    <a
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-sm font-bold text-blue-700 hover:bg-blue-100 rounded-full px-2 py-1 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      show
                    </a>
                  </div>
                </div>
                <div className="pt-2 pr-20">
                  <label className="text-sm font-sans font-medium">
                    Type of user
                  </label>
                </div>
                <div className="grid space-y-3">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5 mt-1">
                      <input
                        id="hs-radio-delete"
                        name="hs-radio-with-description"
                        type="radio"
                        value="Person"
                        checked={selectedUserType === "Person"}
                        onChange={handleUserTypeChange}
                        className="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        aria-describedby="hs-radio-delete-description"
                      />
                    </div>
                    <label htmlFor="hs-radio-delete" className="ms-3">
                      <span className="block text-sm font-semibold dark:text-gray-300">
                        Person
                      </span>
                      <span
                        id="hs-radio-delete-description"
                        className="block text-sm text-gray-600 dark:text-gray-500"
                      >
                        I want to adopt a pet.
                      </span>
                    </label>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5 mt-1">
                      <input
                        id="hs-radio-archive"
                        name="hs-radio-with-description"
                        type="radio"
                        value="Shelter"
                        checked={selectedUserType === "Shelter"}
                        onChange={handleUserTypeChange}
                        className="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        aria-describedby="hs-radio-archive-description"
                      />
                    </div>
                    <label htmlFor="hs-radio-archive" className="ms-3">
                      <span className="block text-sm font-semibold dark:text-gray-300">
                        Shelter
                      </span>
                      <span
                        id="hs-radio-archive-description"
                        className="block text-sm text-gray-600 dark:text-gray-500"
                      >
                        I want to have pets for adoption.
                      </span>
                    </label>
                  </div>
                </div>
                <div className="text-sm font-sans font-medium w-full pr-20 pt-14">
                  <button
                    type="submit"
                    className="text-center w-full py-4 bg-blue-700 hover:bg-blue-600 rounded-md text-white"
                  >
                    SIGN UP
                  </button>
                </div>
              </form>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Link
              to="/login"
              className="text-sm font-sans font-medium underline"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
