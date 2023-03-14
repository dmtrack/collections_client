import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import authReducer from './slices/auth.slice';
import collectionReducer from './slices/collection.slice';
import itemReducer from './slices/item.slice';

const rootReducer = combineReducers({
    users: userReducer,
    auth: authReducer,
    collections: collectionReducer,
    items: itemReducer,
});

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware({
        //         serializableCheck: false,
        //     }),
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
