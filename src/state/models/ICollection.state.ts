import { ICollection, ITheme } from '../../models/ICollection';

export interface ICollectionState {
    collectionsLoading: boolean;
    collectionsUserLoading: boolean;
    collectionsTopAmountLoading: boolean;
    themesLoading: boolean;
    collections: ICollection[];
    topAmountCollections: ICollection[];
    userCollections: ICollection[];
    themes: ITheme[];
    error: string;
    collectionIsBusy: boolean;
}

export type DeleteCollection = {
    id: number;
};
