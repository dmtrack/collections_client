import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import { IUserState, DeleteUserProp } from '../models/IUsers.state';

const initialState: IUserState = {
    usersLoading: false,
    error: '',
    users: [],
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchingUsers(state) {
            state.usersLoading = true;
        },
        fetchSuccess(state, action: PayloadAction<IUser[]>) {
            state.usersLoading = false;
            state.users = action.payload;
        },
        // fetchUserSuccess(state, action: PayloadAction<IUser> ){
        //     state.usersLoading = false
        // },
        fetchError(state, action: PayloadAction<Error>) {
            state.usersLoading = false;
            state.error = action.payload.message + ': ' + action.payload?.cause;
        },
        deleteUser(state, action: PayloadAction<DeleteUserProp>) {
            action.payload.userId.forEach((id: number) => {
                state.users = state.users.filter(
                    (user) => Number(user.id) !== id
                );
            });
        },
        toggleBlockState(state, action: PayloadAction<DeleteUserProp>) {
            action.payload.userId.forEach((id: number) => {
                state.users.forEach((user) => {
                    if (Number(user.id) === id) {
                        user.blocked = true;
                    }
                });
            });
            state.error = action.payload.message;
        },
        toggleUnBlockState(state, action: PayloadAction<DeleteUserProp>) {
            action.payload.userId.forEach((id) => {
                state.users.forEach((user) => {
                    if (Number(user.id) === id) {
                        user.blocked = false;
                    }
                });
            });
        },
    },
});

export default userSlice.reducer;
