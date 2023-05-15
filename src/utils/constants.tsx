import { CustomFieldTypes, SortButton } from '../models/ICollection';
import { MeiliSearch } from 'meilisearch';

import {
    BsSortAlphaDown,
    BsSortAlphaUp,
    BsSortDown,
    BsSortNumericDown,
    BsSortNumericUp,
    BsSortUp,
} from 'react-icons/bs';

import { AiFillGithub, AiTwotoneMail } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import { IContact } from '../models/global';

const fileTypes = ['JPG', 'JPEG', 'PNG'];
const customFieldsTypes: CustomFieldTypes[] = [
    'number',
    'string',
    'text',
    'date',
    'checkbox',
];

export const authorsContacts: IContact[] = [
    {
        id: '1',
        link: 'https://github.com/dmtrack',
        icon: <AiFillGithub />,
        title: 'My gitHub',
    },
    {
        id: '2',
        link: 'https://t.me/dmtrack',
        icon: <FaTelegramPlane />,
        title: 'Send a message',
    },

    {
        id: '3',
        link: 'mailto:dmtrack.dev@gmail.com',
        icon: <AiTwotoneMail />,
        title: 'Send an e-mail',
    },
];

const collectionThemes = [
    'books',
    'vinyl',
    'movies',
    'comics',
    'toys',
    'flowers',
    'cosmetics',
    'antiques',
    'autographs',
    'souvenirs',
    'coins',
    'stamps',
    'calendars',
    'pictures',
    'other',
];

const defaultSortButtons: SortButton[] = [
    {
        id: 'fromAtoZ',
        icon: <BsSortAlphaDown />,
        tooltip: 'aZ',
    },
    {
        id: 'fromZtoA',
        icon: <BsSortAlphaUp />,
        tooltip: 'zA',
    },
    {
        id: 'fromOldToNew',
        icon: <BsSortDown />,
        tooltip: 'oldNew',
    },
    {
        id: 'fromNewToOld',
        icon: <BsSortUp />,
        tooltip: 'newOld',
    },
];

const sortByItemsQuantityButtons: SortButton[] = [
    {
        id: 'fromLessToMore',
        icon: <BsSortNumericDown />,
        tooltip: 'lessMore',
    },
    {
        id: 'fromMoreToLess',
        icon: <BsSortNumericUp />,
        tooltip: 'moreLess',
    },
];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export {
    defaultSortButtons,
    sortByItemsQuantityButtons,
    MAX_IMAGE_SIZE,
    collectionThemes,
    customFieldsTypes,
    fileTypes,
};
