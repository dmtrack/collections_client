import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem, ITagCount, TagType } from '../../models/IItem';
import { ICollection } from '../../models/ICollection';

export interface MainState {
    collections: ICollection[];
    items: IItem[];
    hasMoreItems: boolean;
    hasMoreCollections: boolean;
    searchTags: TagType[];
    searchThemeId?: number;
    tagCounts: ITagCount[];
}

const initialState: MainState = {
    collections: [],
    items: [],
    hasMoreCollections: true,
    hasMoreItems: true,
    searchTags: [],
    tagCounts: [],
};

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        addMainCollections: (
            state,
            { payload }: PayloadAction<ICollection[]>
        ) => {
            if (state.collections.length === 0)
                return { ...state, collections: payload };
            const newCollections = payload.filter((newCollection) => {
                if (
                    !state.collections?.find(
                        (collection) => collection.id === newCollection.id
                    )
                )
                    return newCollection;
            });
            state.collections = [...state.collections, ...newCollections];
        },
        clearMainCollections: (state) => {
            state.collections = [];
        },
        addMainItems: (state, { payload }: PayloadAction<IItem[]>) => {
            if (state.items.length === 0) return { ...state, items: payload };
            const newItems = payload.filter((newItem) => {
                if (!state.items?.find((item) => item.id === newItem.id))
                    return newItem;
            });
            state.items = [...state.items, ...newItems];
        },
        clearMainItems: (state) => {
            state.items = [];
        },
        setHasManyCollections: (state, { payload }: PayloadAction<boolean>) => {
            state.hasMoreCollections = payload;
        },
        setHasManyItems: (state, { payload }: PayloadAction<boolean>) => {
            state.hasMoreItems = payload;
        },
        setSearchTags: (state, { payload }: PayloadAction<TagType[]>) => {
            state.searchTags = payload;
        },
        setSearchTheme: (state, { payload }: PayloadAction<number>) => {
            state.searchThemeId = payload;
        },
        setTagCounts: (state, { payload }: PayloadAction<ITagCount[]>) => {
            state.tagCounts = payload;
        },
    },
});

export const {
    addMainItems,
    addMainCollections,
    setHasManyItems,
    setHasManyCollections,
    clearMainItems,
    setSearchTags,
    setSearchTheme,
    clearMainCollections,
    setTagCounts,
} = mainSlice.actions;

export default mainSlice.reducer;
