import { authSlice } from './../slices/auth.slice';
import { AppDispatch } from '..';
import axios from '../../axios';
import {
    IAuthData,
    IAuthResponse,
    IError,
    ILoginData,
} from '../../interfaces/IAuth';
import localStorageService from '../../utils/localStorage';

const URL = process.env.REACT_APP_BASE_URL;

export const register = (data: IAuthData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<IAuthResponse>(
                URL + '/signup',
                data
            );

            dispatch(
                authSlice.actions.signIn({
                    userId: response.data.data.id,
                })
            );
        } catch (e) {
            dispatch(authSlice.actions.fetchError(e as IError));
        }
    };
};

export const login = (data: ILoginData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<IAuthResponse>(
                URL + '/signin',
                data
            );

            dispatch(
                authSlice.actions.signIn({
                    userId: response.data.data.id,
                })
            );
        } catch (e) {
            dispatch(authSlice.actions.fetchError(e as IError));
        }
    };
};

export const logOut = () => (dispatch: AppDispatch) => {
    localStorageService.removeAuthData();
    dispatch(authSlice.actions.userLoggedOut());
};
