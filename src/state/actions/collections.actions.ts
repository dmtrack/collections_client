import { AppDispatch } from '..';
import { collectionSlice } from '../slices/collection.slice';
import collectionService from '../../services/collectionService';

export const fetchCollections = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(collectionSlice.actions.fetchingCollections());
            const response = await collectionService.fetchCollections();
            dispatch(collectionSlice.actions.fetchSuccess(response.data.data));
        } catch (e) {
            dispatch(collectionSlice.actions.fetchError(e as Error));
        }
    };
};
export const fetchTopRatedItems = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response =
                await collectionService.fetchTopAmountOfItemsCollections();
            dispatch(
                collectionSlice.actions.fetchTopAmountSuccess(
                    response.data.data
                )
            );
        } catch (e) {
            dispatch(collectionSlice.actions.fetchError(e as Error));
        }
    };
};
