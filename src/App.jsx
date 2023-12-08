import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import FeedPostsPage from "./pages/FeedPostsPage"
import PetListPage from "./pages/PetListPage"
import PetCreatePage from "./pages/PetCreatePage"
import PetDetailsPage from "./pages/PetDetailsPage"
import ShelterListPage from "./pages/ShelterListPage"
import ShelterCreatePage from "./pages/ShelterCreatePage"
import ShelterDetailsPage from "./pages/ShelterDetailsPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Homepage from "./pages/Homepage"
import UserProfilePage from "./pages/UserProfilePage"
import IsPrivate from "./components/isPrivate"
import IsAnon from "./components/isAnon"
import Footer from "./components/Footer"
import { SWRConfig } from "swr";
import api from "./api/api"

import './App.css'

function App() {
  return (
    <>
     <div>
     <SWRConfig
      value={{ fetcher: (url) => api(url).then((res) => res.data) }}>
      <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/profile" element={<IsPrivate><UserProfilePage /></IsPrivate>} />
          <Route path="/feed" element={<FeedPostsPage />} />

          <Route path="/pets" element={<PetListPage />} />
          <Route path="/pets/details/:petId" element={<PetDetailsPage />} />
          <Route path="/pets/create" element={<PetCreatePage />} />

          <Route path="/shelters" element={<ShelterListPage />} />
          <Route path="/shelters/details/:shelterId" element={<ShelterDetailsPage />} />
          <Route path="/shelters/create" element={<ShelterCreatePage />} />

          <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        </Routes>
        <Footer />
        </SWRConfig>
     </div>
    </>
  )
}

export default App
