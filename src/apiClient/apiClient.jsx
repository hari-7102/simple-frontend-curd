import axios from 'axios';
// import { currentLiveBEUrl } from '../../../config/currentLiveUrl';

const token = localStorage.getItem('authToken') || null;


const apiClient = axios.create({
  // baseURL:  'https://www.goldenfields.in/crm_regent',
  baseURL:  "http://localhost:3000/",

  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'authorization' :  `Bearer ${token}`,
    'Cache-Control': 'no-cache'
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await apiClient.post(
          '/refresh',
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        console.log("new" ,newAccessToken)
        if (newAccessToken) {
          localStorage.setItem('authToken', newAccessToken);
          originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
          isRefreshing = false;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        isRefreshing = false;
        localStorage.removeItem('accessToken');
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);





export default apiClient;