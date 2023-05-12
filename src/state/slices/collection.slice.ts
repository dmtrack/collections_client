import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    ICollection,
    IGetCollectionResponse,
    IGetThemesResponse,
} from '../../models/ICollection';
import {
    DeleteCollection,
    ICollectionState,
} from '../models/ICollection.state';

const initialState: ICollectionState = {
    collectionsLoading: false,
    collectionsUserLoading: false,
    collectionsTopAmountLoading: false,
    themesLoading: false,
    error: '',
    collections: [],
    topAmountCollections: [],
    userCollections: [],
    themes: [],
    allConfigs: [],
    collectionIsBusy: false,
};

export const collectionSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        fetchingThemes: (state) => {
            state.themesLoading = true;
        },
        fetchingCollections: (state) => {
            state.collectionsLoading = true;
        },
        fetchingUsersCollections: (state) => {
            state.collectionsUserLoading = true;
        },
        fetchingTopAmountCollections: (state) => {
            state.collectionsTopAmountLoading = true;
        },

        fetchThemesSuccess: (
            state,
            action: PayloadAction<IGetThemesResponse[]>
        ) => {
            state.themesLoading = false;
            state.themes = action.payload;
        },
        fetchCollectionsSuccess: (
            state,
            action: PayloadAction<IGetCollectionResponse[]>
        ) => {
            state.collectionsLoading = false;
            state.collections = action.payload;
        },

        fetchCollectionsUserSuccess: (
            state,
            action: PayloadAction<IGetCollectionResponse[]>
        ) => {
            state.collectionsUserLoading = false;
            state.userCollections = action.payload;
        },
        fetchTopAmountSuccess: (
            state,
            action: PayloadAction<ICollection[]>
        ) => {
            state.collectionsTopAmountLoading = false;
            state.topAmountCollections = action.payload;
        },
        fetchError: (state, action: PayloadAction<Error>) => {
            state.collectionsLoading = false;
            state.error = action.payload.message + ': ' + action.payload?.cause;
        },
        setCollections: (state, { payload }: PayloadAction<ICollection[]>) => {
            state.collections = payload;
        },

        addCollection: (state, action: PayloadAction<ICollection>) => {
            state.collections = [...state.collections, action.payload];
        },
        deleteColection: (state, action: PayloadAction<DeleteCollection>) => {
            state.collections = state.collections.filter((col) => {
                return col.id !== action.payload.id;
            });
        },
        setCollectionsBusy: (state, { payload }: PayloadAction<boolean>) => {
            state.collectionIsBusy = payload;
        },
        editCollection: (state, action: PayloadAction<DeleteCollection>) => {},
    },
});

export default collectionSlice.reducer;
