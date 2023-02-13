import { IItem } from '../../models/IItem';

export interface IItemState {
    itemsLoading: boolean;
    items: IItem[];
    error: string;
}

export type DeleteItem = {
    id: number;
};
