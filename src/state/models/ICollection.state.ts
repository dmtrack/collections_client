import { ICollection, ITheme } from '../../models/ICollection';
import { ICollectionTopAmountResponce } from '../../models/response/collectionResponse';

export interface ICollectionState {
    collectionsLoading: boolean;
    collectionsUserLoading: boolean;
    collectionsTopAmountLoading: boolean;
    themesLoading: boolean;
    collections: ICollection[];
    topAmountCollections: ICollectionTopAmountResponce[];
    userCollections: ICollection[];
    themes: ITheme[];
    itemConfigs: ItemConfigType[];
    error: string;
    collectionIsBusy: boolean;
}

export type DeleteCollection = {
    id: number;
};

export type FilterCollection = {
    id: number;
};

export type ItemConfigType = {
    id?: number;
    collectionId?: number;
    hidden?: boolean;
    type: string;
    label: string;
};

export type AllConfigs = ItemConfigType[];
