import axios from "axios";

const API_BASE_URL = '';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accepted: 'appication/json',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
