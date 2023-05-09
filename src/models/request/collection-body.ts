import Collection from '../../scenes/collection/Collection';

export interface ICreateCollectionBody {
    name: string;
    description: string;
    image: string;
    userId: number;
    themeId: number;
}

export interface DeleteCollectionBody {
    collectionId: number;
}

// export interface EditCollectionBody {
//   itemConfigs: ItemConfigType[]
//   removedConfigs: ItemConfigType[]
//   collection: Omit<Collection, 'timestamp'>
//   token: string
// }
