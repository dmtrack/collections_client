import Collection from '../../scenes/collection/Collection';
import { ItemConfigType } from '../../state/models/ICollection.state';
import { IFields, TagType } from '../IItem';

export interface ICreateCollectionBody {
    name: string;
    description: string;
    image: string;
    userId: number;
    themeId: number;
}

export interface CreateCollectionPayload {
    userId: number;
    title: string;
    description: string;
    themeId: number;
    image?: File;
    itemConfigs?: ItemConfigType[];
}

export interface DeleteCollectionBody {
    collectionId: number;
}

export interface EditCollectionPayload {
    description: string;
    existingImage?: string;
    image?: File;
    deletedImage?: string;
    id: number;
    itemConfigs: ItemConfigType[];
    removedConfigs: ItemConfigType[];
    themeId: number;
    title: string;
    userId: number;
}

export interface CreateItemPayload {
    collectionId: number;
    fields: IFields;
    tags: TagType[];
}
// export interface EditCollectionBody {
//   itemConfigs: ItemConfigType[]
//   removedConfigs: ItemConfigType[]
//   collection: Omit<Collection, 'timestamp'>
//   token: string
// }
