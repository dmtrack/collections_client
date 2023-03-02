import { IUserAuthResponse } from '../models/response/authResponse';
import { Axios, AxiosResponse } from 'axios';
import api from '../api/axios/apiClient';
import { ICollection, ICreateCollection } from '../models/ICollection';

export default class collectionService {
    static fetchCollections(): Promise<AxiosResponse> {
        return api.get<ICollection[]>('collection/getcollections');
    }

    static fetchTopAmountOfItemsCollections(): Promise<AxiosResponse> {
        return api.get<ICollection[]>('collection/topamountofitems');
    }

    static createCollection(): Promise<AxiosResponse> {
        return api.post<ICreateCollection>('collection/create');
    }

    static getUserCollections(userId: number): Promise<AxiosResponse> {
        return api.get<ICollection[]>(
            `collection/getusercollections/:${userId}`
        );
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
