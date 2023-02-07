import { AxiosResponse } from 'axios';
import { IUser } from '../IUser';

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IError extends Error {
    response: { data: { message: string; error: number } };
}

export interface IAuthData {
    name: string;
    email: string;
    password: string;
    avatarUrl: string;
}
export interface ILoginData {
    email: string;
    password: string;
}

export interface IAuthResponse {
    data: {
        id: string;
    };
}

export type LogOutProps = {
    id?: number;
};
