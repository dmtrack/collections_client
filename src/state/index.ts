import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import authReducer from './slices/auth.slice';
import collectionReducer from './slices/collection.slice';
import itemReducer from './slices/item.slice';
import appReducer from './slices/app.slice';

const rootReducer = combineReducers({
    users: userReducer,
    auth: authReducer,
    collections: collectionReducer,
    items: itemReducer,
    app: appReducer,
});

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['item/setSocket'],
                    ignoredPaths: ['item.socket'],
                },
            }),
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type GetState = () => RootState;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
