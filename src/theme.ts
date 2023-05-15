import { Palette, createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';

export const shades = (mode: string) => ({
    ...(mode === 'dark'
        ? {
              primary: {
                  100: '#d0d1d5',
                  200: '#a1a4ab',
                  300: '#727681',
                  400: '#1F2A40',
                  500: '#141b2d',
                  600: '#101624',
                  700: '#0c101b',
                  800: '#080b12',
                  900: '#040509',
              },
              secondary: {
                  100: '#f5f5f5',
                  200: '#ecebeb',
                  300: '#e2e1e1',
                  400: '#d9d7d7',
                  500: '#cfcdcd',
                  600: '#a6a4a4',
                  700: '#7c7b7b',
                  800: '#F9F6EE',
                  900: '#292929',
              },
              neutral: {
                  100: '#f5f5f5',
                  200: '#ecebeb',
                  300: '#e2e1e1',
                  400: '#d9d7d7',
                  500: '#cfcdcd',
                  600: '#a6a4a4',
                  700: '#7c7b7b',
                  800: '#535252',
                  900: '#292929',
              },
          }
        : {
              primary: {
                  100: '#d6d8d9',
                  200: '#aeb0b3',
                  300: '#85898c',
                  400: '#5d6166',
                  500: '#343a40',
                  600: '#2a2e33',
                  700: '#1f2326',
                  800: '#15171a',
                  900: '#0a0c0d',
              },
              secondary: {
                  100: '#dfd8f3',
                  200: '#bfb1e7',
                  300: '#9f8bdc',
                  400: '#7f64d0',
                  500: '#5f3dc4',
                  600: '#4c319d',
                  700: '#392576',
                  800: '#26184e',
                  900: '#130c27',
              },

              neutral: {
                  100: '#f5f5f5',
                  200: '#ecebeb',
                  300: '#e2e1e1',
                  400: '#d9d7d7',
                  500: '#cfcdcd',
                  600: '#a6a4a4',
                  700: '#7c7b7b',
                  800: '#535252',
                  900: '#292929',
              },
          }),
});

// mui theme settings
export const themeSettings = (mode: any) => {
    const colors = shades(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                      // palette values for dark mode
                      primary: {
                          main: colors.secondary[800],
                      },
                      secondary: {
                          main: colors.primary[500],
                      },
                      neutral: {
                          dark: colors.neutral[700],
                          main: colors.neutral[500],
                          light: colors.neutral[100],
                      },
                      background: {
                          default: colors.primary[500],
                      },
                  }
                : {
                      // palette values for light mode
                      primary: {
                          main: colors.primary[100],
                      },
                      secondary: {
                          main: colors.secondary[800],
                      },
                      neutral: {
                          dark: colors.neutral[700],
                          main: colors.neutral[500],
                          light: colors.neutral[100],
                      },
                      background: {
                          default: '#fcfcfc',
                      },
                  }),
        },
        typography: {
            fontFamily: ['Inter', 'sens-serif'].join(','),
            fontSize: 12,
            h1: { fontFamily: ['Inter', 'sens-serif'].join(','), fontSize: 44 },
            h2: { fontFamily: ['Inter', 'sens-serif'].join(','), fontSize: 36 },
            h3: { fontFamily: ['Inter', 'sens-serif'].join(','), fontSize: 30 },
            h4: { fontFamily: ['Inter', 'sens-serif'].join(','), fontSize: 24 },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode] as const;
};

/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

FONT SIZE SYSTEM (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
*/
