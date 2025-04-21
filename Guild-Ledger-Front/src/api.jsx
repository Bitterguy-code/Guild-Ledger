import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  paramsSerializer: params => {
    return new URLSearchParams(params).toString()
  }
});

export default api;