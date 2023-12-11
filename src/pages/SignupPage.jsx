import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgSignup from "../assets/signup.jpg";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
                <div className="pt-2 pr-20">
                  <label className="text-sm font-sans font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Write your password"
                    value={password}
                    onChange={handlePassword}
                    className=" w-full py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                  />
                </div>
                <div className="pt-2 pr-20">
                  <label className="text-sm font-sans font-medium">
                    Type of user
                  </label>
                </div>
                <div class="grid space-y-3">
                  <div class="relative flex items-start">
                    <div class="flex items-center h-5 mt-1">
                      <input
                        id="hs-radio-delete"
                        name="hs-radio-with-description"
                        type="radio"
                        value="Person"
                        checked={selectedUserType === "Person"}
                        onChange={handleUserTypeChange}
                        class="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        aria-describedby="hs-radio-delete-description"
                      />
                    </div>
                    <label for="hs-radio-delete" class="ms-3">
                      <span class="block text-sm font-semibold dark:text-gray-300">
                        Person
                      </span>
                      <span
                        id="hs-radio-delete-description"
                        class="block text-sm text-gray-600 dark:text-gray-500"
                      >
                        I want to adopt a pet.
                      </span>
                    </label>
                  </div>
                  <div class="relative flex items-start">
                    <div class="flex items-center h-5 mt-1">
                      <input
                        id="hs-radio-archive"
                        name="hs-radio-with-description"
                        type="radio"
                        value="Shelter"
                        checked={selectedUserType === "Shelter"}
                        onChange={handleUserTypeChange}
                        class="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        aria-describedby="hs-radio-archive-description"
                      />
                    </div>
                    <label for="hs-radio-archive" class="ms-3">
                      <span class="block text-sm font-semibold dark:text-gray-300">
                        Shelter
                      </span>
                      <span
                        id="hs-radio-archive-description"
                        class="block text-sm text-gray-600 dark:text-gray-500"
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
