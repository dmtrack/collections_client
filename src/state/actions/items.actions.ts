import { AppDispatch } from '..';
import { itemSlice } from '../slices/item.slice';
import itemService from '../../services/itemService';
import { ICreateItem, IItem, IUpdateItem } from '../../models/IItem';

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

export const createItem = (data: ICreateItem) => {
    return async (dispatch: AppDispatch) => {
        const response = await itemService.createItem(data);
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

export const updateItem = (data: IUpdateItem) => {
    return async (dispatch: AppDispatch) => {};
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
