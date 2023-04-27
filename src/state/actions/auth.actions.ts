import { IUserAuthResponse } from './../../models/response/authResponse';
import { authSlice } from '../slices/auth.slice';
import { AppDispatch } from '..';
import { IAuthData, ILoginData } from '../../models/response/authResponse';
import localStorageService from '../../services/localStorageService';
import AuthService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

export const register = (data: IAuthData) => {
    return async (dispatch: AppDispatch) => {
        const response = await AuthService.register(data);
        response
            .mapRight(({ data: data }) => {
                localStorageService.setToken(data.accessToken);
                localStorageService.setUser(
                    data.user.id,
                    data.user.access.access
                );
                dispatch(authSlice.actions.login(data));
            })
            .mapLeft((e: any) => {
                dispatch(authSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const login = (data: ILoginData) => {
    return async (dispatch: AppDispatch) => {
        const response = await AuthService.login(data);
        response
            .mapRight(({ data: data }) => {
                localStorageService.setToken(data.accessToken);
                dispatch(authSlice.actions.login(data));
            })
            .mapLeft((e: any) => {
                dispatch(authSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const reconnect = (id: number) => {
    return async (dispatch: AppDispatch) => {
        const response = await AuthService.reconnect(id);
        response
            .mapRight(({ data: data }) => {
                localStorageService.setToken(data.accessToken);
                localStorageService.setUser(
                    data.user.id,
                    data.user.access.access
                );
                dispatch(authSlice.actions.login(data));
            })
            .mapLeft((e: any) => {
                dispatch(authSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const logOut = () => (dispatch: AppDispatch) => {
    localStorageService.removeAuthData();
    dispatch(authSlice.actions.userLoggedOut());
};
