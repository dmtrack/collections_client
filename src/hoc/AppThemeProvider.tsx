import React, { FC, ReactNode } from 'react';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { enUS, ruRU } from '@mui/x-data-grid';
import { useAppSelector } from '../hook/redux';
import { RootState } from '../state';

export const AppThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { apptheme, lang } = useAppSelector((state: RootState) => state.app);
    const getDataGridLang = () => {
        if (lang === 'ru') {
            return ruRU;
        } else if (lang === 'en') {
            return enUS;
        }
        return enUS;
    };
    const darkPalette: ThemeOptions['palette'] = {
        text: {
            primary: '#c2c2c2',
        },
        divider: '#797878',
    };

    const palette = apptheme === 'dark' ? darkPalette : {};

    const appTheme = createTheme(
        {
            palette: {
                mode: apptheme,
                ...palette,
            },
        },
        getDataGridLang()
    );
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
