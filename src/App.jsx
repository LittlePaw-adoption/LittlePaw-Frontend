import { useState } from 'react'
import Navbar from "./components/Navbar"
import PetListPage from "./pages/PetListPage"
import PetEditPage from "./pages/PetEditPage"
import PetCreatePage from "./pages/PetCreatePage"
import PetDetailsPage from "./pages/PetDetailsPage"
import ShelterListPage from "./pages/ShelterListPage"
import ShelterEditPage from "./pages/ShelterEditPage"
import ShelterCreatePage from "./pages/ShelterCreatePage"
import ShelterDetailsPage from "./pages/ShelterDetailsPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Homepage from "./pages/Homepage"

import isPrivate from "./components/isPrivate"
import isAnon from "./components/isAnon"


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
      <Navbar />
        <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/profile" element={ <IsPrivate><UserProfilePage /></IsPrivate>} />

        <Route path="/pets" element={<PetListPage />} />
        <Route path="/pets/details/:petId" element={<PetDetailsPage />} />
        <Route path="/pets/edit/:petId" element={<PetEditPage />} />
        <Route path="/pets/create" element={<PetCreatePage />} />

        <Route path="/shelters" element={<ShelterListPage />} />
        <Route path="/shelters/details/:sheltertId" element={<ShelterDetailsPage />} />
        <Route path="/shelters/edit/:shelterId" element={<ShelterEditPage />} />
        <Route path="/shelters/create" element={<ShelterCreatePage />} />

          <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        </Routes>
     </div>
    </>
  )
}

export default App
