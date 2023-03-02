import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Either, left, right } from '@sweet-monads/either';
import {
    IAxiosDelete,
    IAxiosGet,
    IAxiosPost,
    IAxiosUpdate,
} from './api.interface';

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

export const axiosGet: IAxiosGet = async (url, config: any) => {
    try {
        return right(await api.get(url, config));
    } catch (e) {
        return left(e as AxiosError<any>);
    }
};

export const axiosPost: IAxiosPost = async (url, data, config: any) => {
    try {
        return right(await api.post(url, data, config));
    } catch (e) {
        return left(e as AxiosError<any>);
    }
};

export const axiosDelete: IAxiosDelete = async (url, config: any) => {
    try {
        return right(await api.delete(url, config));
    } catch (e) {
        return left(e as AxiosError<any>);
    }
};

export const axiosUpdate: IAxiosUpdate = async (url, data, config: any) => {
    try {
        return right(await api.patch(url, data, config));
    } catch (e) {
        return left(e as AxiosError<any>);
    }
};

export default api;
