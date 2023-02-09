import { IAuthResponse } from './../models/response/authResponse';
import { Axios, AxiosResponse } from 'axios';
import api from '../http';

export default class AuthService {
    static async login(
        email: string,
        password: string
    ): Promise<AxiosResponse<IAuthResponse>> {
        return api.post<IAuthResponse>('/user/login', { email, password });
    }

    static async register(
        name: string,
        email: string,
        password: string,
        avatarUrl: string
    ): Promise<AxiosResponse<IAuthResponse>> {
        return api.post<IAuthResponse>('/user/registration', {
            name,
            email,
            password,
            avatarUrl,
        });
    }

    static async reconnect(id: number): Promise<AxiosResponse<IAuthResponse>> {
        return api.post<IAuthResponse>('/user/reconnect', { id });
    }

    static async logout(): Promise<void> {
        return api.post('/logout');
    }
}
