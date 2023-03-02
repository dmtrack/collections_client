import { AuthorizationError } from './../models/errors/AuthorizationError';
import {
    IAuthData,
    ILoginData,
    IUserAuthResponse,
} from '../models/response/authResponse';
import { AxiosResponse } from 'axios';
import api, { axiosGet, axiosPost } from '../api/axios/apiClient';
import { DataBaseError } from '../models/errors/DataBaseError';
import { IGetUsersResponse, IUser } from '../models/IUser';

export default class AuthService {
    static async register(data: IAuthData) {
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

    static async reconnect(id: number) {
        return axiosPost<AuthorizationError | DataBaseError, IUserAuthResponse>(
            '/user/reconnect',
            { id }
        );
    }

    static async getAllUsers() {
        return axiosGet<
            AuthorizationError | DataBaseError,
            IGetUsersResponse[]
        >('/users/getusers');
    }
}
