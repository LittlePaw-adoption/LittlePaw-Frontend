import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");

const service = axios.create({
  baseURL: `${API_URL}`,
  // withCredentials: true,
  // headers: { Authorization: `Bearer ${storedToken}` },
});



service.interceptors.request.use(
  async (config) => {
    const json = localStorage.getItem("authToken");
    // const loggedInUser = JSON.parse(json);

    if (json) {
      config.headers.Authorization = `Bearer ${json}`;
      //cross origin
    }
      
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const errorHandler = (err) => {
  throw err;
};

const getPets = () => {
  return service
    .get("/api/pets")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return service
    .post("/api/upload", file)
    .then((res) => res.data)
    .catch(errorHandler);
};

const createPets = (pets) => {
  return service
    .post("/api/pets", pets)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default {
  service,
  getPets,
  uploadImage,
  createPets,
};
