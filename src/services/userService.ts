import { AuthorizationError } from './../models/errors/AuthorizationError';
import {
    axiosDelete,
    axiosGet,
    axiosPost,
    axiosUpdate,
} from '../api/axios/apiClient';
import { DataBaseError } from '../models/errors/DataBaseError';
import { IGetUserResponse } from '../models/IUser';
import { DeleteUserProp } from '../state/models/IUsers.state';

export default class UserService {
    static async getAllUsers() {
        return axiosGet<AuthorizationError | DataBaseError, IGetUserResponse[]>(
            '/user/getusers'
        );
    }
    static async getOneUser(id: number) {
        return axiosGet<AuthorizationError | DataBaseError, IGetUserResponse>(
            `user/getuser/${id}`
        );
    }
    static async blockUser(dataId: number[]) {
        return axiosUpdate<AuthorizationError | DataBaseError, DeleteUserProp>(
            'user/block/',
            dataId
        );
    }
    static async unblockUser(dataId: number[]) {
        return axiosUpdate<AuthorizationError | DataBaseError, DeleteUserProp>(
            'user/unblock/',
            dataId
        );
    }
    static async deleteUser(dataId: number[]) {
        return axiosDelete<AuthorizationError | DataBaseError, DeleteUserProp>(
            'user/delete/',
            { data: dataId }
        );
    }

    static async destroyUser(userId: number) {
        return axiosDelete<AuthorizationError | DataBaseError, DeleteUserProp>(
            `user/destroy/${userId}`
        );
    }
}
