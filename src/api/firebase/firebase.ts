import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'collections-fire.firebaseapp.com',
    databaseURL: 'https://collections-fire-default-rtdb.firebaseio.com',
    projectId: 'collections-fire',
    storageBucket: 'collections-fire.appspot.com',
    messagingSenderId: '271411786164',
    appId: '1:271411786164:web:bae44e7362007210a202e1',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
