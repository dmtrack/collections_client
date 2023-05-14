import {
    addMainCollections,
    addMainItems,
    setHasManyCollections,
    setHasManyItems,
    setTagCounts,
} from '../slices/main.slice';
import { IItem, ITagCount } from '../../models/IItem';
import { DbError } from '../../errors/DbError';
import { axiosGet } from '../../api/axios/apiClient';
import { AppDispatch } from '..';
import { setLoading, setUnknownError } from '../slices/app.slice';
import { ICollection } from '../../models/ICollection';

export const getNextItems =
    (offset: number, limit: number, tagIds: number[] = []) =>
    async (dispatch: AppDispatch) => {
        const url = `/item/next?offset=${offset}&limit=${limit}&tagIds=${JSON.stringify(
            tagIds
        )}`;
        setLoading(true);
        const itemsResponse = await axiosGet<DbError, IItem[]>(url);
        itemsResponse
            .mapRight(({ data: items }) => {
                if (items.length === 0) return dispatch(setHasManyItems(false));
                dispatch(addMainItems(items));
            })
            .mapLeft((e) => {
                console.log(e.response?.data);
                dispatch(setUnknownError(true));
            });
        setLoading(false);
    };

export const getNextCollections =
    (offset: number, limit: number, themeId?: number) =>
    async (dispatch: AppDispatch) => {
        const url = `/collection/next?offset=${offset}&limit=${limit}&themeId=${themeId}`;
        setLoading(true);
        const collectionsResponse = await axiosGet<DbError, ICollection[]>(url);
        collectionsResponse
            .mapRight(({ data: collections }) => {
                if (collections.length === 0)
                    return dispatch(setHasManyCollections(false));
                dispatch(addMainCollections(collections));
            })
            .mapLeft((e) => {
                console.log(e.response?.data);
                dispatch(setUnknownError(true));
            });
        setLoading(false);
    };

export const getMostPopularTags = () => async (dispatch: AppDispatch) => {
    setLoading(true);
    const tagCountsResponse = await axiosGet<DbError, ITagCount[]>(
        '/item/popular_tags'
    );
    console.log(tagCountsResponse);

    tagCountsResponse
        .mapRight(({ data: tagCounts }) => dispatch(setTagCounts(tagCounts)))
        .mapLeft((e) => {
            console.log(e.response?.data);
            dispatch(setUnknownError(true));
        });
    setLoading(false);
};
