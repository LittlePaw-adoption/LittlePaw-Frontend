import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import bgLogin from "../assets/login.jpg";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import service from "../services/file-upload.service";
const API_URL = import.meta.env.VITE_API_URL;

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    service.service
      .post(`/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <div className="grid grid-cols-12">
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
              <form onSubmit={handleLoginSubmit}>
                Login
                <div className="pt-10 pr-20">
                  <label className="text-sm font-sans font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Write your email"
                    value={email}
                    onChange={handleEmail}
                    className="w-full py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                  />
                </div>
                <div className="pt-2 pr-20">
                  <label
                    label
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
                      className="text-sm font-bold text-blue-700 hover:bg-blue-200 rounded-full px-2 py-1 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      show
                    </a>
                  </div>
                </div>
                <div className="text-sm font-sans font-medium w-full pr-20 pt-14">
                  <button
                    type="submit"
                    className="text-center w-full py-4 bg-blue-700 hover:bg-blue-600 rounded-md text-white"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Link
              to={"/signup"}
              className="text-sm font-sans font-medium underline"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </div>

        <div
          className="banner col-span-8 text-white font-sans font-bold"
          style={{
            backgroundImage: `url(${bgLogin})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>
  );
}

export default LoginPage;
