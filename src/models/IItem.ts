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
    tags?: TagType[];
    likes?: ILike[];
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
}

export interface ICreateItem {
    name: string;
    description: string;
    collectionId: number;
    userId: number;
    image: string;
}

export interface IItemFormValues {
    name: string;
    description: string;
    themeId: number;
    image: File;
    userId: number;
}

export interface IUpdateItem {
    name: string;
    description: string;
    collectionId: number;
    userId: number;
    image: string;
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
    nickname: string;
    timestamp: string;
}

export interface ILike {
    id: number;
    userId: number;
    itemId: number;
    nickname: string;
}
