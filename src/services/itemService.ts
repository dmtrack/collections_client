import { IUserAuthResponse } from '../models/response/authResponse';
import { Axios, AxiosResponse } from 'axios';
import api from '../api/axios/apiClient';
import { IItem, ICreateItem } from '../models/IItem';

export default class itemService {
    static fetchItems(): Promise<AxiosResponse> {
        return api.get<IItem[]>('item/getitems');
    }
    static fetchTopRatedItems(): Promise<AxiosResponse> {
        return api.get<IItem[]>('item/toprated');
    }
    static createitem(): Promise<AxiosResponse> {
        return api.post<ICreateItem>('item/create');
    }

    static getUserItems(collectionId: number): Promise<AxiosResponse> {
        return api.get<IItem[]>(`item/getcollectionitems/:${collectionId}`);
    }
    static getOneitem(id: number): Promise<AxiosResponse> {
        return api.get<IItem>(`item/getone/:${id}`);
    }

    static updateitem(): Promise<AxiosResponse> {
        return api.put<IItem>('item/update');
    }

    static deleteItem(id: number): Promise<AxiosResponse> {
        return api.delete<IItem>(`item/deleteone/:${id}`);
    }
}
