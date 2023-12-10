import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import bgLogin from "../assets/login.jpg";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
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
                  <label className="text-sm font-sans font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Write your password"
                    className=" w-full py-3 px-12 border hover: border-gray-500 rounded shadow text-base font-sans"
                  />
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

      {/*       <div className="LoginPage">
        <h1>Login</h1>

        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Don't have an account yet?</p>
        <Link to={"/signup"}> Sign Up</Link>
      </div> */}
    </div>
  );
}

export default LoginPage;
