import { IComment, IItem, ILike, TagType } from '../../models/IItem';

export interface IItemState {
    itemsLoading: boolean;
    topRatedItemsLoading: boolean;
    items: IItem[];
    topRated: IItem[];
    error: string;
    itemIsBusy: boolean;
    commentLoading: boolean;
    likesLoading: boolean;
    comments: IComment[];
    likes: ILike[];
    tags: TagType[];
}

export type DeleteItem = {
    id: number;
};
