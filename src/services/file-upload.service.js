import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const service = axios.create({
  baseURL: `${API_URL}`,
});

service.interceptors.request.use(
  async (config) => {
    const json = localStorage.getItem("authToken");

    if (json) {
      config.headers.Authorization = `Bearer ${json}`;
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


const editUser = (user, requestBody) => {
  return service
    .put("/api/user" + user, requestBody)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default {
  service,
  getPets,
  uploadImage,
  createPets,
  editUser
};
