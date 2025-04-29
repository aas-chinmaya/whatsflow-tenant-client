
import axios from 'axios';

// Normal backend axios
export const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.123:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Facebook Graph API axios
export const axiosInstance2 = axios.create({
  baseURL: 'https://graph.facebook.com/v18.0/964525065872939',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token for axiosInstance2
axiosInstance2.interceptors.request.use(

  (config) => {
    const token ='EAARNKoCJYHUBO8thk5ZC72xGep8FsWGNXi3NZC6tyZCrOoveZCZC22iw6P0JHPUZCAZBDlRZAkWyBBRsGfynXdNhzccuA4ycYiL8RgJhrgwxQeIBT10a2qKtAYWz5xeNm0AzTcPg7cxUR12UwBsacWTxpCK0KJcVkjc4WpVXC06anBzbdefzgcjkKLyQbild6gZDZD'; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
