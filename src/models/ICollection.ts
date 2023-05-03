import { AxiosResponse } from 'axios';

export interface ICreateCollection {
    name: string;
    description: string;
    image: string;
    created: string;
    userId: number;
    themeId: number;
}

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
