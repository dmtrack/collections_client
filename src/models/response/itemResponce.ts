import { IComment, IItem, ILike, TagType } from '../IItem';

export type IItemResponse = IItem[];

export interface IItemCreateResponse {
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
    likes?: ILike[];
}

export interface IItemDeleteResponse {
    id: number;
}
