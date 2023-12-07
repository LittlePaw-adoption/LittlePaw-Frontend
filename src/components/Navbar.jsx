import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/feed")}>Feed Post</button>

      {isLoggedIn && (
        <>
          <button onClick={() => navigate("/pets")}>Pets</button>
          <button onClick={() => navigate("/shelters")}>Shelters</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick={() => navigate("/pets/create")}>PetsCreate</button>
          <button onClick={() => navigate("/shelters/create")}>SheltersCreate</button>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
        
      )}

      {!isLoggedIn && (
        <>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
