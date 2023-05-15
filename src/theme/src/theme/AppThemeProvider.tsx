// import React, { FC, ReactNode } from 'react';
// import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { enUS, ruRU } from '@mui/x-data-grid';
// import { RootState } from '../../../state';
// import { useAppSelector } from '../../../hook/redux';
// import { shades } from '../../../theme';

// export const AppThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
//     const { apptheme, lang } = useAppSelector((state: RootState) => state.app);
//     const getDataGridLang = () => {
//         if (lang === 'ru') {
//             return ruRU;
//         } else if (lang === 'en') {
//             return enUS;
//         }
//         return enUS;
//     };

//     const theme = createTheme(
//         {
//             palette: {
//                 mode: apptheme === 'light' ? 'light' : 'dark',
//                 primary: {
//                     main: shades.primary[500],
//                 },
//                 secondary: {
//                     main: shades.secondary[500],
//                 },
//                 neutral: {
//                     dark: shades.neutral[700],
//                     main: shades.neutral[500],
//                     light: shades.neutral[100],
//                 },
//             },
//             typography: {
//                 fontFamily: ['Inter', 'sens-serif'].join(','),
//                 fontSize: 12,
//                 h1: {
//                     fontFamily: ['Inter', 'sens-serif'].join(','),
//                     fontSize: 44,
//                 },
//                 h2: {
//                     fontFamily: ['Inter', 'sens-serif'].join(','),
//                     fontSize: 36,
//                 },
//                 h3: {
//                     fontFamily: ['Inter', 'sens-serif'].join(','),
//                     fontSize: 30,
//                 },
//                 h4: {
//                     fontFamily: ['Inter', 'sens-serif'].join(','),
//                     fontSize: 24,
//                 },
//             },
//         },
//         getDataGridLang()
//     );

//     /*
//     SPACING SYSTEM (px)
//     2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//     FONT SIZE SYSTEM (px)
//     10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
//     */

//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             {children}
//         </ThemeProvider>
//     );
// };

export {};
