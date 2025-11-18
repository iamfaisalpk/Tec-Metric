import axios from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
});

// Request interceptor to add Authorization header if token exists
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 errors (unauthorized)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Auto logout on 401
            // Dispatch logout action or redirect to login
            // Since we can't dispatch here, we'll handle it in components
            console.log('401 Unauthorized - token expired or invalid');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
