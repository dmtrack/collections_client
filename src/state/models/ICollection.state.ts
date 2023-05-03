import { ITheme } from './../../../../server/src/interfaces/models/theme';
import { ICollection } from '../../models/ICollection';

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
}

export type DeleteCollection = {
    id: number;
};
