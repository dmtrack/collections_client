import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IError } from '../../interfaces/IAuth';
import localStorageService from '../../utils/localStorage';

interface IAuthState {
    userId: string;
    isAuth: boolean;
    error: string;
}
interface IAuthPayload {
    userId: string;
}

const initialState: IAuthState = {
    userId: localStorageService.getUserId() ?? '',
    isAuth: Boolean(localStorageService.getUserId() ?? ''),
    error: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn(state, action: PayloadAction<IAuthPayload>) {
            state.userId = action.payload.userId;
            state.isAuth = Boolean(action.payload.userId);
            localStorageService.setUser({ userId: action.payload.userId });
        },
        fetchError(state, action: PayloadAction<IError>) {
            state.error = action.payload.response.data.message;
        },
        userLoggedOut(state) {
            state.isAuth = false;
        },
    },
});

export default authSlice.reducer;
