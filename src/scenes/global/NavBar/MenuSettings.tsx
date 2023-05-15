import { FC } from 'react';
import {
    Button,
    ButtonProps,
    Grid,
    ListItem,
    PaletteMode,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Text } from '../../../components/Common/Text';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../../hook/appState';
import { useAppDispatch } from '../../../hook/redux';
import { setLang, setTheme } from '../../../state/slices/app.slice';
import { LangType } from '../../../models/global';

export const MenuSettings: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { apptheme, lang } = useApp();

    const getLangBtnProps = (currentLang: LangType): ButtonProps => {
        return {
            variant: currentLang === lang ? 'outlined' : 'text',
            disabled: currentLang === lang,
            onClick: () => dispatch(setLang(currentLang)),
            size: 'small',
            fullWidth: true,
            sx: { mx: 0.5 },
        };
    };

    const getThemeBtnProps = (currentTheme: PaletteMode): ButtonProps => {
        return {
            variant: currentTheme === apptheme ? 'outlined' : 'text',
            disabled: currentTheme === apptheme,
            onClick: () => dispatch(setTheme(currentTheme)),
            size: 'small',
            fullWidth: true,
            sx: { mx: 0.5 },
        };
    };

    return (
        <ListItem>
            <Grid container spacing={1} width='300px'>
                <Grid item xs={3} alignSelf='center'>
                    <Text fontWeight='bold' fontSize='small'>
                        theme
                    </Text>
                </Grid>
                <Grid item xs={9} display='flex'>
                    <Button {...getThemeBtnProps('dark')}>
                        <DarkModeIcon fontSize='small' sx={{ mr: 0.5 }} />
                        {t('Dark')}
                    </Button>
                    <Button {...getThemeBtnProps('light')}>
                        <LightModeIcon fontSize='small' />
                        {t('Light')}
                    </Button>
                </Grid>

                <Grid
                    item
                    xs={3}
                    alignSelf='center'
                    display='flex'
                    justifyContent='space-between'>
                    <Text fontWeight='bold' fontSize='small'>
                        lang
                    </Text>
                </Grid>
                <Grid item xs={9} display='flex'>
                    <Button {...getLangBtnProps('ru')}>ru</Button>
                    <Button {...getLangBtnProps('en')}>en</Button>
                </Grid>
            </Grid>
        </ListItem>
    );
};
