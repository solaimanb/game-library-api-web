import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://game-library-api-a0uf.onrender.com/',
});

export default axiosInstance;