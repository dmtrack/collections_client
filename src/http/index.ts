import axios, { AxiosRequestConfig } from 'axios';

export const API_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            'TOKEN'
        )}`;
        return config;
    }
);

export default api;
