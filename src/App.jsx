import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import FeedPostsPage from "./pages/FeedPostsPage"
import PetListPage from "./pages/PetListPage"
import PetCreatePage from "./pages/PetCreatePage"
import ShelterListPage from "./pages/ShelterListPage"
import ShelterCreatePage from "./pages/ShelterCreatePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Homepage from "./pages/Homepage"
import UserProfilePage from "./pages/UserProfilePage"
import IsPrivate from "./components/isPrivate"
import IsAnon from "./components/isAnon"
import Footer from "./components/Footer"
import Theme from "./components/Theme"
import './App.css'

function App() {
  const location = useLocation();
  return (
     <div>

      {location.pathname === "/login" || location.pathname === "/signup" ? null : <Navbar />}
      
      <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/profile" element={<IsPrivate><UserProfilePage /></IsPrivate>} />
          <Route path="/feed" element={<FeedPostsPage />} />

          <Route path="/pets" element={<PetListPage />} />
          <Route path="/pets/create" element={<PetCreatePage />} />
          <Route path="/pets/:petId" element={<PetListPage />} />

          <Route path="/shelters" element={<ShelterListPage />} />
          <Route path="/shelters/create" element={<ShelterCreatePage />} />
          <Route path="/shelters/:shelterId" element={<ShelterListPage />} />

          <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        </Routes>
        <Theme />

        {location.pathname === "/login" || location.pathname === "/signup" ? null : <Footer />}

     </div>
  )
}

export default App
