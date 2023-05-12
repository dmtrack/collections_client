import dayjs from 'dayjs';
import { SortTypes } from '../models/global';
import { IParsedToken, IUser } from '../models/IUser';
import { ICollection, ICollectionWithQuantity } from '../models/ICollection';
import { IItem, IItemForSorting } from '../models/IItem';

const timestampToDate = (timestamp?: string) => {
    if (!timestamp) return '';
    return dayjs(+timestamp).format('DD-MM-YYYY');
};

const timestampToDateTime = (timestamp?: string) => {
    if (!timestamp) return '';
    return dayjs(+timestamp).format('HH:mm DD-MM-YY');
};

const dateFormat = (date: string) => {
    return dayjs(date).format('DD-MM-YYYY');
};

const formatFileSize = (bytes: number) => {
    let postfix = 'B';
    if (bytes > 1024) {
        bytes = bytes / 1024;
        postfix = 'KB';
    }
    if (bytes > 1024) {
        bytes = bytes / 1024;
        postfix = 'MB';
    }
    return `${Math.round(bytes)}${postfix}`;
};

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
    timestampToDate,
    timestampToDateTime,
    dateFormat,
    formatFileSize,
    sortData,
    filterUsersByRole,
    filterUsersByStatus,
};
