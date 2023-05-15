import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import authReducer from './slices/auth.slice';
import collectionReducer from './slices/collection.slice';
import itemReducer from './slices/item.slice';
import appReducer from './slices/app.slice';
import mainReducer from './slices/main.slice';

const rootReducer = combineReducers({
    users: userReducer,
    auth: authReducer,
    collections: collectionReducer,
    items: itemReducer,
    app: appReducer,
    main: mainReducer,
});

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['items/setSocket'],
                    ignoredPaths: ['items.socket'],
                },
            }),
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type GetState = () => RootState;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
