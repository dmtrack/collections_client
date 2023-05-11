import { AxiosResponse } from 'axios';
import { SortTypes } from './global';

export interface ICollection {
    id: number;
    name: string;
    description: string;
    image: string;
    created: string;
    userId: number;
    themeId: number;
    themeName: string;
}

export interface IGetCollectionResponse extends AxiosResponse {
    id: number;
    name: string;
    description: string;
    image: string;
    created: string;
    userId: number;
    themeId: number;
    themeName: string;
}

export interface IGetThemesResponse extends AxiosResponse {
    id: number;
    name: string;
}

export interface ITheme {
    id: number;
    name: string;
}

export interface IGetThemesResponse extends AxiosResponse {
    id: number;
    name: string;
}

export interface ICollectionFormValues {
    name: string;
    description: string;
    themeId: number;
    image: File;
    userId: number;
}

export type CustomFieldTypes =
    | 'number'
    | 'string'
    | 'text'
    | 'date'
    | 'checkbox'
    | '';

export interface ICustomFieldFormValues {
    type: CustomFieldTypes;
    label: string;
}

export interface ICustomFieldFormValuesWithId extends ICustomFieldFormValues {
    id: string;
}

export interface ICollectionWithQuantity extends IGetCollectionResponse {
    itemsQuantity: number;
}

export interface SortButton {
    id: SortTypes;
    icon: JSX.Element;
    tooltip: string;
}

export interface SelectOption {
    value: string;
    label: string;
}

export type ItemConfigType = {
    id?: number;
    collectionId?: number;
    hidden?: boolean;
    type: string;
    label: string;
};
