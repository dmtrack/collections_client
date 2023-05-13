import { IComment, IItem, ILike, TagType } from '../../models/IItem';
import { AppSocket } from '../../models/socket/socket';

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
    socket: AppSocket | null;
}

export type DeleteItem = {
    id: number;
};
