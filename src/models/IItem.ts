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
    item?: { image: string; name: string };
    count?: string;
    tags?: ITag[];
    likes?: ILike[];
}

export interface ICreateItem {
    name: string;
    collectionId: number;
}

export interface IItemProps {
    item: IItem;
    width?: string;
}
