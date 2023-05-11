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

const fileTypes = ['JPG', 'JPEG', 'PNG'];
const customFieldsTypes: CustomFieldTypes[] = [
    'number',
    'string',
    'text',
    'date',
    'checkbox',
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
