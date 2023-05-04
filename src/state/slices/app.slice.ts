import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../../models/IApp';
import localStorageService from '../../services/localStorageService';
import { PaletteMode } from '@mui/material';
import i18n from '../../languages/i18n';

export interface AppState {
    theme: PaletteMode;
    lang: Language;
    loading: boolean;
    searchOpen: boolean;
    isUnknownError: boolean;
}

const initialState: AppState = {
    theme: (localStorageService.getSelectedTheme() as PaletteMode) || 'light',
    lang: (localStorageService.getSelectedLanguage() as Language) || 'en',
    loading: false,
    searchOpen: false,
    isUnknownError: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLang: (state, { payload }: PayloadAction<Language>) => {
            localStorageService.setLanguage(payload);
            i18n.changeLanguage(payload);
            state.lang = payload;
        },
        setTheme: (state, { payload }: PayloadAction<PaletteMode>) => {
            localStorageService.setTheme(payload);
            state.theme = payload;
            document.documentElement.style.setProperty(
                '--color-canvas-default',
                '#FFFFFF14'
            );
        },
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },
        setSearchOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.searchOpen = payload;
        },
        setUnknownError: (state, { payload }: PayloadAction<boolean>) => {
            state.isUnknownError = payload;
        },
    },
});

export const { setLang, setTheme, setLoading, setSearchOpen, setUnknownError } =
    appSlice.actions;

export default appSlice.reducer;
