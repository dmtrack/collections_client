import { IField } from './IField';
import { IItem } from './IItem';

export interface ITheme {
    id: number;
    name: string;
}

export interface ICollection {
    id: number;
    name: string;
    description: string;
    image: string;
    userId: number;
    theme: ITheme;
    item: IItem[];
    fields: IField[];
}
