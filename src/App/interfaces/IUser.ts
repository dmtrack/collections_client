export interface IUser {
    id: number;
    nickname: string;
    email: string;
    registered: string;
    login: string;
    blocked: boolean;
}

export interface IUserState {
    loading: boolean;
    error: string;
    users: IUser[];
}

export interface IServerResponce<T> {
    config: {};
    data: T[];
    message: string;
    headers: {};
    request: {};
    status: number;
    statusText: string;
}

export type UsersListProps = {
    user: IUser[];
    loading: boolean;
};

export type DeleteUserProp = string[];
