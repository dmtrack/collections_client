import {
    IItemCreateResponse,
    IItemDeleteResponse,
} from './../../models/response/itemResponce';
import { IItemResponse } from '../../models/response/itemResponce';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DeleteItem, IItemState } from '../models/IItem.state';

const initialState: IItemState = {
    itemsLoading: false,
    error: '',
    items: [],
    topRated: [],
};

export const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        fetchingItems: (state) => {
            state.itemsLoading = true;
        },
        fetchSuccess: (state, action: PayloadAction<IItemResponse>) => {
            state.items = action.payload;
            state.itemsLoading = false;
        },
        fetchTopRatedSuccess: (state, action: PayloadAction<IItemResponse>) => {
            state.topRated = action.payload;
            state.itemsLoading = false;
        },
        fetchError: (state, action: PayloadAction<Error>) => {
            state.itemsLoading = false;
            state.error = action.payload.message + ': ' + action.payload?.cause;
        },
        addItem: (state, action: PayloadAction<IItemCreateResponse>) => {
            state.items = [...state.items, action.payload];
        },
        deleteItem: (state, action: PayloadAction<IItemDeleteResponse>) => {
            state.items = state.items.filter((item) => {
                return item.id !== action.payload.id;
            });
        },

        editItem: (state, action: PayloadAction<DeleteItem>) => {},
    },
});

export default itemSlice.reducer;
