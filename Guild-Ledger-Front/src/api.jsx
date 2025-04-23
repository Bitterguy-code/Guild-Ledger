import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => {
    return new URLSearchParams(params).toString()
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/token/refresh/',
          { refresh: localStorage.getItem('refresh_token') },
          { withCredentials: true }
        );
        
        localStorage.setItem('access_token', response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;