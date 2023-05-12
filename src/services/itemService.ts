import {
    IItemDeleteResponse,
    IItemEditResponse,
} from './../models/response/itemResponce';
import { ICreateItem, IItem } from './../models/IItem';
import { AuthorizationError } from '../models/errors/AuthorizationError';

import { axiosDelete, axiosGet, axiosPost } from '../api/axios/apiClient';
import { DataBaseError } from '../models/errors/DataBaseError';
import {
    IItemCreateResponse,
    IItemResponse,
} from '../models/response/itemResponce';
import { ICreateItemBody } from '../models/request/item-body-request';

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

    static async createItem(data: ICreateItemBody) {
        return axiosPost<
            AuthorizationError | DataBaseError,
            IItemCreateResponse
        >('/item/create', data);
    }

    static async editItem(item: IItem) {
        return axiosPost<AuthorizationError | DataBaseError, IItemEditResponse>(
            '/item/edit',
            { item }
        );
    }

    static async deleteItem(id: number) {
        return axiosDelete<
            AuthorizationError | DataBaseError,
            IItemDeleteResponse
        >(`item/deleteone/:${id}`);
    }
}
