import { FC } from 'react';
import {
    Box,
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
import { width } from '@mui/system';

export const MenuSettings: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { lang } = useApp();

    const getLangBtnProps = (currentLang: LangType): ButtonProps => {
        return {
            variant: currentLang === lang ? 'outlined' : 'text',
            disabled: currentLang === lang,
            onClick: () => dispatch(setLang(currentLang)),
            size: 'small',
        };
    };

    return (
        <Box display='flex'>
            <Button {...getLangBtnProps('ru')} sx={{ fontSize: '12px' }}>
                ru
            </Button>
            <Button
                size='small'
                {...getLangBtnProps('en')}
                sx={{ fontSize: '12px' }}>
                en
            </Button>
        </Box>
    );
};
