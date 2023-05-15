import '../../styles/navbar-styles.css';
import { FC } from 'react';
import { Text } from '../../components/Common/Text';
import { Typography, useTheme } from '@mui/material';
import {
    SearchOutlined,
    KeyboardCommandKeyOutlined,
} from '@mui/icons-material';
import { shades } from '../../theme';
import { useTranslation } from 'react-i18next';

export const SearchButton: FC<{ onClick: () => void }> = ({ onClick }) => {
    const { t } = useTranslation('translation', {
        keyPrefix: 'searchPage',
    });
    const isMacOs = navigator.userAgent.includes('Mac');
    const theme = useTheme();
    const colors = shades(theme.palette.mode);
    return (
        <div className='search-btn' onClick={onClick}>
            <SearchOutlined
                sx={{ mx: 1, color: `${colors.secondary[800]}` }}
                fontSize='small'
            />
            <Text className='search-btn-title'>{t('search')}</Text>
            <div className='shortcut'>
                {isMacOs ? (
                    <KeyboardCommandKeyOutlined
                        sx={{ color: `${colors.secondary[800]}` }}
                        className='self-center'
                        fontSize='inherit'
                    />
                ) : (
                    <Typography
                        fontSize='medium'
                        sx={{ color: `${colors.secondary[800]}` }}>
                        CTRL+
                    </Typography>
                )}
                <Typography
                    sx={{ color: `${colors.secondary[800]}` }}
                    fontSize='medium'>
                    K
                </Typography>
            </div>
        </div>
    );
};
