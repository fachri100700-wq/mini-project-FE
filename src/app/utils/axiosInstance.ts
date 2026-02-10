import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default axiosInstance;