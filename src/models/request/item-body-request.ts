import { IFields, IItem, TagType } from '../IItem';

export interface ICreateItemBody {
    userId: number;
    collectionId: number;
    tags: TagType[];
    fields: IFields;
    image: string;
}

export interface IEditItemBody {
    item: IItem;
    token: string;
}

export interface IDeleteItemBody {
    item: IItem;
    token: string;
}
