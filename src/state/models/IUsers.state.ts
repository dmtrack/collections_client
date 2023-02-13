import { IUser } from '../../models/IUser';

export interface IUserState {
    usersLoading: boolean;
    error: string;
    users: IUser[];
}

export type UsersListProps = {
    user: IUser[];
    loading: boolean;
};

export type DeleteUserProp = string[];
