import axios  from 'axios'

export const axiosAuthInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-type': 'application/json'
  }
})

export const axiosGeneralInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    // 'Content-type': 'application/json'
  }
})

axiosGeneralInstance.interceptors.request.use((cfg) => {
    const token = localStorage.getItem('token');
    cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});