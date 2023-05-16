import { AxiosResponse } from 'axios'
import api, { axiosDelete, axiosGet, axiosPost } from '../api/axios/apiClient'
import {
    ICollection,
    IDeleteCollectionResponse,
    IGetCollectionResponse,
    IGetThemesResponse
} from '../models/ICollection'
import { AuthorizationError } from '../models/errors/AuthorizationError'
import { DataBaseError } from '../models/errors/DataBaseError'
import { ICreateCollectionBody } from '../models/request/collection-body'
import { ICollectionTopAmountResponce } from '../models/response/collectionResponse'
import { ItemConfigType } from '../state/models/ICollection.state'

export default class collectionService {
    static async getCollections() {
        return axiosGet<AuthorizationError | DataBaseError,
          IGetCollectionResponse[]>(`collection/getcollections/`)
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
          ICollectionTopAmountResponce[]>(`collection/topamountofitems/`);
    }

    static createCollection(data: ICreateCollectionBody) {
        return axiosPost<AuthorizationError | DataBaseError,
          ICreateCollectionBody>('collection/create', data)
    }

    static editCollection(data: { collection: ICollection, itemConfigs: ItemConfigType[] }) {
        return axiosPost<AuthorizationError | DataBaseError, { collection: ICollection, itemConfigs: ItemConfigType }>('collection/edit', data)
    }

    // static getOneCollection(id: number): Promise<AxiosResponse> {
    //     return api.get<ICollection>(`collection/getone/:${id}`);
    // }

    static async getOneCollection(collectionId: number) {
        return axiosGet<AuthorizationError | DataBaseError,
          IGetCollectionResponse>(`collection/getone/${collectionId}`)
    }

    static updateCollection(): Promise<AxiosResponse> {
        return api.put<ICollection>('collection/update');
    }

    static async deleteCollection(collectionId: number) {
        return axiosDelete<
            AuthorizationError | DataBaseError,
            IDeleteCollectionResponse
        >(`collection/delete/${collectionId}`);
    }
    static async getItemConfigs(collectionId: number) {
        return axiosGet<DataBaseError, ItemConfigType[]>(`collection/item_configs/${collectionId}`);
    }
}
