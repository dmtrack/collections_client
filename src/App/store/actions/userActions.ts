import { userSlice } from './../slices/user.slice';
import { AppDispatch } from '..';

import { IUser, IUserState } from '../../models/IUser';
import localStorageService from '../../services/localStorageService';
import api from '../../http';
import { logOut } from './auth.actions';

export const fetchUsers = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetchingUsers());
            const response = await api.get('/user/getusers');
            dispatch(userSlice.actions.fetchSuccess(response.data));
        } catch (e) {
            dispatch(userSlice.actions.fetchError(e as Error));
        }
    };
};

export const toggleBlock = (dataId: number[], userId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await api
                .put('/user/block', { dataId })
                .then((data) => {
                    console.log('block data', data);

                    dispatch(
                        userSlice.actions.toggleBlockState(data.data.userId)
                    );
                })

                .then(() => {
                    if (dataId.includes(Number(userId))) {
                        dispatch(logOut());
                    }
                });
            console.log('response', response);
        } catch (e) {}
    };
};

export const toggleUnBlock = (dataId: number[], userId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await api
                .put('/user/unblock', { dataId })
                .then((data) =>
                    dispatch(
                        userSlice.actions.toggleUnBlockState(data.data.userId)
                    )
                )
                .then(() => {
                    if (dataId.includes(Number(userId))) {
                        dispatch(logOut());
                    }
                });
        } catch (e) {}
    };
};

export const deleteUser = (dataId: number[], userId: number) => {
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
