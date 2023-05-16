import { authSlice } from '../slices/auth.slice';
import { AppDispatch } from '..';
import {
    IAuthData,
    IAuthDataDTO,
    ILoginData,
} from '../../models/response/authResponse';
import localStorageService from '../../services/localStorageService';
import AuthService from '../../services/authService';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { saveImageToCloud } from '../../api/firebase/actions';
import { setLoading } from '../slices/app.slice';

export const registerUser = (data: IAuthData, navigate: NavigateFunction) => {
    return async (dispatch: AppDispatch) => {
        console.log('data from authAct', data);
        const { image, name, password, email } = data;
        dispatch(setLoading(true));

        const imageUrl: string = await saveImageToCloud(image, 'users');
        const userDTO: IAuthDataDTO = {
            name,
            password,
            email,
            avatarUrl: imageUrl,
        };
        // console.log(userDTO, 'DTO');

        const response = await AuthService.register(userDTO);
        response
            .mapRight(({ data: data }) => {
                localStorageService.setToken(data.accessToken);
                localStorageService.setUser(
                    data.user.id,
                    data.user.access.access
                );
                dispatch(authSlice.actions.login(data));
                navigate('/');
            })
            .mapLeft((e: any) => {
                dispatch(authSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
        dispatch(setLoading(false));
    };
};

export const login = (data: ILoginData, navigate: NavigateFunction) => {
    return async (dispatch: AppDispatch) => {
        const response = await AuthService.login(data);
        response
            .mapRight(({ data: data }) => {
                localStorageService.setToken(data.accessToken);
                dispatch(authSlice.actions.login(data));
                navigate('/');
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

export const logOut = () => {
    return async (dispatch: AppDispatch) => {
        const response = await AuthService.logout();
        localStorageService.removeAuthData();
        dispatch(authSlice.actions.userLoggedOut());
    };
};
