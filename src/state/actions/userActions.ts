import { userSlice } from '../slices/user.slice';
import { AppDispatch } from '..';
import { IUser } from '../../models/IUser';
import { IUserState } from '../models/IUsers.state';

import localStorageService from '../../services/localStorageService';
import api from '../../api/axios/apiClient';
import { logOut } from './auth.actions';
import UserService from '../../services/userService';
import { NavigateFunction } from 'react-router-dom';
import { setLoading } from '../slices/app.slice';

export const fetchUsers = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(userSlice.actions.fetchingUsers());
        const response = await UserService.getAllUsers();
        response
            .mapRight(({ data: users }) => {
                dispatch(userSlice.actions.fetchSuccess(users));
            })
            .mapLeft((e: any) => {
                dispatch(userSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const toggleBlock = (dataId: number[], userId: number) => {
    return async (dispatch: AppDispatch) => {
        const response = await UserService.blockUser(dataId);
        console.log('block response', response);

        response
            .mapRight(({ data: ids }) => {
                dispatch(userSlice.actions.toggleBlockState(ids));
            })
            .mapLeft((e: any) => {
                dispatch(userSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const toggleUnBlock = (dataId: number[]) => {
    return async (dispatch: AppDispatch) => {
        const response = await UserService.unblockUser(dataId);
        console.log('block response', response);

        response
            .mapRight(({ data: ids }) => {
                dispatch(userSlice.actions.toggleUnBlockState(ids));
            })
            .mapLeft((e: any) => {
                dispatch(userSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const deleteUser = (dataId: number[], userId: number) => {
    return async (dispatch: AppDispatch) => {
        const response = await UserService.deleteUser(dataId);
        console.log('delete response', response);

        response
            .mapRight(({ data: ids }) => {
                dispatch(userSlice.actions.deleteUser(ids));
            })
            .mapLeft((e: any) => {
                dispatch(userSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
        if (dataId.includes(Number(userId))) {
            dispatch(logOut());
        }
    };
};

export const destroyUser = (userId: number, navigate: NavigateFunction) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true));
        const response = await UserService.destroyUser(userId);
        console.log('delete response', response);

        response
            .mapRight(() => navigate('/'))
            .mapLeft((e: any) => {
                dispatch(userSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
        dispatch(setLoading(false));
        dispatch(logOut());
    };
};

export const deleteUser1 = (dataId: number[], userId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await api
                .delete('/user/delete', { data: { dataId } })
                .then((data) =>
                    dispatch(userSlice.actions.deleteUser(data.data.userId))
                )
                .then(() => {
                    if (dataId.includes(Number(userId))) {
                        dispatch(logOut());
                    }
                });
        } catch (e) {}
    };
};

export const getCurrentUserData = () => (state: IUserState) => {
    return state.users
        ? state.users.find(
              (u: IUser) => String(u.id) === localStorageService.getUserId()
          )
        : null;
};
