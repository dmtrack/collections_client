import { IItemDeleteResponse } from './../models/response/itemResponce';
import { ICreateItem } from './../models/IItem';
import { AuthorizationError } from '../models/errors/AuthorizationError';

import { axiosDelete, axiosGet, axiosPost } from '../api/axios/apiClient';
import { DataBaseError } from '../models/errors/DataBaseError';
import {
    IItemCreateResponse,
    IItemResponse,
} from '../models/response/itemResponce';

export default class ItemService {
    static async fetchItems() {
        return axiosGet<AuthorizationError | DataBaseError, IItemResponse>(
            '/item/getitems'
        );
    }

    static async fetchTopRatedItems() {
        return axiosGet<AuthorizationError | DataBaseError, IItemResponse>(
            '/item/toprated'
        );
    }

    static async createItem(data: ICreateItem) {
        return axiosPost<
            AuthorizationError | DataBaseError,
            IItemCreateResponse
        >('/item/create', data);
    }

    static async deleteItem(id: number) {
        return axiosDelete<
            AuthorizationError | DataBaseError,
            IItemDeleteResponse
        >(`item/deleteone/:${id}`);
    }

    // static async login(data: ILoginData) {
    //     return axiosPost<AuthorizationError | DataBaseError, IUserAuthResponse>(
    //         '/user/login',
    //         data
    //     );
    // }

    // static async getAllUsers() {
    //     return axiosGet<
    //         AuthorizationError | DataBaseError,
    //         IGetUsersResponse[]
    //     >('/users/getusers');
    // }
}
