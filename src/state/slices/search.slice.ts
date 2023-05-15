import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IComment, IItem } from '../../models/IItem';

interface SearchState {
    searchValue: string;
    offcanvasShown: boolean;
    allComments: IComment[] | null;
    allItems: IItem[] | null;
    foundInItems: IItem[];
    foundInCollections: IItem[];
    foundInComments: IItem[];
}

const initialState: SearchState = {
    searchValue: '',
    offcanvasShown: false,
    allComments: null,
    allItems: null,
    foundInItems: [],
    foundInCollections: [],
    foundInComments: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, { payload }: PayloadAction<string>) {
            state.searchValue = payload;
        },

        setOffcanvasShown(state, { payload }: PayloadAction<boolean>) {
            state.offcanvasShown = payload;
        },

        setAllComments(state, { payload }: PayloadAction<IComment[] | null>) {
            state.allComments = payload;
        },

        setAllItems(state, { payload }: PayloadAction<IItem[] | null>) {
            state.allItems = payload;
        },

        setFoundInItems(state, { payload }: PayloadAction<IItem[]>) {
            state.foundInItems = payload;
        },

        setFoundInCollections(state, { payload }: PayloadAction<IItem[]>) {
            state.foundInCollections = payload;
        },

        setFoundInComments(state, { payload }: PayloadAction<IItem[]>) {
            state.foundInComments = payload;
        },

        resetSearchResults(state) {
            state.searchValue = '';
            state.foundInItems = [];
            state.foundInCollections = [];
            state.foundInComments = [];
        },
    },
});

export const {
    setSearchValue,
    setOffcanvasShown,
    setAllComments,
    setAllItems,
    setFoundInItems,
    setFoundInCollections,
    setFoundInComments,
    resetSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
