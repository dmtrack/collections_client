export interface IUser {
    id: number;
    name: string;
    email: string;
    blocked: boolean;
    isActivated: boolean;
    access: string;
    avatarUrl: string;
}

export interface IUserState {
    loading: boolean;
    error: string;
    users: IUser[];
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

export type UsersListProps = {
    user: IUser[];
    loading: boolean;
};

export type DeleteUserProp = string[];
