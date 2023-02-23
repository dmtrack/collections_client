import { AppDispatch } from '..';
import { itemSlice } from '../slices/item.slice';
import itemService from '../../services/itemService';

export const fetchItems = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(itemSlice.actions.fetchingItems());
            const response = await itemService.fetchItems();
            dispatch(itemSlice.actions.fetchSuccess(response.data.data));
        } catch (e) {
            dispatch(itemSlice.actions.fetchError(e as Error));
        }
    };
};
export const fetchTopRatedItems = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await itemService.fetchTopRatedItems();
            dispatch(
                itemSlice.actions.fetchTopRatedSuccess(response.data.data)
            );
        } catch (e) {
            dispatch(itemSlice.actions.fetchError(e as Error));
        }
    };
};

// export const toggleUnBlock = (dataId: number[], itemId: number) => {
//     return async (dispatch: AppDispatch) => {
//         try {
//             const response = await api
//                 .put('/item/unblock', { dataId })
//                 .then((data) =>
//                     dispatch(
//                         itemSlice.actions.toggleUnBlockState(data.data.itemId)
//                     )
//                 )
//                 .then(() => {
//                     if (dataId.includes(Number(itemId))) {
//                         // dispatch(logOut());
//                     }
//                 });
//         } catch (e) {}
//     };
// };

// export const deleteitem = (dataId: number[], itemId: number) => {
//     return async (dispatch: AppDispatch) => {
//         try {
//             const response = await api
//                 .delete('/item/delete', { data: { dataId } })
//                 .then((data) =>
//                     dispatch(itemSlice.actions.deleteitem(data.data.itemId))
//                 )
//                 .then(() => {
//                     if (dataId.includes(Number(itemId))) {
//                         // dispatch(logOut());
//                     }
//                 });
//         } catch (e) {}
// };
// };
