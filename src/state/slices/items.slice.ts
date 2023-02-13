import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../models/IItem';
import { DeleteItem, IItemState } from '../models/IItem.state';

const initialState: IItemState = {
    itemsLoading: false,
    error: '',
    items: [],
};

export const ItemSlice = createSlice({
    name: 'Items',
    initialState,
    reducers: {
        fetchingItems: (state) => {
            state.itemsLoading = true;
        },
        fetchSuccess: (state, action: PayloadAction<IItem[]>) => {
            state.itemsLoading = false;
            state.items = action.payload;
        },
        fetchError: (state, action: PayloadAction<Error>) => {
            state.itemsLoading = false;
            state.error = action.payload.message + ': ' + action.payload?.cause;
        },
        addItem: (state, action: PayloadAction<IItem>) => {
            state.items = [...state.items, action.payload];
        },
        deleteColection: (state, action: PayloadAction<DeleteItem>) => {
            state.items = state.items.filter((item) => {
                item.id !== action.payload.id;
            });
        },

        editItem: (state, action: PayloadAction<DeleteItem>) => {},
    },
});

export default ItemSlice.reducer;
