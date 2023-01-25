export interface IError extends Error {
    response: { data: { message: string; error: number } };
}

export interface IAuthData {
    nickname: string;
    email: string;
    registered: string;
    password: string;
    login: string;
}
export interface ILoginData {
    email: string;
    password: string;
    login: string;
}

export interface IAuthResponse {
    data: {
        id: string;
    };
}

export type LogOutProps = {
    id?: number;
};
