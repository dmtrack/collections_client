import { EitherResponse } from '../../api/axios/api.interface';
import { IComment, IItem, ILike, TagType } from '../IItem';

export type IItemResponse = IItem[];

export interface IItemCreateResponse {
    type: string;
    value: {
        id: number;
        name?: string;
        created?: string;
        collectionId?: number;
        image?: string;
        comments?: IComment[];
        tags: TagType[];
        likes?: ILike[];
    };
}

export interface IItemEditResponse {
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
    tags: TagType[];
    likes?: ILike[];
}

export interface IItemDeleteResponse {
    id: number;
}
