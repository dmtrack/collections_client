import { authSlice } from '../slices/auth.slice';
import { AppDispatch } from '..';

import {
    IAuthData,
    IError,
    ILoginData,
} from '../../models/response/authResponse';
import localStorageService from '../../services/localStorageService';
import AuthService from '../../services/authService';

export const register = (data: IAuthData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { name, email, password, avatarUrl } = data;
            const response = await AuthService.register(
                name,
                email,
                password,
                avatarUrl
            );
            localStorageService.setToken(response.data.accessToken);
            localStorageService.setUser(
                response.data.user.id,
                response.data.user.access.access
            );
            dispatch(authSlice.actions.login(response.data));
        } catch (e: any) {
            console.log(e.response?.data?.message);
            dispatch(authSlice.actions.fetchError(e as IError));
        }
    };
};

export const login = (data: ILoginData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { email, password } = data;
            const response = await AuthService.login(email, password);
            localStorageService.setToken(response.data.accessToken);
            dispatch(authSlice.actions.login(response.data));
        } catch (e: any) {
            console.log(e.response?.data?.message);
            dispatch(authSlice.actions.fetchError(e as IError));
        }
    };
};

export const reconnect = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await AuthService.reconnect(id);
            localStorageService.setToken(response.data.accessToken);
            localStorageService.setUser(
                response.data.user.id,
                response.data.user.access.access
            );

            dispatch(authSlice.actions.login(response.data));
        } catch (e: any) {
            console.log(e.response?.data?.message);
            dispatch(authSlice.actions.fetchError(e as IError));
        }
    };
};

export const logOut = () => (dispatch: AppDispatch) => {
    localStorageService.removeAuthData();
    dispatch(authSlice.actions.userLoggedOut());
};
