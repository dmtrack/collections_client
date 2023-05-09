import storage from './firebase';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';

const getPathStorageFromUrl = (url: string) => {
    const baseUrl = `${process.env.FIREBASE_BASE_URL}`;
    console.log(baseUrl, 'baseurl');

    return url
        .replace(baseUrl, '')
        .replace('%2F', '/')
        .split('?')
        .slice(0, -1)
        .join('?');
};

export const saveImageToCloud = async (
    file: File | undefined,
    path: string
) => {
    if (!file) return '';
    try {
        const storageRef = ref(storage, `${path}/${Date.now()}${file.name}`);
        const uploadTask = await uploadBytes(storageRef, file);
        return await getDownloadURL(uploadTask.ref);
    } catch (e) {
        console.log(e);
        return '';
    }
};

export const deleteImageFromCloud = async (imageUrl?: string) => {
    if (!imageUrl) return;
    try {
        const storageImage = ref(storage, getPathStorageFromUrl(imageUrl));
        await deleteObject(storageImage);
        console.log('image deleted');
    } catch (e) {
        console.log(e);
    }
};
