import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../models/IItem';
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
        fetchSuccess: (state, action: PayloadAction<IItem[]>) => {
            state.itemsLoading = false;
            state.items = action.payload;
        },
        fetchTopRatedSuccess: (state, action: PayloadAction<IItem[]>) => {
            state.itemsLoading = false;
            state.topRated = action.payload;
        },
        fetchError: (state, action: PayloadAction<Error>) => {
            state.itemsLoading = false;
            state.error = action.payload.message + ': ' + action.payload?.cause;
        },
        addItem: (state, action: PayloadAction<IItem>) => {
            state.items = [...state.items, action.payload];
        },
        deleteItem: (state, action: PayloadAction<DeleteItem>) => {
            state.items = state.items.filter((item) => {
                return item.id !== action.payload.id;
            });
        },

        editItem: (state, action: PayloadAction<DeleteItem>) => {},
    },
});

export default itemSlice.reducer;
