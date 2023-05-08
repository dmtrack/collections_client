import { IComment } from '../IComment';
import { IItem } from '../IItem';
import { ILike } from '../ILike';
import { ITag } from '../ITag';

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
    tags?: ITag[];
    likes?: ILike[];
}

export interface IItemDeleteResponse {
    id: number;
}
