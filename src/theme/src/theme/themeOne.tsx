import { PaletteMode } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';

export const shades = {
    // primary: {
    //     100: '#d3d3d4',
    //     200: '#a6a8a9',
    //     300: '#7a7c7f',
    //     400: '#4d5154',
    //     500: '#212529',
    //     600: '#1a1e21',
    //     700: '#141619',
    //     800: '#0d0f10',
    //     900: '#070708',
    // },
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
    // secondary: {
    //     100: '#f2dbf8',
    //     200: '#e5b7f1',
    //     300: '#d893e9',
    //     400: '#cb6fe2',
    //     500: '#be4bdb',
    //     600: '#983caf',
    //     700: '#722d83',
    //     800: '#4c1e58',
    //     900: '#260f2c',
    // },

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
};

const theme = {
    palette: {
        primary: shades.primary,
    },
};

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  // palette values for light mode
                  primary: {
                      main: shades.primary[500],
                  },
                  secondary: {
                      main: shades.secondary[500],
                  },
                  neutral: {
                      dark: shades.neutral[700],
                      main: shades.neutral[500],
                      light: shades.neutral[100],
                  },
                  divider: amber[200],
                  typography: {
                      fontFamily: ['Inter', 'sens-serif'].join(','),
                      fontSize: 12,
                      h1: {
                          fontFamily: ['Inter', 'sens-serif'].join(','),
                          fontSize: 44,
                      },
                      h2: {
                          fontFamily: ['Inter', 'sens-serif'].join(','),
                          fontSize: 36,
                      },
                      h3: {
                          fontFamily: ['Inter', 'sens-serif'].join(','),
                          fontSize: 30,
                      },
                      h4: {
                          fontFamily: ['Inter', 'sens-serif'].join(','),
                          fontSize: 24,
                      },
                  },
              }
            : {
                  // palette values for dark mode
                  primary: grey,
                  divider: shades.neutral[700],
                  background: {
                      default: shades.primary[800],
                      paper: deepOrange[900],
                  },
                  text: {
                      primary: '#fff',
                      secondary: grey[500],
                  },
              }),
    },
});

export default theme;

/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

FONT SIZE SYSTEM (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
*/
