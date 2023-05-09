import { IUserAuthResponse } from '../models/response/authResponse';
import { Axios, AxiosResponse } from 'axios';
import api, { axiosGet, axiosPost } from '../api/axios/apiClient';
import {
    ICollection,
    IGetCollectionResponse,
    IGetThemesResponse,
} from '../models/ICollection';
import { AuthorizationError } from '../models/errors/AuthorizationError';
import { DataBaseError } from '../models/errors/DataBaseError';
import { ICreateCollectionBody } from '../models/request/collection-body';
import { Collection } from 'typescript';

export default class collectionService {
    static async getCollections() {
        return axiosGet<
            AuthorizationError | DataBaseError,
            IGetCollectionResponse[]
        >(`collection/getcollections/`);
    }

    static async getUserCollections(userId: number) {
        return axiosGet<
            AuthorizationError | DataBaseError,
            IGetCollectionResponse[]
        >(`collection/getusercollections/${userId}`);
    }
    static async getThemes() {
        return axiosGet<
            AuthorizationError | DataBaseError,
            IGetThemesResponse[]
        >(`collection/getthemes`);
    }

    static async getTopAmountCollections() {
        return axiosGet<
            AuthorizationError | DataBaseError,
            IGetCollectionResponse[]
        >(`collection/topamountofitems/`);
    }

    static createCollection(data: ICreateCollectionBody) {
        return axiosPost<
            AuthorizationError | DataBaseError,
            ICreateCollectionBody
        >('collection/create', data);
    }

    static getOneCollection(id: number): Promise<AxiosResponse> {
        return api.get<ICollection>(`collection/getone/:${id}`);
    }

    static updateCollection(): Promise<AxiosResponse> {
        return api.put<ICollection>('collection/update');
    }

    static deleteCollection(id: number): Promise<AxiosResponse> {
        return api.delete<ICollection>(`collection/deleteone/:${id}`);
    }
}
