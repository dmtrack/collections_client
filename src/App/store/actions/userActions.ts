import { userSlice } from './../slices/user.slice';
import { AppDispatch } from '..';
import axios from '../../axios';
import { IServerResponce, IUser, IUserState } from '../../interfaces/IUser';
import localStorageService from '../../utils/localStorage';

export const fetchUsers = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetching());
            const response = await axios.get<IServerResponce<IUser>>(
                'getusers'
            );
            dispatch(userSlice.actions.fetchSuccess(response.data.data));
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
