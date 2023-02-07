import { userSlice } from './../slices/user.slice';
import { AppDispatch } from '..';

import { IUser, IUserState } from '../../models/IUser';
import localStorageService from '../../services/localStorageService';
import api from '../../http';

export const fetchUsers = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetching());
            const response = await api.get('/user/getusers');
            console.log('response', response);

            dispatch(userSlice.actions.fetchSuccess(response.data));
        } catch (e) {
            dispatch(userSlice.actions.fetchError(e as Error));
        }
    };
};

export const getCurrentUserData = () => (state: IUserState) => {
    return state.users
        ? state.users.find(
              (u: IUser) => String(u.id) === localStorageService.getUserId()
          )
        : null;
};
