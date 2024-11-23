import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://game-library-api-srv.vercel.app/',
});

export default axiosInstance;