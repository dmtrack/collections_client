import { Either } from '@sweet-monads/either';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export type EitherResponse<Error, T> = Either<
    AxiosError<Error>,
    AxiosResponse<T>
>;

export interface IAxiosGet {
    <Error = any, T = any, D = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ): Promise<EitherResponse<Error, T>>;
}

export interface IAxiosPost {
    <Error = any, T = any, D = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ): Promise<EitherResponse<Error, T>>;
}
export interface IAxiosDelete {
    <Error = any, T = any>(url: string, config?: AxiosRequestConfig): Promise<
        EitherResponse<Error, T>
    >;
}

export interface IAxiosUpdate {
    <Error = any, T = any, D = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ): Promise<EitherResponse<Error, T>>;
}
