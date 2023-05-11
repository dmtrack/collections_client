import { TFunction } from 'i18next';

import { ImageType, SortTypes } from '../models/global';
import { IParsedToken, IUser } from '../models/IUser';
import { IComment } from '../models/IComment';
import { ICollection, ICollectionWithQuantity } from '../models/ICollection';
import { IItem, IItemForSorting } from '../models/IItem';

const parseJwt = (tokenToParse: string) => {
    const base64Url = tokenToParse.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
};

const checkToken = (userToken: string) => {
    try {
        const parsedToken: IParsedToken = parseJwt(userToken);
        const nowTimestamp = Math.floor(Date.now() / 1000);
        if (!parsedToken.isBlocked && parsedToken.exp > nowTimestamp) {
            return parsedToken.id;
        }
        return false;
    } catch (error) {
        return false;
    }
};

const createImage = (
    type: ImageType,
    value1: string | undefined,
    value2: string | undefined
) =>
    `https://source.boringavatars.com/${type}/120/${value1}%20${value2}?colors=F97D58,CDDCEB,F9DBCF,33B99,5D70C5&square`;

const formatDate = (stringDate: string) => {
    const timestamp = Date.parse(stringDate);
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU');
};

const formatDateAndTime = (
    elem: IItem | ICollection | IComment | null,
    t: TFunction,
    text: string
) => {
    if (elem) {
        const formattedDate = formatDate(`${elem.created}`);
        return `${formattedDate.slice(0, 10)} ${t(text)} ${formattedDate.slice(
            12
        )}`;
    }
    return '';
};

const sortData = (
    sortType: SortTypes,
    userData?: IUser[] | null,
    collectionData?: ICollection[] | null,
    itemData?: IItem[] | null
) => {
    const data = userData || collectionData || itemData;
    if (data) {
        switch (sortType) {
            case 'fromLessToMore':
                if (collectionData) {
                    return [...(data as ICollectionWithQuantity[])].sort(
                        (a, b) => a.itemsQuantity - b.itemsQuantity
                    );
                }
                if (itemData) {
                    return [...(data as IItemForSorting[])].sort(
                        (a, b) => a.likes.length - b.likes.length
                    );
                }
                break;
            case 'fromMoreToLess':
                if (collectionData) {
                    return [...(data as ICollectionWithQuantity[])].sort(
                        (a, b) => b.itemsQuantity - a.itemsQuantity
                    );
                }
                if (itemData) {
                    return [...(data as IItemForSorting[])].sort(
                        (a, b) => b.likes.length - a.likes.length
                    );
                }
                break;
            case 'fromAtoZ':
                if (userData) {
                    return [...(data as IUser[])].sort((a, b) =>
                        a.name > b.name ? 1 : -1
                    );
                }
                if (collectionData) {
                    return [...(data as ICollectionWithQuantity[])].sort(
                        (a, b) => (a.name > b.name ? 1 : -1)
                    );
                }
                if (itemData) {
                    return [...(data as IItem[])].sort((a, b) =>
                        `${a.name}` > `${b.name}` ? 1 : -1
                    );
                }
                break;
            case 'fromZtoA':
                if (userData) {
                    return [...(data as IUser[])].sort((a, b) =>
                        a.name < b.name ? 1 : -1
                    );
                }
                if (collectionData) {
                    return [...(data as ICollectionWithQuantity[])].sort(
                        (a, b) => (a.name < b.name ? 1 : -1)
                    );
                }
                if (itemData) {
                    return [...(data as IItem[])].sort((a, b) =>
                        `${a.name}` < `${b.name}` ? 1 : -1
                    );
                }
                break;
            case 'fromOldToNew':
                return [...data].sort(
                    (a, b) =>
                        Date.parse(`${a.created}`) - Date.parse(`${b.created}`)
                );
            case 'fromNewToOld':
            default:
                return [...data].sort(
                    (a, b) =>
                        Date.parse(`${b.created}`) - Date.parse(`${a.created}`)
                );
        }
    }
    return data;
};

const filterUsersByRole = (filteringList: IUser[] | null) =>
    filteringList?.filter((user) => user.access.access.includes('admin'));

const filterUsersByStatus = (filteringList: IUser[] | null) =>
    filteringList?.filter((user) => user.blocked);

export {
    checkToken,
    createImage,
    formatDate,
    formatDateAndTime,
    sortData,
    filterUsersByRole,
    filterUsersByStatus,
};
