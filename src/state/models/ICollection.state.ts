import { ICollection } from '../../models/ICollection';

export interface ICollectionState {
    collectionsLoading: boolean;
    collections: ICollection[];
    error: string;
}

export type DeleteCollection = {
    id: number;
};
