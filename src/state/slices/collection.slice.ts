import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICollection } from '../../models/ICollection';
import {
    DeleteCollection,
    ICollectionState,
} from '../models/ICollection.state';

const initialState: ICollectionState = {
    collectionsLoading: false,
    error: '',
    collections: [],
};

export const collectionSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        fetchingcollections: (state) => {
            state.collectionsLoading = true;
        },
        fetchSuccess: (state, action: PayloadAction<ICollection[]>) => {
            state.collectionsLoading = false;
            state.collections = action.payload;
        },
        fetchError: (state, action: PayloadAction<Error>) => {
            state.collectionsLoading = false;
            state.error = action.payload.message + ': ' + action.payload?.cause;
        },
        addCollection: (state, action: PayloadAction<ICollection>) => {
            state.collections = [...state.collections, action.payload];
        },
        deleteColection: (state, action: PayloadAction<DeleteCollection>) => {
            state.collections = state.collections.filter((col) => {
                return col.id !== action.payload.id;
            });
        },

        editCollection: (state, action: PayloadAction<DeleteCollection>) => {},
    },
});

export default collectionSlice.reducer;
