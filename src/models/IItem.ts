import { IComment } from './IComment';
import { ILike } from './ILike';
import { ITag } from './ITag';

export interface IItem {
    id: number;
    name: string;
    created: number;
    collectionId: number;
    comments: IComment[];
    tags: ITag[];
    likes: ILike[];
}
