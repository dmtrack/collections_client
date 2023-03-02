import { AxiosResponse } from 'axios';

export interface IAccess {
    id: number;
    access: string;
    userId: number;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    blocked: boolean;
    isActivated: boolean;
    access: IAccess;
    avatarUrl: string;
    created: number;
}

export interface IUsersListProps {
    usersProps: IUser[];
}

export interface IServerResponce {
    config: {};
    data: [];
    message: string;
    headers: {};
    request: {};
    status: number;
    statusText: string;
}

export interface IGetUsersResponse extends AxiosResponse {
    id: number;
    name: string;
    email: string;
    blocked: boolean;
    isActivated: boolean;
    access: IAccess;
    avatarUrl: string;
    created: number;
}
