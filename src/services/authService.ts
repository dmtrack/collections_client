import { AuthorizationError } from './../models/errors/AuthorizationError';
import {
    IAuthData,
    IAuthDataDTO,
    ILoginData,
    IUserLogout,
} from '../models/response/authResponse';
import { axiosGet, axiosPost } from '../api/axios/apiClient';
import { DataBaseError } from '../models/errors/DataBaseError';
import { IUserAuthResponse } from '../models/response/authResponse';

export default class AuthService {
    static async register(data: IAuthDataDTO) {
        return axiosPost<AuthorizationError | DataBaseError, IUserAuthResponse>(
            '/user/registration',
            data
        );
    }

    static async login(data: ILoginData) {
        return axiosPost<AuthorizationError | DataBaseError, IUserAuthResponse>(
            '/user/login',
            data
        );
    }

    static async logout() {
        return axiosGet<AuthorizationError, IUserLogout>('/user/logout');
    }

    static async reconnect(id: number) {
        return axiosPost<AuthorizationError | DataBaseError, IUserAuthResponse>(
            '/user/reconnect',
            { id }
        );
    }
}
