import axios from 'axios';
// http://localhost:5000/api
export const axiosInstance = axios.create({
  baseURL: 'https://task-manager-api-ia8l.onrender.com/api',
  withCredentials: true,
});
