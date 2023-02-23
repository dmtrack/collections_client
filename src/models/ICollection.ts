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
}
