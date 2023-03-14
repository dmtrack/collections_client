import { AxiosResponse } from 'axios';
import { EitherResponse } from '../api/axios/api.interface';
import { AuthorizationError } from './errors/AuthorizationError';
import { DataBaseError } from './errors/DataBaseError';
import { IComment } from './IComment';
import { ILike } from './ILike';
import { ITag } from './ITag';

export interface IItem {
    id: number;
    name?: string;
    created?: string;
    collectionId?: string;
    image?: string;
    comments?: IComment[];
    item?: { image: string; name: string; created: string };
    count?: string;
    tags?: ITag[];
    likes?: ILike[];
}

export interface ICreateItem {
    name: string;
    description: string;
    collectionId: number;
    userId: number;
    image: string;
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
