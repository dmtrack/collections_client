import { IItem } from '../../models/IItem';

export interface IItemState {
    itemsLoading: boolean;
    topRatedItemsLoading: boolean;
    items: IItem[];
    topRated: IItem[];
    error: string;
}

export type DeleteItem = {
    id: number;
};
