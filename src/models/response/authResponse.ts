import { AxiosResponse } from 'axios';
import { IUser } from '../IUser';

export interface IUserAuthResponse extends AxiosResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IUserLogout {
    message: string;
}

export interface IError extends Error {
    response: { data: { message: string; error: number } };
}

export interface IAuthData {
    name: string;
    email: string;
    password: string;
    image: File;
}

export interface IAuthDataDTO {
    name: string;
    email: string;
    password: string;
    avatarUrl: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export type LogOutProps = {
    id?: number;
};

// export interface IUserResponse extends AxiosResponse {
//     type: string;
//     value: {
//         accessToken: string;
//         refreshToken: string;
//         user: IUser;
//     };
// }
