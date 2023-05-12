import {
    IItemCreateResponse,
    IItemDeleteResponse,
} from './../../models/response/itemResponce';
import { IItemResponse } from '../../models/response/itemResponce';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DeleteItem, IItemState } from '../models/IItem.state';
import { IComment, IItem, ILike, TagType } from '../../models/IItem';

const initialState: IItemState = {
    itemsLoading: false,
    topRatedItemsLoading: false,
    error: '',
    items: [],
    topRated: [],
    tags: [],
    likes: [],
    comments: [],
    itemIsBusy: false,
    commentLoading: false,
    likesLoading: false,
};

export const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        fetchingItems: (state) => {
            state.itemsLoading = true;
        },
        fetchingTopRatedItems: (state) => {
            state.topRatedItemsLoading = true;
        },
        fetchSuccess: (state, action: PayloadAction<IItemResponse>) => {
            state.items = action.payload;
            state.itemsLoading = false;
        },
        fetchTopRatedSuccess: (state, action: PayloadAction<IItemResponse>) => {
            state.topRated = action.payload;
            state.topRatedItemsLoading = false;
        },
        fetchError: (state, action: PayloadAction<Error>) => {
            state.itemsLoading = false;
            state.error = action.payload.message + ': ' + action.payload?.cause;
        },
        setItemsBusy: (state, { payload }: PayloadAction<boolean>) => {
            state.itemIsBusy = payload;
        },
        addItem: (state, { payload }: PayloadAction<IItem>) => {
            if (!state.items.find((item) => item.id === payload.id)) {
                state.items.push(payload);
            } else {
                state.items = state.items.map((item) =>
                    item.id === payload.id ? payload : item
                );
            }
        },
        deleteItem: (state, action: PayloadAction<IItemDeleteResponse>) => {
            state.items = state.items.filter((item) => {
                return item.id !== action.payload.id;
            });
        },

        editItem: (state, action: PayloadAction<DeleteItem>) => {},
        // setSocket: (state, { payload }: PayloadAction<AppSocket | null>) => {
        //     return { ...state, socket: payload };
        // },
        setComments: (state, { payload }: PayloadAction<IComment[]>) => {
            state.comments = payload;
        },
        addComment: (state, { payload }: PayloadAction<IComment>) => {
            if (!state.comments.find((comment) => comment.id === payload.id)) {
                state.comments.push(payload);
            }
        },
        clearComments: (state) => {
            state.comments = [];
        },
        setLikes: (state, { payload }: PayloadAction<ILike[]>) => {
            state.likes = payload;
        },
        addLike: (state, { payload }: PayloadAction<ILike>) => {
            if (!state.likes.find((like) => like.id === payload.id)) {
                state.likes.push(payload);
            }
        },
        removeLike: (state, { payload }: PayloadAction<{ userId: number }>) => {
            state.likes = state.likes.filter(
                (like) => like.userId !== payload.userId
            );
        },
        setTags: (state, { payload }: PayloadAction<TagType[]>) => {
            state.tags = payload;
        },

        setCommentLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.commentLoading = payload;
        },
        setLikesLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.likesLoading = payload;
        },
    },
});

export default itemSlice.reducer;
