import { CustomFieldTypes } from '../models/ICollection';

export const fileTypes = ['JPG', 'PNG', 'GIF'];
export const customFieldsTypes: CustomFieldTypes[] = [
    'number',
    'string',
    'text',
    'date',
    'checkbox',
];

export const collectionThemes = [
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

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
