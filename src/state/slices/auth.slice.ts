import { IUserAuthResponse } from '../../models/response/authResponse';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccess } from '../../models/IUser';
import localStorageService from '../../services/localStorageService';

interface IAuthState {
    userId: number;
    isAuth: boolean;
    access: IAccess;
    name: string;
    avatarUrl: string;
    error: string;
    isBlocked: boolean;
}

const initialState: IAuthState = {
    userId: 0,
    isAuth: Boolean(localStorageService.getUserId() ?? ''),
    name: '',
    access: { id: 0, access: '', userId: 0 },
    avatarUrl: '',
    error: '',
    isBlocked: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUserAuthResponse>) {
            state.userId = action.payload.user.id;
            state.access = action.payload.user.access;
            state.avatarUrl = action.payload.user.avatarUrl;
            state.isAuth = true;
            state.isBlocked = action.payload.user.blocked;
            localStorageService.setUser(
                action.payload.user.id,
                action.payload.user.access.access
            );
        },
        fetchError(state, action) {
            state.error = action.payload.message;
        },
        userLoggedOut(state) {
            state.isAuth = false;
            state.userId = NaN;
            state.access.access = 'user';
            state.avatarUrl = '';
            state.error = '';
        },
    },
});

export default authSlice.reducer;
