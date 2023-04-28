import { ICollection } from '../../models/ICollection';

export interface ICollectionState {
    collectionsLoading: boolean;
    collectionsUserLoading: boolean;
    collectionsTopAmountLoading: boolean;
    collections: ICollection[];
    topAmountCollections: ICollection[];
    userCollections: ICollection[];
    error: string;
}

export type DeleteCollection = {
    id: number;
};
