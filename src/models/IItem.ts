import { ItemConfigType } from '../state/models/ICollection.state';

export interface IItem {
    id: number;
    name?: string;
    created?: string;
    collectionId?: number;
    userId?: number;
    image?: string;
    comments?: IComment[];
    item?: {
        image: string;
        name: string;
        created: string;
        collectionId: number;
    };
    count?: string;
    tags: TagType[];
    likes?: ILike[];
    [type: string]: any;
}

export interface IItemForSorting {
    id: number;
    name?: string;
    created?: string;
    collectionId?: number;
    image?: string;
    comments?: IComment[];
    item?: {
        image: string;
        name: string;
        created: string;
        collectionId: number;
    };
    count?: string;
    tags?: TagType[];
    likes: ILike[];
    [type: string]: any;
}

export interface ICreateItem {
    name: string;
    description: string;
    collectionId: number;
    userId: number;
    image: string;
}

export interface ICreateCollectionPayload {
    userId: number;
    name: string;
    description: string;
    themeId: number;
    image?: File;
    itemConfigs?: ItemConfigType[];
}

export interface IEditCollectionPayload {
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

export interface ICreateItemPayload {
    collectionId: number;
    fields: IFields;
    image: File | undefined;
    tags: TagType[];
}

export interface IItemProps {
    item: IItem;
    width?: string;
}

export interface IFields {
    name: string;
    [type: string]: string | number | boolean;
}

export type TagType = {
    id?: number;
    name: string;
};

export interface ITagCount {
    tagId: number;
    count: number;
}

export interface IComment {
    id: number;
    userId: number;
    itemId: number;
    text: string;
    name: string;
    timestamp: string;
}

export interface ILike {
    id: number;
    userId: number;
    itemId: number;
    name: string;
}
