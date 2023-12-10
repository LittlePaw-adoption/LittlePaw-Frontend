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

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

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
                  <label className="text-sm font-sans font-medium">Username</label>
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
                  <label className="text-sm font-sans font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Write your password"
                    value={password}
                    onChange={handlePassword}
                    className=" w-full py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                  />
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
