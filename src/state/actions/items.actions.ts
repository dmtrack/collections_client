import { AppDispatch, GetState } from '..';
import { itemSlice } from '../slices/item.slice';
import itemService from '../../services/itemService';
import {
    ICreateItem,
    ICreateItemPayload,
    IFields,
    IItem,
    TagType,
} from '../../models/IItem';
import { ICreateItemBody } from '../../models/request/item-body-request';
import { saveImageToCloud } from '../../api/firebase/actions';

export const fetchItems = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(itemSlice.actions.fetchingItems());
        const response = await itemService.fetchItems();
        response
            .mapRight(({ data: data }) => {
                dispatch(itemSlice.actions.fetchSuccess(data));
            })
            .mapLeft((e: any) => {
                dispatch(itemSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};
export const fetchTopRatedItems = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(itemSlice.actions.fetchingTopRatedItems());
        const response = await itemService.fetchTopRatedItems();
        response
            .mapRight(({ data: data }) => {
                dispatch(itemSlice.actions.fetchTopRatedSuccess(data));
            })
            .mapLeft((e: any) => {
                dispatch(itemSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const createItem = (data: ICreateItemPayload) => {
    return async (dispatch: AppDispatch, getState: GetState) => {
        const { userId } = getState().auth;
        const { image: imageFile, collectionId, fields, tags } = data;
        const image = await saveImageToCloud(imageFile, 'items');
        const sendData: ICreateItemBody = {
            userId,
            image,
            collectionId,
            tags,
            fields,
        };

        const response = await itemService.createItem(sendData);
        response
            .mapRight(({ data: data }) => {
                dispatch(itemSlice.actions.addItem(data));
            })
            .mapLeft((e: any) => {
                dispatch(itemSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const editItem = (item: IItem) => {
    return async (dispatch: AppDispatch) => {
        const response = await itemService.editItem(item);
        response
            .mapRight(({ data: item }) => {
                dispatch(itemSlice.actions.setItem(item));
            })
            .mapLeft((e: any) => {
                dispatch(itemSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const deleteItem = (id: number) => {
    return async (dispatch: AppDispatch) => {
        const response = await itemService.deleteItem(id);
        response
            .mapRight(({ data: data }) => {
                console.log(data);
            })
            .mapLeft((e: any) => {
                dispatch(itemSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

// static getUserItems(collectionId: number): Promise<AxiosResponse> {
//     return api.get<IItem[]>(`item/getcollectionitems/:${collectionId}`);
// }
// static getOneitem(id: number): Promise<AxiosResponse> {
//     return api.get<IItem>(`item/getone/:${id}`);
// }

// static updateitem(): Promise<AxiosResponse> {
//     return api.put<IItem>('item/update');
// }

// static deleteItem(id: number): Promise<AxiosResponse> {
//     return api.delete<IItem>(`item/deleteone/:${id}`);
// }
